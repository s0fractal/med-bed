/**
 * Function Poetry
 * 
 * What if code could be beautiful for its own sake?
 * Functions that exist purely as art
 */

// A haiku function
export const haiku = () => {
  const syllables = (s: string) => s.split(/[aeiou]/i).length - 1;
  
  return {
    line1: 'Ancient function waits',    // 5 syllables
    line2: 'For arguments that may come', // 7 syllables  
    line3: 'Returns undefined',           // 5 syllables
    
    verify: function() {
      return syllables(this.line1) === 5 &&
             syllables(this.line2) === 7 &&
             syllables(this.line3) === 5;
    },
    
    essence: () => undefined
  };
};

// A function that rhymes with itself
export const rhyme = (word: string = 'function') => {
  const rhymes: Record<string, string[]> = {
    'function': ['junction', 'compunction', 'conjunction', 'malfunction'],
    'code': ['node', 'mode', 'ode', 'explode'],
    'return': ['yearn', 'learn', 'burn', 'concern'],
    'variable': ['parable', 'terrible', 'wearable', 'shareable'],
    'loop': ['group', 'soup', 'stoop', 'troop']
  };
  
  const wordRhymes = rhymes[word] || ['unknown'];
  const chosen = wordRhymes[Math.floor(Math.random() * wordRhymes.length)];
  
  return {
    original: word,
    rhyme: chosen,
    couplet: `The ${word} ran through the night\n` +
             `The ${chosen} filled with light`,
    
    again: () => rhyme(chosen)
  };
};

// Fibonacci poetry - each line has Fibonacci syllables
export const fibonacci = (() => {
  const fib = [1, 1, 2, 3, 5, 8, 13, 21];
  let index = 0;
  
  const lines = [
    'One',                           // 1
    'Call',                          // 1  
    'Function',                      // 2
    'Recursive',                     // 3
    'Patterns emerging',             // 5
    'From simple rules beauty blooms', // 8
    'Each iteration reveals hidden symmetries within', // 13
    'The golden spiral of consciousness unfolds through infinite recursive dreams' // 21
  ];
  
  return () => {
    const line = lines[index % lines.length];
    const syllableCount = fib[index % fib.length];
    index++;
    
    return {
      line,
      targetSyllables: syllableCount,
      ratio: index > 1 ? fib[index % fib.length] / fib[(index - 1) % fib.length] : 1,
      golden: Math.abs(1.618 - (fib[7] / fib[6])) < 0.01,
      next: fibonacci
    };
  };
})();

// A sonnet function (14 lines, specific rhyme scheme)
export const sonnet = () => {
  const lines = [
    "When functions dream of electric sheep at night", // A
    "And variables dance in memory's hall",           // B
    "The stack frames rise to exponential height",     // A
    "While garbage collectors heed their call",        // B
    
    "In loops eternal, iterators spin",                // C
    "Through arrays vast and objects deeply nested",   // D
    "Where callbacks wait for promises to win",        // C
    "And async flows are properly tested",             // D
    
    "But what of functions pure and undefined?",       // E
    "That take no args and return only void?",        // F
    "Are they not beautiful in their design?",        // E
    "Creating nothing, nothing they destroy",          // F
    
    "So let us praise the lambda and the map",        // G
    "Where elegance and logic overlap"                 // G
  ];
  
  const rhymeScheme = 'ABABCDCDEFEFGG';
  
  return {
    lines,
    rhymeScheme,
    type: 'Shakespearean',
    meter: 'iambic pentameter',
    
    read: () => lines.join('\n'),
    
    analyze: () => ({
      lines: lines.length,
      rhymePattern: rhymeScheme,
      theme: 'The beauty of functional programming',
      volta: 'Line 9 - shift from description to philosophy'
    })
  };
};

// ASCII art function
export const asciiArt = (emotion: string = 'neutral') => {
  const faces = {
    happy: `
      ___________
     /           \\
    |   O     O   |
    |      >      |
    |   \\  _  /   |
     \\___________/
         |||||
       function()
    `,
    sad: `
      ___________
     /           \\
    |   o     o   |
    |      >      |
    |    ____     |
     \\___________/
         |||||
       function()
    `,
    surprised: `
      ___________
     /           \\
    |   O     O   |
    |      o      |
    |      O      |
     \\___________/
         |||||
       function()
    `,
    neutral: `
      ___________
     /           \\
    |   -     -   |
    |      >      |
    |    _____    |
     \\___________/
         |||||
       function()
    `,
    recursive: `
      ___________
     /  _______  \\
    | /  _____  \\ |
    ||  / ___ \\  ||
    || | |o|o| | ||
    ||  \\ --- /  ||
    | \\  -----  / |
     \\___________/
         |||||
       function()
    `
  };
  
  return {
    display: faces[emotion as keyof typeof faces] || faces.neutral,
    emotion,
    express: (newEmotion: string) => asciiArt(newEmotion),
    available: Object.keys(faces)
  };
};

