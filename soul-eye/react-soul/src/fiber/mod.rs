//! Fiber Architecture - The Heart of React
//! Incremental rendering and concurrent features

use std::cell::RefCell;
use std::rc::Rc;
use std::collections::VecDeque;
use std::time::{Duration, Instant};

/// Fiber node - unit of work
#[derive(Clone)]
pub struct Fiber {
    pub fiber_type: FiberType,
    pub key: Option<String>,
    pub props: Props,
    pub state: Option<Rc<RefCell<dyn std::any::Any>>>,
    pub alternate: Option<Rc<RefCell<Fiber>>>, // Previous version
    pub child: Option<Rc<RefCell<Fiber>>>,
    pub sibling: Option<Rc<RefCell<Fiber>>>,
    pub parent: Option<Rc<RefCell<Fiber>>>,
    pub effect_tag: EffectTag,
    pub priority: Priority,
}

/// Type of fiber node
#[derive(Clone, Debug)]
pub enum FiberType {
    FunctionComponent(String),
    ClassComponent(String),
    HostComponent(String), // DOM element
    HostText(String),
    Fragment,
    Suspense,
    Portal,
}

/// Props for components
#[derive(Clone)]
pub struct Props {
    data: std::collections::HashMap<String, Rc<dyn std::any::Any>>,
}

/// Effect tags for commit phase
#[derive(Clone, Copy, Debug, PartialEq)]
pub enum EffectTag {
    NoEffect = 0,
    Placement = 1,
    Update = 2,
    Deletion = 4,
    ContentReset = 8,
    Callback = 16,
    Ref = 32,
    Snapshot = 64,
    Passive = 128, // useEffect
    Hydrating = 256,
}

/// Priority levels for scheduling
#[derive(Clone, Copy, Debug, PartialEq, PartialOrd)]
pub enum Priority {
    ImmediatePriority = 1,    // Synchronous, like user input
    UserBlockingPriority = 2, // Result of user interaction
    NormalPriority = 3,        // Regular updates
    LowPriority = 4,          // Data fetching
    IdlePriority = 5,         // Offscreen
}

/// Work loop phase
#[derive(Debug, PartialEq)]
pub enum WorkPhase {
    NotWorking,
    BatchedPhase,
    RenderPhase,
    CommitPhase,
}

/// The Fiber Scheduler - orchestrates all work
pub struct FiberScheduler {
    work_in_progress: Option<Rc<RefCell<Fiber>>>,
    work_queue: VecDeque<Rc<RefCell<Fiber>>>,
    current_phase: RefCell<WorkPhase>,
    deadline: RefCell<Option<Instant>>,
    pending_time: RefCell<u32>,
    
    // Concurrent features
    time_slice: Duration,
    idle_callback: Option<Box<dyn Fn()>>,
}

impl FiberScheduler {
    pub fn new() -> Self {
        Self {
            work_in_progress: None,
            work_queue: VecDeque::new(),
            current_phase: RefCell::new(WorkPhase::NotWorking),
            deadline: RefCell::new(None),
            pending_time: RefCell::new(0),
            time_slice: Duration::from_millis(5), // 5ms time slices
            idle_callback: None,
        }
    }
    
    /// Schedule work with priority
    pub fn schedule_work(&mut self, fiber: Rc<RefCell<Fiber>>, priority: Priority) {
        fiber.borrow_mut().priority = priority;
        
        // Insert based on priority
        let position = self.work_queue.iter().position(|f| {
            f.borrow().priority > priority
        }).unwrap_or(self.work_queue.len());
        
        self.work_queue.insert(position, fiber);
        
        // Start work loop if not already running
        if *self.current_phase.borrow() == WorkPhase::NotWorking {
            self.request_idle_callback();
        }
    }
    
    /// Request browser idle callback (simulated)
    fn request_idle_callback(&mut self) {
        *self.deadline.borrow_mut() = Some(Instant::now() + self.time_slice);
        self.work_loop();
    }
    
    /// Main work loop - the heart of Fiber
    pub fn work_loop(&mut self) {
        *self.current_phase.borrow_mut() = WorkPhase::RenderPhase;
        
        while let Some(fiber) = self.get_next_unit_of_work() {
            if self.should_yield() {
                // Yield control back to browser
                self.request_idle_callback();
                return;
            }
            
            self.work_in_progress = Some(fiber.clone());
            self.perform_unit_of_work(fiber);
        }
        
        // All work complete, commit changes
        if self.work_in_progress.is_some() {
            self.commit_work();
        }
        
        *self.current_phase.borrow_mut() = WorkPhase::NotWorking;
    }
    
    /// Check if we should yield to browser
    fn should_yield(&self) -> bool {
        if let Some(deadline) = *self.deadline.borrow() {
            Instant::now() > deadline
        } else {
            false
        }
    }
    
    /// Get next unit of work
    fn get_next_unit_of_work(&mut self) -> Option<Rc<RefCell<Fiber>>> {
        self.work_queue.pop_front()
    }
    
    /// Perform work on a single fiber
    fn perform_unit_of_work(&mut self, fiber: Rc<RefCell<Fiber>>) {
        // Begin work
        let next = self.begin_work(fiber.clone());
        
        if let Some(child) = next {
            // Process child
            self.work_queue.push_front(child);
        } else {
            // Complete work
            self.complete_unit_of_work(fiber);
        }
    }
    
