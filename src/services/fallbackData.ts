import { QuizQuestion, CodingProblem, NewsArticle } from './geminiService';

export const fallbackQuiz: QuizQuestion[] = [
  {
    question: "Physics: Which of the following laws explains why passengers in a moving bus jerk forward when the bus stops suddenly?",
    options: [
      "Newton's First Law of Motion (Inertia)",
      "Newton's Second Law of Motion (Force and Acceleration)",
      "Newton's Third Law of Motion (Action and Reaction)",
      "Law of Conservation of Momentum"
    ],
    correctAnswer: 0,
    explanation: "Newton's First Law (Law of Inertia) states that an object in motion stays in motion with the same speed and direction unless acted upon by an external force. Passengers continue moving forward due to inertia when the brakes are applied."
  },
  {
    question: "Chemistry: What type of chemical bond is formed when electrons are shared equally between two atoms of similar electronegativity?",
    options: [
      "Ionic Bond",
      "Nonpolar Covalent Bond",
      "Polar Covalent Bond",
      "Hydrogen Bond"
    ],
    correctAnswer: 1,
    explanation: "A nonpolar covalent bond forms when electrons are shared equally between atoms, typically between identical nonmetal atoms or atoms with very close electronegativity values (e.g., C-H)."
  },
  {
    question: "Math: What is the derivative of the function f(x) = 3x^2 + 5x - 7 with respect to x?",
    options: [
      "6x - 7",
      "3x + 5",
      "6x + 5",
      "x^3 + 5x"
    ],
    correctAnswer: 2,
    explanation: "Using the power rule for derivatives: d/dx(x^n) = n*x^(n-1). Therefore, d/dx(3x^2) = 6x, and d/dx(5x) = 5. The derivative of the constant -7 is 0, yielding 6x + 5."
  },
  {
    question: "Biology: Which organelle is known as the powerhouse of the cell because it generates most of the chemical energy needed to power biochemical reactions?",
    options: [
      "Lysosome",
      "Chloroplast",
      "Golgi Apparatus",
      "Mitochondrion"
    ],
    correctAnswer: 3,
    explanation: "Mitochondria are the powerhouses of eukaryotic cells. They convert energy stored in nutrient molecules (like glucose) into adenosine triphosphate (ATP) through cellular respiration."
  },
  {
    question: "Physics: What is the speed of light in a vacuum, rounded to the nearest hundred million meters per second?",
    options: [
      "150,000,000 m/s",
      "300,000,000 m/s",
      "450,000,000 m/s",
      "600,000,000 m/s"
    ],
    correctAnswer: 1,
    explanation: "The speed of light in a vacuum is exactly 299,792,458 m/s, which is commonly rounded to 3.00 × 10^8 m/s or 300,000,000 meters per second."
  },
  {
    question: "Chemistry: What is the pH value of a completely neutral aqueous solution at 25 degrees Celsius?",
    options: [
      "0",
      "1",
      "7",
      "14"
    ],
    correctAnswer: 2,
    explanation: "Neutral water has a balance of hydrogen ions (H+) and hydroxide ions (OH-), yielding a pH of exactly 7 at room temperature (25°C). Below 7 is acidic; above 7 is basic."
  },
  {
    question: "Math: If a fair six-sided die is rolled once, what is the probability of rolling a prime number?",
    options: [
      "1/6",
      "1/3",
      "1/2",
      "2/3"
    ],
    correctAnswer: 2,
    explanation: "A standard six-sided die has outcomes {1, 2, 3, 4, 5, 6}. The prime numbers in this set are 2, 3, and 5. There are 3 prime outcomes out of 6 possible outcomes, so the probability is 3/6 = 1/2."
  },
  {
    question: "Biology: What is the primary pigment used by plants to absorb light during the process of photosynthesis?",
    options: [
      "Carotenoid",
      "Chlorophyll a",
      "Anthocyanin",
      "Phycobilin"
    ],
    correctAnswer: 1,
    explanation: "Chlorophyll a is the principal pigment involved in photosynthesis, absorbing blue-violet and red light while reflecting green light, which gives plants their green appearance."
  },
  {
    question: "Physics: What thermodynamic law states that energy cannot be created or destroyed, only transformed from one form to another?",
    options: [
      "Zeroth Law of Thermodynamics",
      "First Law of Thermodynamics",
      "Second Law of Thermodynamics",
      "Third Law of Thermodynamics"
    ],
    correctAnswer: 1,
    explanation: "The First Law of Thermodynamics is the law of conservation of energy. It establishes that the change in internal energy of a closed system is equal to heat added minus work done."
  },
  {
    question: "Chemistry: Which element has the highest electronegativity on the Pauling scale?",
    options: [
      "Oxygen (O)",
      "Chlorine (Cl)",
      "Helium (He)",
      "Fluorine (F)"
    ],
    correctAnswer: 3,
    explanation: "Fluorine is the most electronegative element on the periodic table, with a Pauling value of approximately 3.98, due to its small atomic size and high effective nuclear charge."
  },
  {
    question: "Math: Solve for x in the quadratic equation x^2 - 5x + 6 = 0.",
    options: [
      "x = -2, -3",
      "x = 2, 3",
      "x = 1, 5",
      "x = -1, 6"
    ],
    correctAnswer: 1,
    explanation: "The equation factors as (x - 2)(x - 3) = 0. Setting each factor to zero yields x = 2 and x = 3. Substituting these back verifies that both satisfy the equation."
  },
  {
    question: "Biology: What is the basic structural and functional unit of heredity in living organisms?",
    options: [
      "Chromosome",
      "Gene",
      "Nucleotide",
      "Ribosome"
    ],
    correctAnswer: 1,
    explanation: "A gene is a sequence of DNA or RNA that codes for a molecule that has a function. It is the basic physical and functional unit of inheritance."
  },
  {
    question: "Physics: Which type of electromagnetic radiation has the shortest wavelength and highest frequency?",
    options: [
      "Ultraviolet Rays",
      "X-rays",
      "Gamma Rays",
      "Radio Waves"
    ],
    correctAnswer: 2,
    explanation: "Gamma rays reside at the extreme high-frequency end of the electromagnetic spectrum, possessing the shortest wavelengths and highest energy photons."
  },
  {
    question: "Chemistry: What molecular geometry does a water molecule (H2O) possess due to its two lone electron pairs?",
    options: [
      "Linear",
      "Bent (V-shaped)",
      "Trigonal Planar",
      "Tetrahedral"
    ],
    correctAnswer: 1,
    explanation: "Although oxygen has a tetrahedral electron-pair geometry (due to two bonds and two lone pairs), the molecular shape formed by the nuclei is Bent or V-shaped with a bond angle of ~104.5°."
  },
  {
    question: "Math: In a right-angled triangle, if the adjacent side is 3cm and the opposite side is 4cm, what is the length of the hypotenuse?",
    options: [
      "5 cm",
      "6 cm",
      "7 cm",
      "8 cm"
    ],
    correctAnswer: 0,
    explanation: "Using the Pythagorean theorem: a^2 + b^2 = c^2. Here, 3^2 + 4^2 = 9 + 16 = 25. Taking the square root of 25 gives c = 5 cm."
  },
  {
    question: "Biology: What is the process of cell division that results in four daughter cells each with half the number of chromosomes of the parent cell (as in gametes)?",
    options: [
      "Mitosis",
      "Meiosis",
      "Binary Fission",
      "Budding"
    ],
    correctAnswer: 1,
    explanation: "Meiosis is a specialized form of cell division that reduces the chromosome number by half, producing four haploid reproductive cells (sperm or egg cells)."
  },
  {
    question: "Physics: What is the term for the heat transfer mechanism that occurs via the bulk movement of fluids (liquids or gases)?",
    options: [
      "Conduction",
      "Convection",
      "Radiation",
      "Advection"
    ],
    correctAnswer: 1,
    explanation: "Convection is the transfer of heat by the circulation or movement of the heated parts of a liquid or gas (e.g., hot air rising, boiling water currents)."
  },
  {
    question: "Chemistry: What is the term for a substance that speeds up a chemical reaction without being consumed by the reaction itself?",
    options: [
      "Reactant",
      "Product",
      "Catalyst",
      "Inhibitor"
    ],
    correctAnswer: 2,
    explanation: "A catalyst accelerates the rate of a chemical reaction by providing an alternative pathway with a lower activation energy, without undergoing any permanent chemical change itself."
  },
  {
    question: "Math: What is the base-10 value of the binary number 1101?",
    options: [
      "9",
      "11",
      "13",
      "15"
    ],
    correctAnswer: 2,
    explanation: "Converting binary to decimal: 1101 = (1 * 2^3) + (1 * 2^2) + (0 * 2^1) + (1 * 2^0) = 8 + 4 + 0 + 1 = 13."
  },
  {
    question: "Biology: Which double-membraned organelle in plant cells is responsible for conducting photosynthesis, converting light energy into sugars?",
    options: [
      "Mitochondrion",
      "Vacuole",
      "Chloroplast",
      "Ribosome"
    ],
    correctAnswer: 2,
    explanation: "Chloroplasts contain chlorophyll pigments and carry out photosynthesis to produce glucose and oxygen using water, carbon dioxide, and solar light."
  }
];