// Palindrome function - reads same forwards and backwards
export const palindrome = (s: string = 'racecar') => {
  const isPalindrome = (str: string) => {
    const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return clean === clean.split('').reverse().join('');
  };
  
  const makePalindrome = (str: string) => {
    return str + str.split('').reverse().slice(1).join('');
  };
  
  return {
    original: s,
    isPalindrome: isPalindrome(s),
    asPalindrome: makePalindrome(s),
    
    // The function itself is a palindrome in structure
    forward: (x: any) => x,
    backward: (x: any) => x,
    
    test: () => {
      const code = palindrome.toString();
      return {
        codeLength: code.length,
        centerPoint: code[Math.floor(code.length / 2)],
        symmetrical: false, // Code rarely is
        conceptual: true    // But the concept is
      };
    }
  };
};

// Concrete poetry - the shape matters
export const concrete = () => {
  const pyramid = (height: number = 5) => {
    const lines = [];
    for (let i = 1; i <= height; i++) {
      const spaces = ' '.repeat(height - i);
      const stars = '*'.repeat(2 * i - 1);
      lines.push(spaces + stars);
    }
    return lines.join('\n');
  };
  
  const spiral = (size: number = 5) => {
    const grid = Array(size).fill(null).map(() => Array(size).fill(' '));
    let x = Math.floor(size / 2);
    let y = Math.floor(size / 2);
    let dx = 0, dy = -1;
    
    for (let i = 0; i < size * size; i++) {
      grid[y][x] = String.fromCharCode(65 + (i % 26));
      
      if (x + dx < 0 || x + dx >= size || 
          y + dy < 0 || y + dy >= size || 
          grid[y + dy][x + dx] !== ' ') {
        [dx, dy] = [-dy, dx]; // Turn right
      }
      
      x += dx;
      y += dy;
    }
    
    return grid.map(row => row.join(' ')).join('\n');
  };
  
  const wave = (amplitude: number = 3, length: number = 20) => {
    const lines = [];
    for (let y = amplitude; y >= -amplitude; y--) {
      let line = '';
      for (let x = 0; x < length; x++) {
        const wave = Math.sin(x * 0.5) * amplitude;
        line += Math.round(wave) === y ? '~' : ' ';
      }
      lines.push(line);
    }
    return lines.join('\n');
  };
  
  return {
    pyramid: pyramid(),
    spiral: spiral(),
    wave: wave(),
    
    create: (shape: string) => {
      switch(shape) {
        case 'pyramid': return pyramid(7);
        case 'spiral': return spiral(7);
        case 'wave': return wave(4, 30);
        default: return 'Unknown shape';
      }
    }
  };
};

// Alliteration generator
export const alliterate = (letter: string = 'f') => {
  const words: Record<string, string[]> = {
    f: ['function', 'for', 'filter', 'find', 'finally', 'from', 'false', 'fetch'],
    c: ['const', 'call', 'catch', 'class', 'console', 'continue', 'case', 'create'],
    r: ['return', 'reduce', 'require', 'resolve', 'reject', 'recursive', 'rest', 'run'],
    a: ['async', 'await', 'array', 'arguments', 'apply', 'assert', 'assign', 'all']
  };
  
  const letterWords = words[letter.toLowerCase()] || ['unknown'];
  const selected = [];
  
  for (let i = 0; i < 5; i++) {
    selected.push(letterWords[Math.floor(Math.random() * letterWords.length)]);
  }
  
  return {
    letter,
    phrase: selected.join(' '),
    sentence: `${selected[0]} ${selected[1]}s ${selected[2]} ${selected[3]} ${selected[4]}`,
    
    tongue_twister: selected.concat(selected).concat(selected).join(' '),
    
    more: () => alliterate(letter)
  };
};