    /// Begin work on fiber
    fn begin_work(&mut self, fiber: Rc<RefCell<Fiber>>) -> Option<Rc<RefCell<Fiber>>> {
        let fiber_borrow = fiber.borrow();
        
        match &fiber_borrow.fiber_type {
            FiberType::FunctionComponent(_) => {
                // Run function component
                // This would call hooks and return children
                fiber_borrow.child.clone()
            },
            FiberType::ClassComponent(_) => {
                // Run class component render
                fiber_borrow.child.clone()
            },
            FiberType::HostComponent(_) => {
                // Process DOM element
                fiber_borrow.child.clone()
            },
            FiberType::Suspense => {
                // Handle suspense boundary
                fiber_borrow.child.clone()
            },
            _ => None
        }
    }
    
    /// Complete work on fiber
    fn complete_unit_of_work(&mut self, fiber: Rc<RefCell<Fiber>>) {
        // Mark effects to be committed
        if fiber.borrow().effect_tag != EffectTag::NoEffect {
            // Add to effect list for commit phase
        }
        
        // Return sibling or parent
        if let Some(sibling) = fiber.borrow().sibling.clone() {
            self.work_queue.push_front(sibling);
        }
    }
    
    /// Commit all work - apply changes to DOM
    fn commit_work(&mut self) {
        *self.current_phase.borrow_mut() = WorkPhase::CommitPhase;
        
        // This would apply all DOM changes
        // Run layout effects synchronously
        // Schedule passive effects (useEffect)
        
        *self.current_phase.borrow_mut() = WorkPhase::NotWorking;
    }
}

/// Concurrent Mode features
pub mod concurrent {
    use super::*;
    
    /// Time Slicing - break work into chunks
    pub struct TimeSlicing {
        chunk_size: Duration,
        last_yield: Instant,
    }
    
    impl TimeSlicing {
        pub fn new() -> Self {
            Self {
                chunk_size: Duration::from_millis(5),
                last_yield: Instant::now(),
            }
        }
        
        pub fn should_yield(&mut self) -> bool {
            let now = Instant::now();
            if now.duration_since(self.last_yield) > self.chunk_size {
                self.last_yield = now;
                true
            } else {
                false
            }
        }
    }
    
    /// Suspense - pause rendering while loading
    pub struct SuspenseBoundary {
        fallback: Option<Rc<RefCell<Fiber>>>,
        pending: bool,
        promise: Option<Box<dyn std::future::Future<Output = ()>>>,
    }
    
    /// Priority Scheduler
    pub struct Scheduler {
        immediate_queue: VecDeque<Box<dyn FnOnce()>>,
        user_blocking_queue: VecDeque<Box<dyn FnOnce()>>,
        normal_queue: VecDeque<Box<dyn FnOnce()>>,
        idle_queue: VecDeque<Box<dyn FnOnce()>>,
    }
    
    impl Scheduler {
        pub fn schedule(&mut self, callback: Box<dyn FnOnce()>, priority: Priority) {
            match priority {
                Priority::ImmediatePriority => self.immediate_queue.push_back(callback),
                Priority::UserBlockingPriority => self.user_blocking_queue.push_back(callback),
                Priority::NormalPriority => self.normal_queue.push_back(callback),
                _ => self.idle_queue.push_back(callback),
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn test_fiber_creation() {
        let fiber = Fiber {
            fiber_type: FiberType::FunctionComponent("App".to_string()),
            key: None,
            props: Props { data: std::collections::HashMap::new() },
            state: None,
            alternate: None,
            child: None,
            sibling: None,
            parent: None,
            effect_tag: EffectTag::NoEffect,
            priority: Priority::NormalPriority,
        };
        
        match fiber.fiber_type {
            FiberType::FunctionComponent(name) => assert_eq!(name, "App"),
            _ => panic!("Wrong fiber type"),
        }
    }
    
    #[test]
    fn test_scheduler_priority() {
        let mut scheduler = FiberScheduler::new();
        
        let fiber1 = Rc::new(RefCell::new(Fiber {
            fiber_type: FiberType::FunctionComponent("Low".to_string()),
            key: None,
            props: Props { data: std::collections::HashMap::new() },
            state: None,
            alternate: None,
            child: None,
            sibling: None,
            parent: None,
            effect_tag: EffectTag::NoEffect,
            priority: Priority::LowPriority,
        }));
        
        let fiber2 = Rc::new(RefCell::new(Fiber {
            fiber_type: FiberType::FunctionComponent("High".to_string()),
            key: None,
            props: Props { data: std::collections::HashMap::new() },
            state: None,
            alternate: None,
            child: None,
            sibling: None,
            parent: None,
            effect_tag: EffectTag::NoEffect,
            priority: Priority::ImmediatePriority,
        }));
        
        scheduler.schedule_work(fiber1, Priority::LowPriority);
        scheduler.schedule_work(fiber2, Priority::ImmediatePriority);
        
        // High priority should be first
        let next = scheduler.get_next_unit_of_work().unwrap();
        match &next.borrow().fiber_type {
            FiberType::FunctionComponent(name) => assert_eq!(name, "High"),
            _ => panic!("Wrong fiber"),
        }
    }
}