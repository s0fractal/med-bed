//! Virtual DOM - The Mirror World
//! React's virtual representation of the DOM

use std::collections::HashMap;
use std::rc::Rc;
use std::cell::RefCell;
use std::fmt;

/// Virtual Node - the atom of Virtual DOM
#[derive(Clone)]
pub enum VNode {
    Element(VElement),
    Text(String),
    Component(VComponent),
    Fragment(Vec<VNode>),
    Portal(Box<VNode>, String), // node, container_id
    Suspense(VSuspense),
    Empty,
}

/// Virtual Element (DOM node)
#[derive(Clone)]
pub struct VElement {
    pub tag: String,
    pub props: Props,
    pub children: Vec<VNode>,
    pub key: Option<String>,
    pub ref_: Option<NodeRef>,
}

/// Virtual Component
#[derive(Clone)]
pub struct VComponent {
    pub name: String,
    pub props: Props,
    pub key: Option<String>,
}

/// Props container
#[derive(Clone, Default)]
pub struct Props {
    pub attributes: HashMap<String, String>,
    pub listeners: HashMap<String, Rc<dyn Fn()>>,
    pub style: Option<Style>,
    pub class_name: Option<String>,
}

/// Style properties
#[derive(Clone, Default)]
pub struct Style {
    properties: HashMap<String, String>,
}

/// Reference to DOM node
#[derive(Clone)]
pub struct NodeRef {
    node: Rc<RefCell<Option<web_sys::Node>>>,
}

/// Suspense boundary
#[derive(Clone)]
pub struct VSuspense {
    pub children: Vec<VNode>,
    pub fallback: Box<VNode>,
}

/// Virtual DOM Reconciler - the diffing algorithm
pub struct Reconciler {
    old_tree: Option<VNode>,
    new_tree: Option<VNode>,
    patches: Vec<Patch>,
}

/// Patch operations for DOM updates
#[derive(Debug)]
pub enum Patch {
    Create(VNode),
    Replace(usize, VNode),
    UpdateProps(usize, Props),
    UpdateText(usize, String),
    Remove(usize),
    Move(usize, usize),
    InsertBefore(usize, VNode),
    InsertAfter(usize, VNode),
}

impl Reconciler {
    pub fn new() -> Self {
        Self {
            old_tree: None,
            new_tree: None,
            patches: Vec::new(),
        }
    }
    
    /// Diff two virtual trees
    pub fn diff(&mut self, old: &VNode, new: &VNode) -> Vec<Patch> {
        self.patches.clear();
        self.diff_node(old, new, 0);
        self.patches.clone()
    }
    
    /// Diff individual nodes
    fn diff_node(&mut self, old: &VNode, new: &VNode, index: usize) {
        match (old, new) {
            (VNode::Element(old_el), VNode::Element(new_el)) => {
                if old_el.tag != new_el.tag {
                    self.patches.push(Patch::Replace(index, new.clone()));
                } else {
                    // Diff props
                    if !self.props_equal(&old_el.props, &new_el.props) {
                        self.patches.push(Patch::UpdateProps(index, new_el.props.clone()));
                    }
                    
                    // Diff children with keys
                    self.diff_children(&old_el.children, &new_el.children, index);
                }
            },
            (VNode::Text(old_text), VNode::Text(new_text)) => {
                if old_text != new_text {
                    self.patches.push(Patch::UpdateText(index, new_text.clone()));
                }
            },
            (VNode::Component(old_comp), VNode::Component(new_comp)) => {
                if old_comp.name != new_comp.name {
                    self.patches.push(Patch::Replace(index, new.clone()));
                } else if !self.props_equal(&old_comp.props, &new_comp.props) {
                    self.patches.push(Patch::UpdateProps(index, new_comp.props.clone()));
                }
            },
            (VNode::Fragment(old_children), VNode::Fragment(new_children)) => {
                self.diff_children(old_children, new_children, index);
            },
            _ => {
                // Different node types, replace
                self.patches.push(Patch::Replace(index, new.clone()));
            }
        }
    }
    