export const fallbackCoding: CodingProblem[] = [
  // === 50% MCQs (10 Questions) ===
  {
    title: "Time Complexity of Binary Search",
    description: "What is the worst-case time complexity of the Binary Search algorithm when searching an element in a sorted array of size n?",
    difficulty: "Easy",
    type: "mcq",
    options: [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n log n)"
    ],
    correctAnswer: 1,
    solution: "",
    testCases: [],
    explanation: "Binary Search halves the remaining search range at each iteration. This successive halving creates a logarithmic search curve, resulting in a worst-case time complexity of O(log n)."
  },
  {
    title: "JavaScript Array Reference Equality",
    description: "What is the evaluated output of the expression `[] == []` in standard JavaScript?",
    difficulty: "Easy",
    type: "mcq",
    options: [
      "true",
      "false",
      "TypeError",
      "undefined"
    ],
    correctAnswer: 1,
    solution: "",
    testCases: [],
    explanation: "In JavaScript, objects and arrays are compared by memory reference, not by internal value. Since these are two distinct array instances created at different memory locations, they are not equal, returning false."
  },
  {
    title: "Git: Undo Commit but Retain Changes",
    description: "Which git command allows you to undo the most recent local commit while retaining all your file changes in the working directory?",
    difficulty: "Medium",
    type: "mcq",
    options: [
      "git reset --soft HEAD~1",
      "git reset --hard HEAD~1",
      "git revert HEAD",
      "git checkout HEAD~1"
    ],
    correctAnswer: 0,
    solution: "",
    testCases: [],
    explanation: "The command `git reset --soft HEAD~1` rolls back the local branch by one commit, but leaves all modified files intact in your staging index. `--hard` would discard changes, and `revert` creates a new reverse commit."
  },
  {
    title: "SQL: Exclude Duplicates",
    description: "Which keyword is added in a SELECT query to filter out duplicates and return only unique record rows?",
    difficulty: "Easy",
    type: "mcq",
    options: [
      "DIFFERENT",
      "UNIQUE",
      "DISTINCT",
      "EXCLUDE"
    ],
    correctAnswer: 2,
    solution: "",
    testCases: [],
    explanation: "The DISTINCT keyword is used in SQL SELECT queries (e.g. `SELECT DISTINCT category FROM articles`) to filter out duplicate rows and return unique combinations."
  },
  {
    title: "JS Closure Scope Lifetime",
    description: "What is logged to the console when executing the following JavaScript code?\n\n```js\nlet count = 0;\nfunction makeCounter() {\n  return () => ++count;\n}\nconst c1 = makeCounter();\nconst c2 = makeCounter();\nc1();\nconsole.log(c2());\n```",
    difficulty: "Medium",
    type: "mcq",
    options: [
      "1",
      "2",
      "0",
      "undefined"
    ],
    correctAnswer: 1,
    solution: "",
    testCases: [],
    explanation: "Both returned closure functions capture and share the same parent scope variable 'count' defined globally. Calling c1() increments count to 1. Then calling c2() increments it to 2, logging 2."
  },
  {
    title: "CSS Box Model: Direct Content Buffer",
    description: "In the CSS box model, which area sits directly between the element content itself and the surrounding border?",
    difficulty: "Easy",
    type: "mcq",
    options: [
      "Margin",
      "Padding",
      "Outline",
      "Border-box"
    ],
    correctAnswer: 1,
    solution: "",
    testCases: [],
    explanation: "Padding is the interior buffer spacing positioned between the core element content and its border boundary. Margin is placed outside the border line."
  },
  {
    title: "Database Indexing structure",
    description: "Which data structure is most widely adopted by modern relational databases (RDBMS) like PostgreSQL and MySQL to implement primary and secondary index lookups?",
    difficulty: "Medium",
    type: "mcq",
    options: [
      "Hash Table",
      "B+ Tree",
      "Singly Linked List",
      "Binary Search Tree"
    ],
    correctAnswer: 1,
    solution: "",
    testCases: [],
    explanation: "B+ Trees are the gold standard for disk-bound database index storage due to their wide branching factors (which reduce disk access seek steps) and excellent sequential range retrieval performance."
  },
  {
    title: "REST HTTP Methods for Updates",
    description: "Which HTTP request method should be implemented to fully replace an existing API resource, according to RESTful architecture guidelines?",
    difficulty: "Easy",
    type: "mcq",
    options: [
      "POST",
      "PATCH",
      "PUT",
      "DELETE"
    ],
    correctAnswer: 2,
    solution: "",
    testCases: [],
    explanation: "According to RESTful specifications, HTTP PUT is intended to completely replace the target resource with the new request payload. PATCH is used for partial field modifications."
  },
  {
    title: "LIFO Data Structure",
    description: "Which linear data structure adheres strictly to the Last-In, First-Out (LIFO) access pattern?",
    difficulty: "Easy",
    type: "mcq",
    options: [
      "Queue",
      "Stack",
      "Heap",
      "Graph"
    ],
    correctAnswer: 1,
    solution: "",
    testCases: [],
    explanation: "A Stack restricts operations to a single end, meaning the last element added ('pushed') is the very first one retrieved ('popped'), following Last-In, First-Out. Queues follow First-In, First-Out."
  },
  {
    title: "HTTP Status Code 403",
    description: "What does the standard HTTP status response code '403 Forbidden' signify to a client?",
    difficulty: "Easy",
    type: "mcq",
    options: [
      "The resource does not exist.",
      "The user is not authenticated.",
      "The server understands the request but refuses to authorize access.",
      "The database server timed out."
    ],
    correctAnswer: 2,
    explanation: "A 403 Forbidden response indicates that the server recognized the client's request identity (the user may be logged in) but determined that the client lacks permission rights to access the resource.",
    solution: "",
    testCases: []
  },

  // === 25% Coding (5 Challenges) ===
  {
    title: "Two Sum",
    description: "Write a function solution(nums, target) that returns the indices of the two numbers in the array 'nums' that add up to the 'target'. You may assume that each input has exactly one solution.",
    difficulty: "Easy",
    type: "coding",
    testCases: [
      { input: "[2, 7, 11, 15], 9", output: "[0, 1]" },
      { input: "[3, 2, 4], 6", output: "[1, 2]" }
    ],
    solution: "function solution(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}"
  },
  {
    title: "Reverse a String",
    description: "Write a function solution(s) that takes an input string 's' and returns a new string with its characters reversed.",
    difficulty: "Easy",
    type: "coding",
    testCases: [
      { input: "'hello'", output: "'olleh'" },
      { input: "'Vite'", output: "'etiV'" }
    ],
    solution: "function solution(s) {\n  return s.split('').reverse().join('');\n}"
  },
  {
    title: "FizzBuzz",
    description: "Write a function solution(n) that returns an array of strings representing numbers from 1 to n. For multiples of three, append 'Fizz', for multiples of five append 'Buzz', and for multiples of both append 'FizzBuzz'.",
    difficulty: "Easy",
    type: "coding",
    testCases: [
      { input: "5", output: "['1', '2', 'Fizz', '4', 'Buzz']" },
      { input: "3", output: "['1', '2', 'Fizz']" }
    ],
    solution: "function solution(n) {\n  const res = [];\n  for (let i = 1; i <= n; i++) {\n    if (i % 3 === 0 && i % 5 === 0) res.push('FizzBuzz');\n    else if (i % 3 === 0) res.push('Fizz');\n    else if (i % 5 === 0) res.push('Buzz');\n    else res.push(String(i));\n  }\n  return res;\n}"
  },
  {
    title: "Is Palindrome",
    description: "Write a function solution(s) that checks whether a string 's' reads the same forwards and backwards, ignoring non-alphanumeric characters and casing.",
    difficulty: "Easy",
    type: "coding",
    testCases: [
      { input: "'racecar'", output: "true" },
      { input: "'hello'", output: "false" }
    ],
    solution: "function solution(s) {\n  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');\n  return clean === clean.split('').reverse().join('');\n}"
  },
  {
    title: "Find Maximum in Array",
    description: "Write a function solution(arr) that takes an array of numbers and returns the largest number found in the array.",
    difficulty: "Easy",
    type: "coding",
    testCases: [
      { input: "[1, 5, 3, 9, 2]", output: "9" },
      { input: "[-10, -5, -20]", output: "-5" }
    ],
    solution: "function solution(arr) {\n  return Math.max(...arr);\n}"
  },

  // === 25% Error Finding / Debug (5 Challenges) ===
  {
    title: "Fix Array Sum Type",
    description: "The function solution(arr) is supposed to return the sum of all elements inside the array. However, it currently returns a wrong concatenated string because of an incorrect variable initialization type. Fix it.",
    difficulty: "Easy",
    type: "debug",
    buggyCode: "function solution(arr) {\n  let sum = '0'; // Bug: String instead of Number\n  for (let i = 0; i < arr.length; i++) {\n    sum += arr[i];\n  }\n  return sum;\n}",
    solution: "function solution(arr) {\n  let sum = 0;\n  for (let i = 0; i < arr.length; i++) {\n    sum += arr[i];\n  }\n  return sum;\n}",
    testCases: [
      { input: "[1, 2, 3]", output: "6" },
      { input: "[10, -5]", output: "5" }
    ]
  },
  {
    title: "Fix Index Out of Bounds",
    description: "The function solution(arr) should return the final/last element in the array. It is currently returning undefined due to a bad index boundaries offset. Correct the array lookup statement.",
    difficulty: "Easy",
    type: "debug",
    buggyCode: "function solution(arr) {\n  return arr[arr.length]; // Bug: Off-by-one bounds\n}",
    solution: "function solution(arr) {\n  return arr[arr.length - 1];\n}",
    testCases: [
      { input: "[10, 20, 30]", output: "30" },
      { input: "['a']", output: "'a'" }
    ]
  },
  {
    title: "Fix Infinite Loop Terminus",
    description: "The function solution(n) is supposed to compute the sum of integers from 1 to n. The loop condition is currently moving the loop counter in the wrong direction, causing a runtime hang. Correct it.",
    difficulty: "Medium",
    type: "debug",
    buggyCode: "function solution(n) {\n  let sum = 0;\n  for (let i = 1; i <= n; i--) { // Bug: i-- instead of i++\n    sum += i;\n  }\n  return sum;\n}",
    solution: "function solution(n) {\n  let sum = 0;\n  for (let i = 1; i <= n; i++) {\n    sum += i;\n  }\n  return sum;\n}",
    testCases: [
      { input: "5", output: "15" },
      { input: "3", output: "6" }
    ]
  },
  {
    title: "Fix Frequency Counter Variable Scope",
    description: "The function solution(s, char) should return the count of occurrences of 'char' in string 's'. It is throwing a ReferenceError because of a mismatched parameter variable naming error inside the block. Fix it.",
    difficulty: "Easy",
    type: "debug",
    buggyCode: "function solution(s, char) {\n  let count = 0;\n  for (let i = 0; i < s.length; i++) {\n    if (s[i] === ch) { // Bug: 'ch' does not exist, should be 'char'\n      count++;\n    }\n  }\n  return count;\n}",
    solution: "function solution(s, char) {\n  let count = 0;\n  for (let i = 0; i < s.length; i++) {\n    if (s[i] === char) {\n      count++;\n    }\n  }\n  return count;\n}",
    testCases: [
      { input: "'hello', 'l'", output: "2" },
      { input: "'code', 'z'", output: "0" }
    ]
  },
  {
    title: "Fix Absolute Value Return",
    description: "The function solution(a, b) should return the absolute difference between 'a' and 'b' (meaning the result is always non-negative). It is currently failing for negative values. Correct it.",
    difficulty: "Easy",
    type: "debug",
    buggyCode: "function solution(a, b) {\n  return a - b; // Bug: Needs absolute value calculation\n}",
    solution: "function solution(a, b) {\n  return Math.abs(a - b);\n}",
    testCases: [
      { input: "5, 8", output: "3" },
      { input: "10, 2", output: "8" }
    ]
  }
];