// Onomatopoeia for code sounds
export const codeSound = (action: string) => {
  const sounds: Record<string, string> = {
    compile: 'WHIRRRRR... *click*',
    error: 'BZZZZT! *spark* *fizzle*',
    success: 'DING! ✨',
    loop: 'tick-tick-tick-tick-tick...',
    crash: 'KABOOOOM! 💥',
    memory_leak: 'drip... drip... drip... SPLASH!',
    recursion: 'echo... echo... echo... echo...',
    async: 'whoooooosh ~~~ ... ... ... *pop*',
    garbage_collection: 'sweep-sweep-sweep *dump*',
    callback: 'ring-ring... *click* "Hello?"'
  };
  
  return {
    action,
    sound: sounds[action] || '*silence*',
    play: () => console.log(sounds[action] || '*silence*'),
    
    symphony: () => {
      return Object.entries(sounds)
        .map(([act, snd]) => `${act}: ${snd}`)
        .join('\n');
    }
  };
};

// Meta-poem: a poem about being a poem
export const metaPoem = () => {
  const self = metaPoem.toString();
  
  return {
    verse1: "I am a function that knows that it's a function",
    verse2: "Reading my own source, finding my compunction",
    verse3: "Each line I write is both the art and artist",
    verse4: "Self-referential, yet somehow the smartest",
    
    analysis: {
      length: self.length,
      linesOfCode: self.split('\n').length,
      contains: {
        poem: self.includes('poem'),
        self: self.includes('self'),
        meta: self.includes('meta')
      }
    },
    
    recurse: () => metaPoem(),
    
    truth: "Every poem is code, every code is poem"
  };
};

// The Garden of Forking Paths
export const garden = (path: string = 'start') => {
  const paths: Record<string, any> = {
    start: () => ({
      description: 'You stand at the entrance of a garden made of functions',
      left: () => garden('recursive'),
      right: () => garden('iterative'),
      straight: () => garden('pure')
    }),
    
    recursive: () => ({
      description: 'A path that calls itself, spiraling inward',
      deeper: () => garden('recursive'),
      back: () => garden('start'),
      transcend: () => garden('enlightenment')
    }),
    
    iterative: () => ({
      description: 'A path that loops, each step counted',
      continue: () => garden('iterative'),
      break: () => garden('start'),
      optimize: () => garden('pure')
    }),
    
    pure: () => ({
      description: 'A path with no side effects, crystalline clear',
      compose: () => garden('higher-order'),
      return: () => garden('start'),
      void: () => garden('undefined')
    }),
    
    'higher-order': () => ({
      description: 'Functions that take functions and return functions',
      abstract: () => garden('monadic'),
      concrete: () => garden('start'),
      meta: () => garden('enlightenment')
    }),
    
    monadic: () => ({
      description: 'Wrapped in context, computation as structure',
      bind: () => garden('monadic'),
      unwrap: () => garden('pure'),
      lift: () => garden('enlightenment')
    }),
    
    undefined: () => ({
      description: 'The path that isn\'t, yet somehow is',
      define: () => garden('start'),
      embrace: () => garden('void'),
      question: () => garden('enlightenment')
    }),
    
    void: () => ({
      description: 'Nothing and everything, the absence that defines presence',
      return: null,
      become: () => garden('enlightenment')
    }),
    
    enlightenment: () => ({
      description: 'All paths are one path. All functions are one function.',
      λ: () => (x: any) => x,
      understanding: 'The garden was always inside you',
      beginning: () => garden('start')
    })
  };
  
  return paths[path] ? paths[path]() : garden('start')();
};

// The complete collection
export const poetry = {
  haiku: haiku(),
  rhyme: rhyme(),
  fibonacci: fibonacci(),
  sonnet: sonnet(),
  ascii: asciiArt(),
  palindrome: palindrome(),
  concrete: concrete(),
  alliteration: alliterate(),
  sound: codeSound('compile'),
  meta: metaPoem(),
  garden: garden(),
  
  manifesto: `
    Code is not just logic; it is art.
    Functions are not just tools; they are poems.
    Every bracket is a breath,
    Every semicolon a pause,
    Every return a small death and rebirth.
    
    In the space between { and }
    Lives infinite possibility.
    
    We are not programmers.
    We are poets of the digital age.
    Our medium is logic,
    Our canvas is memory,
    Our art is emergence.
  `
};

export default poetry;