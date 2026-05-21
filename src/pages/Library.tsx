import React from 'react';
import { 
  BookOpen, Calendar, Tag, ChevronRight, Search, Download, FileText, Cpu, 
  Book, ArrowLeft, Bookmark, Layers, Sparkles, CheckCircle2, FileUp, Library, 
  ExternalLink, Network, Info
} from 'lucide-react';
import { Card, Button, Input, cn } from '../components/UI';
import { useAuth } from '../context/AuthContext';

interface Note {
  id: string;
  title: string;
  summary: string;
  category: string;
  createdAt: string;
}

interface CuratedRevision {
  id: string;
  title: string;
  subject: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  summary: string;
  details: string;
  codeSnippet?: string;
  readTime: string;
}

interface BookItem {
  id: string;
  title: string;
  author: string;
  category: string;
  pages: number;
  progress: number;
  description: string;
  downloadUrl: string;
  chapters: { title: string; pages: string; snippet: string }[];
}

export default function LibraryPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = React.useState<'insights' | 'revision' | 'nodejs' | 'books'>('insights');
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  
  // PDF reader simulator states
  const [activeBookReader, setActiveBookReader] = React.useState<BookItem | null>(null);
  const [currentChapterIdx, setCurrentChapterIdx] = React.useState(0);
  const [readerNotesInput, setReaderNotesInput] = React.useState('');
  const [readerNotesSaved, setReaderNotesSaved] = React.useState(false);

  // Node.js interactive diagram states
  const [selectedNode, setSelectedNode] = React.useState<string>('eventloop');

  const curatedRevisionNotes: CuratedRevision[] = [
    {
      id: 'rev-1',
      title: 'Node.js Core Architecture & Libuv',
      subject: 'Node.js',
      difficulty: 'Advanced',
      readTime: '6 min read',
      summary: 'Deep dive into the collaborative framework between Chrome V8 engine and Libuv.',
      details: 'Node.js is a runtime environment built on V8. The non-blocking I/O operations are offloaded to Libuv, a multi-platform support library written in C. Libuv handles the Event Loop, Thread Pool, asynchronous file system access, and network sockets.',
      codeSnippet: `// Check the threadpool default size (4) vs custom size
process.env.UV_THREADPOOL_SIZE = 8; // Double the capacity

const fs = require('fs');
fs.readFile('large_dataset.txt', 'utf8', (err, data) => {
  // Offloaded to Libuv thread pool in the background!
  if (err) throw err;
  console.log("Async file read complete.");
});`
    },
    {
      id: 'rev-2',
      title: 'The Event Loop Phases & Microtasks',
      subject: 'Node.js',
      difficulty: 'Advanced',
      readTime: '8 min read',
      summary: 'Learn the sequence of execution phases and queue precedence (NextTick vs Promise).',
      details: 'The Event Loop runs in 6 distinct phases: (1) Timers, (2) Pending Callbacks, (3) Idle/Prepare, (4) Poll (incoming I/O), (5) Check (setImmediate), and (6) Close Callbacks. Microtasks (process.nextTick() and promise resolutions) are executed immediately after the current phase finishes, before moving to the next phase.',
      codeSnippet: `setTimeout(() => console.log('setTimeout (Macrotask)'), 0);
setImmediate(() => console.log('setImmediate (Macrotask Check)')), 0;
Promise.resolve().then(() => console.log('Promise Callback (Microtask)'));
process.nextTick(() => console.log('nextTick (High Priority Microtask)'));

// Output Order:
// 1. nextTick
// 2. Promise Callback
// 3. setTimeout
// 4. setImmediate`
    },
    {
      id: 'rev-3',
      title: 'Streams & Buffer Memory Optimization',
      subject: 'Performance',
      difficulty: 'Intermediate',
      readTime: '5 min read',
      summary: 'Why streaming is crucial for memory efficiency when reading massive files.',
      details: 'Using fs.readFile() loads the ENTIRE file into RAM at once, which causes application failure for large gigabyte files. Node.js streams allow pipeline processing where data is passed in small chunks (Buffers) with zero peak memory bloat.',
      codeSnippet: `const fs = require('fs');
const zlib = require('zlib');

// Stream massive logs, compress them on-the-fly, and save!
fs.createReadStream('huge_server.log')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('huge_server.log.gz'))
  .on('finish', () => console.log('Compression complete!'));`
    },
    {
      id: 'rev-4',
      title: 'Cognitive Focus & Active Recall Tactics',
      subject: 'Productivity',
      difficulty: 'Beginner',
      readTime: '4 min read',
      summary: 'Learn the neuroscience of study pacing, spacing effects, and pomodoro breaks.',
      details: 'Active recall forces your brain to retrieve answers from neural pathways, reinforcing connection strength. Combined with Spaced Repetition (retrieving information at 1-day, 3-day, 7-day intervals), you retain 80% more detail compared to passive re-reading.',
      codeSnippet: `// The Spaced Repetition Study Loop
const studySchedule = {
  session1: 'Initial active learning & concept mapping',
  session2: 'Recall quiz after 24 hours (combats forgetting curve)',
  session3: 'Explain the concept to an imaginary student (Feynman technique)',
  session4: 'Weekly mock test under timed pressure'
};`
    }
  ];

  const bookPDFs: BookItem[] = [
    {
      id: 'book-1',
      title: 'Eloquent JavaScript - 4th Edition',
      author: 'Marijn Haverbeke',
      category: 'JavaScript / Core',
      pages: 420,
      progress: 65,
      description: 'The definitive guide to JavaScript, modern syntax, DOM structures, and functional execution paradigms.',
      downloadUrl: '#',
      chapters: [
        { 
          title: 'Chapter 1: Values, Types, and Operators', 
          pages: '1 - 22',
          snippet: 'Computers only understand bits. In JavaScript, values are representation of bits. We explore primitive numbers, strings, booleans, and binary operations.'
        },
        { 
          title: 'Chapter 2: Program Structure & Loops', 
          pages: '23 - 48',
          snippet: 'Conditional execution using if/else, loop mechanics with while and for statements, nested scopes, and lexical declarations.' 
        },
        { 
          title: 'Chapter 3: Functions & Lexical Binding', 
          pages: '49 - 80',
          snippet: 'Functions are the bread and butter of JavaScript. Learn arrow functions, closures, recursion limits, and hoisting behaviors.' 
        },
        { 
          title: 'Chapter 4: Data Structures: Objects & Arrays', 
          pages: '81 - 110',
          snippet: 'Array manipulation, object properties, mutation vs immutability, JSON conversion, and efficient hash lookups.' 
        }
      ]
    },
    {
      id: 'book-2',
      title: 'Mastering Node.js Design Patterns',
      author: 'Mario Casciaro',
      category: 'Node.js / Backend',
      pages: 380,
      progress: 25,
      description: 'Comprehensive guide explaining backend design patterns, reactive callback APIs, and custom middleware design in Node.js.',
      downloadUrl: '#',
      chapters: [
        { 
          title: 'Chapter 1: The Node.js Platform Philosophy', 
          pages: '1 - 30',
          snippet: 'Explains the reactor pattern, single-threaded I/O, event-driven concurrency, and Libuv implementation specifics.' 
        },
        { 
          title: 'Chapter 2: Module System CommonJS vs ESM', 
          pages: '31 - 65',
          snippet: 'Node.js loading mechanisms, dynamic module execution, cyclic dependencies, ESM exports, and caching systems.' 
        },
        { 
          title: 'Chapter 3: Callback & Event Emitter Patterns', 
          pages: '66 - 102',
          snippet: 'Design async control flows, callback conventions, EventEmitter usage, custom stream hook triggers, and escaping callback hell.' 
        }
      ]
    },
    {
      id: 'book-3',
      title: 'Deep Work: Rules for Focused Coding',
      author: 'Cal Newport',
      category: 'Focus / Productivity',
      pages: 280,
      progress: 88,
      description: 'Hypothesis: The ability to perform deep focus work is becoming increasingly rare, making it highly valuable in modern tech.',
      downloadUrl: '#',
      chapters: [
        { 
          title: 'Chapter 1: Deep Work is Extremely Valuable', 
          pages: '1 - 40',
          snippet: 'Why the modern economy rewards highly complex technical skill mastery. Deep work accelerates neural myelin growth.' 
        },
        { 
          title: 'Chapter 2: Deep Work is Rare', 
          pages: '41 - 78',
          snippet: 'The productivity traps: open offices, instant messaging, and constant context switching destroy cognitive momentum.' 
        },
        { 
          title: 'Chapter 3: The Rules of Deep Engagement', 
          pages: '79 - 120',
          snippet: 'Four key focus strategies: Monastic, Bimodal, Rhythmic, and Journalistic. Building ritualistic workspaces.' 
        }
      ]
    }
  ];

  React.useEffect(() => {
    if (!user) return;
    const allNotes = JSON.parse(localStorage.getItem('time_notes') || '{}');
    const userNotes = allNotes[user.uid] || [];
    setNotes(userNotes);
  }, [user]);

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRevisions = curatedRevisionNotes.filter(rev =>
    rev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rev.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rev.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBooks = bookPDFs.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveReaderNote = () => {
    if (!user || !activeBookReader || !readerNotesInput.trim()) return;

    const newNote: Note = {
      id: `reader-note-${Date.now()}`,
      title: `Insight: ${activeBookReader.title}`,
      summary: `Chapter ${currentChapterIdx + 1} - Notes: ${readerNotesInput}`,
      category: activeBookReader.category.split(' ')[0],
      createdAt: new Date().toISOString()
    };

    const allNotes = JSON.parse(localStorage.getItem('time_notes') || '{}');
    const userNotes = allNotes[user.uid] || [];
    userNotes.unshift(newNote);
    allNotes[user.uid] = userNotes;
    localStorage.setItem('time_notes', JSON.stringify(allNotes));

    setNotes(userNotes);
    setReaderNotesSaved(true);
    setReaderNotesInput('');
    setTimeout(() => setReaderNotesSaved(false), 3000);
  };

  const nodejsArchitectureDetails: Record<string, { title: string; subtitle: string; desc: string; tip: string; code: string }> = {
    eventloop: {
      title: '🌀 Node.js Event Loop',
      subtitle: 'The Non-Blocking Core Engine',
      desc: 'The single-threaded coordinator of callback executions. Offloads intensive tasks (I/O, database access, networking) asynchronously to Libuv and collects the result payloads via callbacks.',
      tip: 'Interview Tip: The poll phase is where incoming network connection callbacks are processed. Avoid CPU-heavy synchronous loops here as it halts the loop from ticking.',
      code: `// Avoid: This freezes the Event Loop completely!
const data = fs.readFileSync('large.txt'); 

// Do: This keeps the Event Loop highly responsive
fs.readFile('large.txt', (err, data) => {
  console.log("Read background complete!");
});`
    },
    v8engine: {
      title: '🚀 Google V8 Engine',
      subtitle: 'JavaScript JIT Compiler',
      desc: 'Google Chrome’s high-performance open-source JavaScript and WebAssembly engine, written in C++. It JIT-compiles (Just-In-Time) JavaScript code directly into native processor machine code.',
      tip: 'Performance Tip: Keep object shape consistent (hidden classes) so V8 can perform inline caching optimizations for lightning properties access speed.',
      code: `// V8 Optimized class instance
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
const p1 = new Point(1, 2);
const p2 = new Point(3, 4); // Fast execution paths!`
    },
    threadpool: {
      title: '🧵 Libuv Thread Pool',
      subtitle: 'Heavy Work offloading cluster',
      desc: ' Libuv pre-allocates a pool of OS threads (default size of 4) to execute blocking low-level calls like standard filesystem operations, crypto (bcrypt hashing), and DNS inquiries.',
      tip: 'Sizing Tip: Adjust thread pool capability via process.env.UV_THREADPOOL_SIZE depending on system CPU core counts to boost multi-threaded operations throughput.',
      code: `// Custom Thread Pool resizing
process.env.UV_THREADPOOL_SIZE = 12;

const crypto = require('crypto');
// These hashes now run concurrently on separate worker threads!
for(let i=0; i<8; i++) {
  crypto.pbkdf2('pass', 'salt', 100000, 64, 'sha512', () => {
    console.log(\`Hash \${i+1} completed.\`);
  });
}`
    },
    microtasks: {
      title: '⚡ Microtask Queue',
      subtitle: 'Priority Micro-Callbacks execution',
      desc: 'A dedicated high-priority queue consisting of nextTick callbacks and promise resolutions. This queue is executed completely immediately after any operation in the event loop.',
      tip: 'Precedence Tip: process.nextTick() callbacks execute before standard Promise resolve .then() callbacks.',
      code: `process.nextTick(() => {
  console.log("1. nextTick (Fires absolute first!)");
});
Promise.resolve().then(() => {
  console.log("2. Promise resolve (Fires second!)");
});`
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Title & Banner Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent flex items-center gap-2">
            <Library className="h-8 w-8 text-emerald-600" />
            Revision Library Hub
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Access revision notes, clickable interactive Node.js flow charts, and premium book PDFs.
          </p>
        </div>
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <Input
            placeholder="Search notes or books..."
            className="pl-10 rounded-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs list selector */}
      <div className="flex flex-wrap gap-2 border-b border-zinc-100 pb-2 dark:border-zinc-800">
        <button
          onClick={() => { setActiveTab('insights'); setSearchQuery(''); }}
          className={cn(
            'flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all duration-200 cursor-pointer',
            activeTab === 'insights'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-zinc-600 dark:text-zinc-450 hover:bg-zinc-100 dark:hover:bg-zinc-800'
          )}
        >
          <Sparkles className="h-4 w-4" />
          Saved Insights ({notes.length})
        </button>
        <button
          onClick={() => { setActiveTab('revision'); setSearchQuery(''); }}
          className={cn(
            'flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all duration-200 cursor-pointer',
            activeTab === 'revision'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-zinc-600 dark:text-zinc-450 hover:bg-zinc-100 dark:hover:bg-zinc-800'
          )}
        >
          <FileText className="h-4 w-4" />
          Revision Notes
        </button>
        <button
          onClick={() => { setActiveTab('nodejs'); setSearchQuery(''); }}
          className={cn(
            'flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all duration-200 cursor-pointer',
            activeTab === 'nodejs'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-zinc-600 dark:text-zinc-450 hover:bg-zinc-100 dark:hover:bg-zinc-800'
          )}
        >
          <Cpu className="h-4 w-4" />
          Interactive Node.js Hub
        </button>
        <button
          onClick={() => { setActiveTab('books'); setSearchQuery(''); }}
          className={cn(
            'flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all duration-200 cursor-pointer',
            activeTab === 'books'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-zinc-600 dark:text-zinc-450 hover:bg-zinc-100 dark:hover:bg-zinc-800'
          )}
        >
          <Book className="h-4 w-4" />
          Curated Books & PDFs
        </button>
      </div>

      {/* Tab 1: Saved AI Insights */}
      {activeTab === 'insights' && (
        <div>
          {filteredNotes.length === 0 ? (
            <Card className="flex flex-col items-center justify-center p-12 text-center border-zinc-200/50 dark:border-zinc-800/50 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md">
              <BookOpen className="h-12 w-12 text-zinc-300 mb-4" />
              <h2 className="text-xl font-bold">No saved AI Insights</h2>
              <p className="text-zinc-400 mt-2 text-xs max-w-sm leading-relaxed">
                {searchQuery ? "No saved notes match your query." : "Insights captured during your AI sessions will populate here. Ready to create your first session?"}
              </p>
              {!searchQuery && (
                <Button className="mt-6 px-6 py-2" onClick={() => window.location.href = '/'}>
                  Start Focused session
                </Button>
              )}
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredNotes.map((note) => (
                <Card key={note.id} className="flex flex-col gap-4 border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-md bg-white/80 dark:bg-zinc-900/80 shadow-sm transition-all hover:scale-[1.02] duration-200 hover:border-emerald-500 rounded-2xl p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-600 dark:bg-emerald-950/30">
                      <Tag className="h-3 w-3" />
                      {note.category || 'Focus'}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-zinc-400">
                      <Calendar className="h-3 w-3" />
                      {new Date(note.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold leading-snug text-zinc-800 dark:text-zinc-150">{note.title}</h3>
                    <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-4 leading-relaxed">
                      {note.summary}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Revision Notes & Cheat Sheets */}
      {activeTab === 'revision' && (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredRevisions.map((rev) => (
            <Card key={rev.id} className="flex flex-col gap-4 border-zinc-200/50 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-900/80 shadow-md p-6 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 h-16 w-16 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[9px] font-bold text-emerald-650 dark:bg-emerald-950/45 dark:text-emerald-400 tracking-wide uppercase">
                    {rev.subject}
                  </span>
                  <span className={cn(
                    'rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase',
                    rev.difficulty === 'Beginner' ? 'bg-zinc-100 text-zinc-600' :
                    rev.difficulty === 'Intermediate' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400' :
                    'bg-red-150 text-red-700 dark:bg-red-950 dark:text-red-400'
                  )}>
                    {rev.difficulty}
                  </span>
                </div>
                <span className="text-[10px] text-zinc-400 font-semibold">{rev.readTime}</span>
              </div>

              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">{rev.title}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed font-semibold">
                  {rev.summary}
                </p>
                
                <div className="mt-4 bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl text-[11px] leading-relaxed border border-zinc-100 dark:border-zinc-900 text-zinc-650 dark:text-zinc-350">
                  {rev.details}
                </div>

                {rev.codeSnippet && (
                  <div className="mt-3 bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 font-mono text-[10px] leading-relaxed text-emerald-400 overflow-x-auto select-all max-h-[140px]">
                    <pre>{rev.codeSnippet}</pre>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Tab 3: Interactive Node.js Flow Architecture */}
      {activeTab === 'nodejs' && (
        <Card className="p-6 border-zinc-200/50 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-900/80 shadow-md rounded-2xl flex flex-col gap-6">
          <div>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
              <Network className="h-4 w-4 text-emerald-600 animate-pulse" />
              Node.js Live Concept Graph
            </span>
            <h2 className="text-xl font-bold mt-1 text-zinc-800 dark:text-zinc-100">Click Nodes to Revise Internals</h2>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              Explore how single-threaded JIT compiles, schedules macrotasks, and offloads heavy database execution blocks.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-12">
            {/* Left Col: Interactive CSS Flowchart diagram */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-150 dark:border-zinc-850 relative min-h-[360px] overflow-hidden">
              <div className="absolute top-0 right-0 h-48 w-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

              {/* V8 engine Node */}
              <button 
                onClick={() => setSelectedNode('v8engine')}
                className={cn(
                  'absolute top-8 left-1/2 -translate-x-1/2 px-5 py-3 rounded-2xl border-2 font-bold text-xs flex flex-col items-center gap-1 shadow-md transition-all cursor-pointer',
                  selectedNode === 'v8engine' 
                    ? 'border-emerald-600 bg-emerald-500 text-white shadow-emerald-500/20 scale-105' 
                    : 'border-zinc-200 bg-white hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-355'
                )}
              >
                <span>🚀 V8 Compilation Engine</span>
                <span className="text-[8px] opacity-75">C++ JS Compiler</span>
              </button>

              {/* Connecting line */}
              <div className="h-10 w-0.5 bg-zinc-300 dark:bg-zinc-750 absolute top-[80px] left-1/2 -translate-x-1/2" />

              {/* Event loop Center Node */}
              <button 
                onClick={() => setSelectedNode('eventloop')}
                className={cn(
                  'absolute top-[125px] left-1/2 -translate-x-1/2 px-6 py-4 rounded-2xl border-2 font-black text-xs flex flex-col items-center gap-1 shadow-md transition-all cursor-pointer',
                  selectedNode === 'eventloop' 
                    ? 'border-emerald-600 bg-emerald-500 text-white shadow-emerald-500/20 scale-105 animate-spin-slow' 
                    : 'border-zinc-200 bg-white hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-355'
                )}
              >
                <span>🌀 Libuv Event Loop</span>
                <span className="text-[8px] opacity-75">Single Thread Coordinator</span>
              </button>

              {/* Conecting line horizontal split */}
              <div className="absolute top-[148px] left-[35%] right-[35%] h-0.5 bg-zinc-300 dark:bg-zinc-750 z-0" />
              <div className="absolute top-[148px] left-[35%] h-14 w-0.5 bg-zinc-300 dark:bg-zinc-750 z-0" />
              <div className="absolute top-[148px] right-[35%] h-14 w-0.5 bg-zinc-300 dark:bg-zinc-750 z-0" />

              {/* Microtask Queue Left Node */}
              <button 
                onClick={() => setSelectedNode('microtasks')}
                className={cn(
                  'absolute top-[210px] left-[15%] px-5 py-3 rounded-xl border-2 font-bold text-[10px] flex flex-col items-center gap-1 shadow-md transition-all cursor-pointer',
                  selectedNode === 'microtasks' 
                    ? 'border-emerald-600 bg-emerald-500 text-white scale-105' 
                    : 'border-zinc-200 bg-white hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-355'
                )}
              >
                <span>⚡ Microtask Queue</span>
                <span className="text-[8px] opacity-75">Promise / nextTick</span>
              </button>

              {/* Thread Pool Right Node */}
              <button 
                onClick={() => setSelectedNode('threadpool')}
                className={cn(
                  'absolute top-[210px] right-[15%] px-5 py-3 rounded-xl border-2 font-bold text-[10px] flex flex-col items-center gap-1 shadow-md transition-all cursor-pointer',
                  selectedNode === 'threadpool' 
                    ? 'border-emerald-600 bg-emerald-500 text-white scale-105' 
                    : 'border-zinc-200 bg-white hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-355'
                )}
              >
                <span>🧵 libuv Thread Pool</span>
                <span className="text-[8px] opacity-75">I/O Offload (Size: 4+)</span>
              </button>
            </div>

            {/* Right Col: Details card of selected node */}
            <div className="lg:col-span-5 flex flex-col justify-between p-5 rounded-2xl bg-zinc-50/40 dark:bg-zinc-950/20 border border-zinc-150 dark:border-zinc-850 min-h-[300px]">
              <div>
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-emerald-650 dark:text-emerald-450">Architecture Spec</span>
                <h3 className="text-lg font-extrabold text-zinc-900 dark:text-zinc-100 mt-1">
                  {nodejsArchitectureDetails[selectedNode].title}
                </h3>
                <p className="text-[11px] font-bold text-zinc-400 mt-0.5">
                  {nodejsArchitectureDetails[selectedNode].subtitle}
                </p>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-4 leading-relaxed font-semibold">
                  {nodejsArchitectureDetails[selectedNode].desc}
                </p>

                <div className="mt-4 flex items-start gap-2 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/40 text-xs">
                  <Info className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                  <p className="text-zinc-650 dark:text-zinc-350 italic font-medium leading-relaxed">
                    {nodejsArchitectureDetails[selectedNode].tip}
                  </p>
                </div>
              </div>

              <div className="mt-4 bg-zinc-950 p-3.5 border border-zinc-800 rounded-xl font-mono text-[9px] text-emerald-400 overflow-x-auto max-h-[150px]">
                <pre>{nodejsArchitectureDetails[selectedNode].code}</pre>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Tab 4: Curated E-Books & simulated PDF reader */}
      {activeTab === 'books' && (
        <div>
          {/* Books grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredBooks.map((book) => (
              <Card key={book.id} className="flex flex-col gap-4 border-zinc-200/50 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-900/80 shadow-md p-6 rounded-2xl hover:border-emerald-500 transition-all duration-200 hover:scale-[1.01]">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-600 dark:bg-emerald-950/30">
                    {book.category}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-bold">{book.pages} Pages</span>
                </div>

                <div className="flex-1">
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">{book.title}</h3>
                  <p className="text-[10px] text-zinc-400 mt-0.5">By {book.author}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-450 mt-3 line-clamp-3 leading-relaxed">
                    {book.description}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="flex flex-col gap-1 mt-2">
                  <div className="flex items-center justify-between text-[9px] font-bold text-zinc-400">
                    <span>Reading Progress</span>
                    <span>{book.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                      style={{ width: `${book.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800 mt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 gap-1 text-[10px] h-8 border-zinc-200 dark:border-zinc-800"
                    onClick={() => {
                      setActiveBookReader(book);
                      setCurrentChapterIdx(0);
                      setReaderNotesInput('');
                    }}
                  >
                    <BookOpen className="h-3.5 w-3.5 text-emerald-600" />
                    Open Reader
                  </Button>
                  <a 
                    href={book.downloadUrl}
                    className="flex items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 px-3 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                    title="Download Book PDF"
                  >
                    <Download className="h-3.5 w-3.5 text-zinc-500" />
                  </a>
                </div>
              </Card>
            ))}
          </div>

          {/* SIMULATED PDF READER OVERLAY */}
          {activeBookReader && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/70 backdrop-blur-md p-4 animate-fadeIn">
              <Card className="w-full max-w-4xl h-[90vh] flex flex-col justify-between p-6 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl relative overflow-hidden animate-scaleIn">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-zinc-150 dark:border-zinc-850 pb-4">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setActiveBookReader(null)}
                      className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                    </button>
                    <div>
                      <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">{activeBookReader.title}</h3>
                      <p className="text-[10px] text-zinc-400">By {activeBookReader.author} • Chapter {currentChapterIdx + 1} of {activeBookReader.chapters.length}</p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setActiveBookReader(null)}
                    className="text-xs font-bold hover:bg-zinc-100"
                  >
                    Close PDF
                  </Button>
                </div>

                {/* Content body split */}
                <div className="flex-1 grid md:grid-cols-12 gap-6 overflow-hidden my-4">
                  
                  {/* Left Column: Chapters selector & Quick jump */}
                  <div className="md:col-span-3 border-r border-zinc-100 dark:border-zinc-850 pr-4 flex flex-col gap-4 overflow-y-auto max-h-full">
                    <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Chapters</h4>
                    <div className="flex flex-col gap-1.5">
                      {activeBookReader.chapters.map((ch, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentChapterIdx(idx)}
                          className={cn(
                            'text-left rounded-xl p-2.5 text-xs transition-all cursor-pointer leading-snug',
                            currentChapterIdx === idx
                              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 font-bold'
                              : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                          )}
                        >
                          <div className="truncate font-bold">{ch.title}</div>
                          <div className="text-[9px] opacity-75 mt-0.5">Pages {ch.pages}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Center Column: Text Reader Content simulator */}
                  <div className="md:col-span-6 bg-zinc-50/50 dark:bg-zinc-950/30 rounded-2xl p-6 border border-zinc-150 dark:border-zinc-850 overflow-y-auto max-h-full flex flex-col gap-4">
                    <div className="flex items-center justify-between text-[9px] font-bold text-emerald-600 uppercase tracking-wider">
                      <span>Interactive PDF Simulator</span>
                      <span>Page {activeBookReader.chapters[currentChapterIdx].pages}</span>
                    </div>

                    <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-150">
                      {activeBookReader.chapters[currentChapterIdx].title}
                    </h3>

                    <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-semibold">
                      {activeBookReader.chapters[currentChapterIdx].snippet}
                    </p>

                    <p className="text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed font-medium">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Satius est bene adhibita potestate uti, honestius patriae consulere. Certe, si utrumque probabilius est, parvi pendendum est. Atqui reperiemus asotos cum voluptate viventes. Quem quidem vos, cum improbis poenis minitamini, non intellegitis, quid sit hoc.
                    </p>

                    <p className="text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed font-medium">
                      Quae cum dixisset paulumque institisset, Quid est, inquit, cur Quirini filium non dederis? Eamne rationem igitur sequere, qua tecum ipse loquere? Deinde prima illa, quae in congressu solemus: Quid tu, inquit, huc?
                    </p>
                  </div>

                  {/* Right Column: Take Notes during reading block */}
                  <div className="md:col-span-3 flex flex-col gap-4 max-h-full">
                    <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Reader Notebook</h4>
                    <div className="flex flex-col gap-3 bg-zinc-50/50 dark:bg-zinc-950/30 p-4 border border-zinc-150 dark:border-zinc-850 rounded-2xl flex-1 justify-between">
                      <div className="flex flex-col gap-2">
                        <span className="text-[9px] font-bold text-zinc-400">Save active reflections directly into your Saved AI Insights tab.</span>
                        <textarea
                          placeholder="Jot down a quick insight, formula, or key revision question here..."
                          value={readerNotesInput}
                          onChange={(e) => setReaderNotesInput(e.target.value)}
                          className="w-full h-[150px] rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 text-xs leading-relaxed focus:ring-1 focus:ring-emerald-500 font-semibold"
                        />
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        {readerNotesSaved && (
                          <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 p-2 rounded-lg text-center justify-center">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                            Insight saved to Library!
                          </div>
                        )}
                        <Button 
                          onClick={handleSaveReaderNote} 
                          disabled={!readerNotesInput.trim()}
                          className="w-full text-xs font-bold py-2"
                        >
                          Save Reflection
                        </Button>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Footer Controls */}
                <div className="flex items-center justify-between border-t border-zinc-150 dark:border-zinc-850 pt-4 text-xs font-bold text-zinc-500">
                  <Button
                    variant="ghost"
                    disabled={currentChapterIdx === 0}
                    onClick={() => setCurrentChapterIdx(currentChapterIdx - 1)}
                    className="gap-1.5"
                  >
                    <ChevronRight className="h-4 w-4 rotate-180" />
                    Previous Chapter
                  </Button>
                  
                  <span>Progress: {Math.round(((currentChapterIdx + 1) / activeBookReader.chapters.length) * 100)}%</span>

                  <Button
                    variant="ghost"
                    disabled={currentChapterIdx === activeBookReader.chapters.length - 1}
                    onClick={() => setCurrentChapterIdx(currentChapterIdx + 1)}
                    className="gap-1.5"
                  >
                    Next Chapter
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