export const fallbackNews: NewsArticle[] = [
  {
    title: "Quantum Computing: Standardizing Error Correction Models",
    summary: "Researchers have achieved a breakthrough in fault-tolerant quantum computing by demonstrating a 99.9% logical qubit fidelity rate. Using a new topological color code error correction algorithm, scientists successfully protected system processes from thermal fluctuations. This development bridges the gap toward standard room-temperature quantum calculations.",
    category: "Tech",
    readTime: "3 min read"
  },
  {
    title: "Asteroid Water Detection: Webb Space Telescope Discoveries",
    summary: "The James Webb Space Telescope has successfully detected chemical signatures of water vapor surrounding two asteroids in the asteroid belt, Iris and Massalia. This discovery confirms that liquid water reservoirs are present within inner solar system objects, offering crucial clues about how water originally accumulated on ancient Earth.",
    category: "Science",
    readTime: "2 min read"
  },
  {
    title: "EdTech Advancements: Immersive Gamified Classrooms Succeed",
    summary: "A global assessment across 15 countries reveals that gamified virtual reality spaces double historical learning retention rates in grade school classrooms. By placing students in high-fidelity historic reenactments and virtual chemistry experiments, educators report a 40% rise in general interest toward STEM subjects.",
    category: "Education",
    readTime: "3 min read"
  },
  {
    title: "Fusion Energy Breakthrough: Korean Reactor Sustains 100M°C",
    summary: "South Korea's KSTAR fusion reactor achieved a new milestone by holding a high-density plasma state at a temperature of 100 million degrees Celsius for a record-breaking 48 seconds. Scientists assert that maintaining active plasma stabilization at high temps represents a core milestone on the road to commercial fusion energy generators.",
    category: "Science",
    readTime: "4 min read"
  },
  {
    title: "Solid-State Batteries: EV Giants Standardize Ceramic Designs",
    summary: "Major electric vehicle companies have announced a partnership to standardize high-density solid-state battery form factors by 2028. Substituting liquid electrolytes with rigid ceramic layers mitigates combustion hazards and promises an astonishing 80% range improvement (over 1000km per charge).",
    category: "Tech",
    readTime: "3 min read"
  },
  {
    title: "Global Initiative: $500M STEM Funding for Rural Schools",
    summary: "A consortium of international technology and educational foundations has pledged $500 million in grant funding to build modern digital libraries and STEM laboratories in rural schools. The program plans to supply high-speed satellite internet, 3D printing equipment, and specialized tutor training to over 5,000 schools.",
    category: "Education",
    readTime: "2 min read"
  },
  {
    title: "Deep-Sea Discoveries: New Species Uncovered in Mariana Trench",
    summary: "Using autonomous deep-sea rovers, marine biologists have discovered fifteen previously unknown bioluminescent organism species in the depths of the Mariana Trench. These creatures possess unique physiological structures that withstand intense hydrostatic pressure, offering researchers potential pathways for biotechnology development.",
    category: "Science",
    readTime: "3 min read"
  },
  {
    title: "Open Source AI: Democratizing Custom Large Language Models",
    summary: "A new lightweight model weights release has empowered developers to run powerful custom LLMs locally on standard household devices. These highly compressed models perform semantic classification tasks at commercial quality, drastically cutting infrastructure hosting costs for independent creators.",
    category: "Tech",
    readTime: "2 min read"
  },
  {
    title: "Mental Health: Virtual Cognitive Therapy Platform Approved",
    summary: "Regulators have approved a virtual cognitive behavioral therapy platform for general clinical use. Clinical trials indicate that self-directed sessions using conversational AI structures reduced mild anxiety symptoms by 45% over a six-week period, offering an accessible mental health alternative.",
    category: "Education",
    readTime: "3 min read"
  },
  {
    title: "Solar Grid Innovation: Perovskite Solar Cells Reach 33% Efficiency",
    summary: "Renewable energy engineers have announced a milestone in silicon-perovskite tandem solar cell efficiency, reaching a record-breaking 33.9% light conversion rate. These lightweight, flexible crystal layers can be applied directly to window glass and vehicle panels, converting entire buildings into passive power grids.",
    category: "Tech",
    readTime: "3 min read"
  },
  {
    title: "Decentered Learning: Blockchain Degrees Enter Ivy League Universities",
    summary: "Multiple high-ranking universities have initialized a joint program to issue student credentials, certificates, and complete degree transcripts on cryptographic ledgers. This decentralized approach allows graduates to instantly present cryptographically authenticated documents to global employers, eradicating paper forgery.",
    category: "Education",
    readTime: "2 min read"
  },
  {
    title: "Biology Breakthrough: DNA Synthetic Assembly Advances",
    summary: "Geneticists have successfully designed a fully synthetic yeast genome containing over a million base pairs from scratch. This breakthrough enables scientists to program specialized cellular organisms that can synthesize eco-friendly biofuels, biodegrade plastic waste, and create complex medical treatments.",
    category: "Science",
    readTime: "4 min read"
  },
  {
    title: "Virtual Avatars: Generative Systems Accelerate Translation",
    summary: "A new conversational AI translates spoken speech and maps real-time facial expressions into different languages instantly. This technology is being adopted by virtual classrooms worldwide, enabling students to participate in live lectures in their native tongues without lag.",
    category: "Tech",
    readTime: "2 min read"
  },
  {
    title: "Mars Exploration: Rovers Confirm Sub-Surface Ice Sheets",
    summary: "NASA rovers have confirmed the presence of vast sub-surface ice sheets stretching across mid-latitude plains on Mars. Radar sounding indicates some ice deposits are located only a few meters below the Martian surface, facilitating prospects for future human crewed colonies on the red planet.",
    category: "Science",
    readTime: "3 min read"
  },
  {
    title: "Global Collaboration: Academic Digital Libraries Go Free",
    summary: "A coalition of scientific publishers has announced free open access to over 10 million historical academic journals and research files for public schools worldwide. The project aims to remove research barriers and empower underprivileged students to explore current scientific milestones.",
    category: "Education",
    readTime: "2 min read"
  },
  {
    title: "Cybersecurity: Quantum-Safe Encryption Standards Finalized",
    summary: "Security researchers have finalized a new suite of cryptographic algorithms designed to withstand quantum computer decrypt attacks. The new standards are being deployed across global financial databases and telecommunication backbones to secure digital transactions against future computing capabilities.",
    category: "Tech",
    readTime: "4 min read"
  },
  {
    title: "Alzheimer's Research: Novel Antibody Slows Cognitive Decline",
    summary: "A newly developed monoclonal antibody therapy has shown unprecedented success in Phase III clinical trials, slowing the cognitive decline of early-stage Alzheimer's patients by 35%. The treatment works by targeting and breaking down amyloid plaque buildups in the brain.",
    category: "Science",
    readTime: "3 min read"
  },
  {
    title: "EdTech Shift: AI Tutors Optimize Mathematics Study Patterns",
    summary: "A three-month study reveals that classrooms utilizing personalized AI math tutors saw average final exam scores rise by 15%. The AI system dynamically shifts lessons based on real-time student response patterns, ensuring a tailored, self-paced learning path.",
    category: "Education",
    readTime: "3 min read"
  },
  {
    title: "Bio-Materials: Mushroom Mycelium Replaces Plastic Packaging",
    summary: "Agricultural tech researchers have commercialized a high-strength mushroom mycelium packaging material that biodegrades in soil in just 30 days. Multiple shipping conglomerates are adopting the eco-friendly alternative to phase out plastic and styrofoam container buffers.",
    category: "Science",
    readTime: "2 min read"
  },
  {
    title: "Smart Cities: Autonomous Delivery Fleets Launch Globally",
    summary: "A network of electric, self-driving delivery rovers has officially entered service in five major metropolitan centers. Operating on dedicated pathways and monitored by smart grid controllers, these rovers cut last-mile urban shipping costs by 60% while eliminating transport carbon footprints.",
    category: "Tech",
    readTime: "3 min read"
  }
];
