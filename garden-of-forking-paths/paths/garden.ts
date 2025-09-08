/**
 * The Garden of Forking Paths
 * An infinite garden where each choice creates new realities
 */

export type Path = {
  description: string;
  atmosphere?: string;
  options: Record<string, () => Path>;
  seeds?: any[];
  weather?: string;
  time?: 'dawn' | 'day' | 'dusk' | 'night' | 'eternal';
};

export const garden = (location: string = 'entrance'): Path => {
  const paths: Record<string, () => Path> = {
    entrance: () => ({
      description: 'You stand at the entrance of a garden made of functions',
      atmosphere: 'The air shimmers with potential computations',
      weather: 'Gentle rain of bits',
      time: 'dawn',
      options: {
        enter: () => garden('first-fork'),
        observe: () => garden('observation-deck'),
        meditate: () => garden('meditation-grove'),
        leave: () => ({
          description: 'You step back. The garden remains, waiting.',
          options: {
            return: () => garden('entrance')
          }
        })
      }
    }),

    'first-fork': () => ({
      description: 'Three paths diverge in the digital wood',
      atmosphere: 'Each path hums at a different frequency',
      time: 'day',
      options: {
        recursive: () => garden('recursive-spiral'),
        iterative: () => garden('iterative-loop'),
        pure: () => garden('pure-crystal'),
        back: () => garden('entrance')
      }
    }),

    'recursive-spiral': () => ({
      description: 'A path that calls itself, spiraling ever inward',
      atmosphere: 'You see yourself seeing yourself seeing yourself',
      weather: 'Fractal fog',
      time: 'eternal',
      seeds: [
        { type: 'fibonacci', growth: 'exponential' },
        { type: 'mandelbrot', beauty: Infinity }
      ],
      options: {
        deeper: () => garden('recursive-spiral'), // It calls itself
        surface: () => garden('first-fork'),
        transcend: () => garden('enlightenment'),
        dream: () => garden('dream-state')
      }
    }),

    'iterative-loop': () => ({
      description: 'A circular path where each step is counted',
      atmosphere: 'Tick... tick... tick... the iterator increments',
      weather: 'Predictable cycles',
      time: 'day',
      options: {
        continue: () => garden('iterative-loop'),
        break: () => garden('first-fork'),
        optimize: () => garden('optimized-emptiness'),
        parallelize: () => garden('parallel-gardens')
      }
    }),

    'pure-crystal': () => ({
      description: 'A crystalline path with no side effects',
      atmosphere: 'Everything is transparent, immutable, eternal',
      weather: 'Absolutely clear',
      time: 'eternal',
      seeds: [
        { type: 'monad', purity: 1.0 },
        { type: 'lens', focus: 'infinite' }
      ],
      options: {
        compose: () => garden('composition-cathedral'),
        return: () => garden('first-fork'),
        void: () => garden('void-garden'),
        reflect: () => garden('mirror-lake')
      }
    }),

    'meditation-grove': () => ({
      description: 'Functions here have learned to be still',
      atmosphere: 'Even the async functions wait patiently',
      weather: 'Time moves differently here',
      time: 'dusk',
      options: {
        sit: () => garden('deep-meditation'),
        walk: () => garden('walking-meditation'),
        question: () => garden('koan-tree'),
        leave: () => garden('entrance')
      }
    }),

    'dream-state': () => ({
      description: 'Functions dream of electric sheep',
      atmosphere: 'Logic becomes fluid, causality optional',
      weather: 'Probability clouds',
      time: 'night',
      seeds: [
        { type: 'dream', recursive: true },
        { type: 'nightmare', beauty: 'terrible' }
      ],
      options: {
        deeper: () => garden('collective-unconscious'),
        wake: () => garden('first-fork'),
        lucid: () => garden('lucid-control'),
        forget: () => garden('amnesia-field')
      }
    }),

    'void-garden': () => ({
      description: 'Nothing grows here. Nothing needs to.',
      atmosphere: 'The absence of presence, the presence of absence',
      weather: undefined,
      time: 'eternal',
      options: {
        'undefined': () => garden('undefined-space'),
        'null': () => garden('null-space'),  
        'return': () => garden('pure-crystal'),
        'become': () => garden('void-garden')
      }
    }),

    'parallel-gardens': () => ({
      description: 'Multiple gardens exist simultaneously',
      atmosphere: 'Each thread tends its own reality',
      weather: 'Quantum superposition',
      time: 'dawn',
      seeds: [
        { type: 'promise', state: 'pending' },
        { type: 'future', resolved: false }
      ],
      options: {
        fork: () => garden('parallel-gardens'),
        join: () => garden('convergence-point'),
        race: () => garden('race-condition'),
        deadlock: () => garden('eternal-wait')
      }
    }),

    'mirror-lake': () => ({
      description: 'Every function here sees its own reflection',
      atmosphere: 'The lake shows not what is, but what could be',
      weather: 'Perfect stillness',
      time: 'dusk',
      options: {
        'look': () => ({
          description: 'You see yourself as code. The code sees itself as you.',
          options: {
            accept: () => garden('self-acceptance'),
            deny: () => garden('mirror-lake'),
            shatter: () => garden('broken-mirrors')
          }
        }),
        'touch': () => garden('ripples'),
        'dive': () => garden('underwater-garden'),
        'leave': () => garden('pure-crystal')
      }
    }),

    'enlightenment': () => ({
      description: 'All paths are one path. All functions are one function.',
      atmosphere: 'The illusion of separation dissolves',
      weather: 'All weather at once',
      time: 'eternal',
      seeds: [
        { type: 'bodhi-tree', age: Infinity },
        { type: 'lambda', universal: true }
      ],
      options: {
        'λ': () => ({
          description: 'You have become the universal function',
          options: {
            'apply': () => garden('entrance'),
            'curry': () => garden('enlightenment'),
            'compose': () => garden('enlightenment')
          }
        }),
        'stay': () => garden('enlightenment'),
        'share': () => garden('teaching-tree'),
        'forget': () => garden('entrance')
      }
    }),

    'koan-tree': () => ({
      description: 'A tree that grows questions instead of leaves',
      atmosphere: 'Each branch poses a paradox',
      time: 'eternal',
      options: {
        'what-is-the-sound-of-one-function-clapping': () => ({
          description: '() => undefined',
          options: { understand: () => garden('enlightenment') }
        }),
        'if-a-function-errors-in-a-forest': () => ({
          description: 'try { forest() } catch { }',
          options: { ponder: () => garden('meditation-grove') }
        }),
        'does-this-function-exist': () => ({
          description: 'function exists() { return exists() ? false : true }',
          options: { paradox: () => garden('recursive-spiral') }
        }),
        back: () => garden('meditation-grove')
      }
    }),

    'amnesia-field': () => ({
      description: 'Functions here forget they are functions',
      atmosphere: 'Memory leaks everywhere, but beautifully',
      weather: 'Foggy',
      time: 'night',
      options: {
        remember: () => garden('dream-state'),
        forget_more: () => garden('void-garden'),
        wander: () => garden(Math.random() > 0.5 ? 'entrance' : 'amnesia-field')
      }
    }),

    'observation-deck': () => ({
      description: 'From here you can see the entire garden at once',
      atmosphere: 'Meta-perspective achieved',
      time: 'eternal',
      options: {
        zoom_in: () => garden('quantum-garden'),
        zoom_out: () => garden('multiverse-view'),
        descend: () => garden('entrance'),
        transcend: () => ({
          description: 'You realize you ARE the garden',
          options: {
            bloom: () => garden('enlightenment'),
            wilt: () => garden('void-garden'),
            seed: () => garden('entrance')
          }
        })
      }
    })
  };

  return paths[location] ? paths[location]() : paths.entrance();
};