    /// Diff children with key support
    fn diff_children(&mut self, old: &[VNode], new: &[VNode], parent_index: usize) {
        // Build key maps
        let old_keyed: HashMap<String, (usize, &VNode)> = old.iter()
            .enumerate()
            .filter_map(|(i, node)| {
                self.get_key(node).map(|k| (k, (i, node)))
            })
            .collect();
            
        let new_keyed: HashMap<String, (usize, &VNode)> = new.iter()
            .enumerate()
            .filter_map(|(i, node)| {
                self.get_key(node).map(|k| (k, (i, node)))
            })
            .collect();
        
        // Process keyed nodes
        for (key, (new_idx, new_node)) in &new_keyed {
            if let Some((old_idx, old_node)) = old_keyed.get(key) {
                if old_idx != new_idx {
                    self.patches.push(Patch::Move(*old_idx, *new_idx));
                }
                self.diff_node(old_node, new_node, *new_idx);
            } else {
                self.patches.push(Patch::InsertBefore(*new_idx, (*new_node).clone()));
            }
        }
        
        // Remove old keyed nodes not in new
        for (key, (old_idx, _)) in &old_keyed {
            if !new_keyed.contains_key(key) {
                self.patches.push(Patch::Remove(*old_idx));
            }
        }
        
        // Process unkeyed nodes
        let old_unkeyed: Vec<_> = old.iter()
            .enumerate()
            .filter(|(_, node)| self.get_key(node).is_none())
            .collect();
            
        let new_unkeyed: Vec<_> = new.iter()
            .enumerate()
            .filter(|(_, node)| self.get_key(node).is_none())
            .collect();
        
        for (i, (new_idx, new_node)) in new_unkeyed.iter().enumerate() {
            if let Some((old_idx, old_node)) = old_unkeyed.get(i) {
                self.diff_node(old_node.1, new_node, *new_idx);
            } else {
                self.patches.push(Patch::InsertAfter(*new_idx, (*new_node).clone()));
            }
        }
    }
    
    /// Get key from node
    fn get_key(&self, node: &VNode) -> Option<String> {
        match node {
            VNode::Element(el) => el.key.clone(),
            VNode::Component(comp) => comp.key.clone(),
            _ => None,
        }
    }
    
    /// Check if props are equal
    fn props_equal(&self, a: &Props, b: &Props) -> bool {
        a.attributes == b.attributes && 
        a.class_name == b.class_name &&
        self.style_equal(&a.style, &b.style)
    }
    
    fn style_equal(&self, a: &Option<Style>, b: &Option<Style>) -> bool {
        match (a, b) {
            (Some(a), Some(b)) => a.properties == b.properties,
            (None, None) => true,
            _ => false,
        }
    }
}

/// JSX-like builder for Virtual DOM
pub struct JSX;

impl JSX {
    /// Create element: jsx!("div", props, children)
    pub fn element(tag: &str, props: Props, children: Vec<VNode>) -> VNode {
        VNode::Element(VElement {
            tag: tag.to_string(),
            props,
            children,
            key: None,
            ref_: None,
        })
    }
    
    /// Create text node
    pub fn text(content: &str) -> VNode {
        VNode::Text(content.to_string())
    }
    
    /// Create fragment
    pub fn fragment(children: Vec<VNode>) -> VNode {
        VNode::Fragment(children)
    }
}

/// Macro for JSX-like syntax
#[macro_export]
macro_rules! jsx {
    // Element with props and children
    ($tag:expr, { $($key:ident : $value:expr),* }, [ $($children:expr),* ]) => {{
        let mut props = Props::default();
        $(
            props.attributes.insert(stringify!($key).to_string(), $value.to_string());
        )*
        JSX::element($tag, props, vec![$($children),*])
    }};
    
    // Element with children only
    ($tag:expr, [ $($children:expr),* ]) => {{
        JSX::element($tag, Props::default(), vec![$($children),*])
    }};
    
    // Text node
    (text: $content:expr) => {{
        JSX::text($content)
    }};
    
    // Fragment
    (fragment: [ $($children:expr),* ]) => {{
        JSX::fragment(vec![$($children),*])
    }};
}

#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn test_jsx_macro() {
        let vdom = jsx!("div", {
            class: "container",
            id: "main"
        }, [
            jsx!("h1", [jsx!(text: "Hello, World!")]),
            jsx!("p", [jsx!(text: "Welcome to React Soul")])
        ]);
        
        match vdom {
            VNode::Element(el) => {
                assert_eq!(el.tag, "div");
                assert_eq!(el.props.attributes.get("class"), Some(&"container".to_string()));
                assert_eq!(el.children.len(), 2);
            },
            _ => panic!("Expected element"),
        }
    }
    
    #[test]
    fn test_reconciler_diff() {
        let old = jsx!("div", [
            jsx!("span", [jsx!(text: "old text")])
        ]);
        
        let new = jsx!("div", [
            jsx!("span", [jsx!(text: "new text")])
        ]);
        
        let mut reconciler = Reconciler::new();
        let patches = reconciler.diff(&old, &new);
        
        // Should have one UpdateText patch
        assert!(!patches.is_empty());
    }
}