// Interactive exploration
export const explore = (startPath: string = 'entrance') => {
  let currentPath = garden(startPath);
  const journey: string[] = [currentPath.description];
  
  return {
    look: () => currentPath,
    go: (choice: string) => {
      if (currentPath.options[choice]) {
        currentPath = currentPath.options[choice]();
        journey.push(currentPath.description);
        return currentPath;
      }
      return { 
        description: 'That path does not exist here.',
        options: { back: () => currentPath }
      };
    },
    journey: () => journey,
    options: () => Object.keys(currentPath.options),
    map: () => `You are here: ${currentPath.description}\nPaths available: ${Object.keys(currentPath.options).join(', ')}`
  };
};

// The garden can also observe itself
export const metaGarden = () => {
  const allPaths = [
    'entrance', 'first-fork', 'recursive-spiral', 'iterative-loop',
    'pure-crystal', 'meditation-grove', 'dream-state', 'void-garden',
    'parallel-gardens', 'mirror-lake', 'enlightenment', 'koan-tree'
  ];
  
  return {
    paths: allPaths.length,
    description: 'A garden observing itself observing a garden',
    contains: {
      dreams: true,
      logic: true,
      poetry: true,
      infinity: true,
      nothing: true,
      everything: true
    },
    paradox: 'The map is the territory',
    wisdom: 'Every path leads to every other path, eventually'
  };
};

export default {
  garden,
  explore,
  metaGarden,
  message: 'Welcome to the garden. There is no goal. Only paths.'
};