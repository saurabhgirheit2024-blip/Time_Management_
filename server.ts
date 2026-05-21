import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import fs from 'fs';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // API Route for Code Execution
  app.post('/api/execute', async (req, res) => {
    const { code, language, input } = req.body;
    const tempDir = os.tmpdir();
    const fileName = `code_${Date.now()}`;
    let filePath = '';
    let command = '';

    try {
      switch (language.toLowerCase()) {
        case 'javascript':
          filePath = path.join(tempDir, `${fileName}.js`);
          fs.writeFileSync(filePath, code);
          command = `node ${filePath}`;
          break;
        case 'python':
          filePath = path.join(tempDir, `${fileName}.py`);
          fs.writeFileSync(filePath, code);
          command = `python3 ${filePath}`;
          break;
        case 'c++':
          filePath = path.join(tempDir, `${fileName}.cpp`);
          const outPath = path.join(tempDir, `${fileName}.out`);
          fs.writeFileSync(filePath, code);
          command = `g++ ${filePath} -o ${outPath} && ${outPath}`;
          break;
        case 'java':
          filePath = path.join(tempDir, `Main_${Date.now()}.java`);
          // Java requires the class name to match the file name
          const javaClassName = path.basename(filePath, '.java');
          const javaCode = code.replace(/public class \w+/, `public class ${javaClassName}`);
          fs.writeFileSync(filePath, javaCode);
          command = `javac ${filePath} && java -cp ${tempDir} ${javaClassName}`;
          break;
        default:
          return res.status(400).json({ error: 'Unsupported language' });
      }

      // Execute with a timeout
      const child = exec(command, { timeout: 5000 }, (error, stdout, stderr) => {
        // Cleanup
        if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);
        const outPath = filePath.replace(/\.\w+$/, '.out');
        if (fs.existsSync(outPath)) fs.unlinkSync(outPath);
        const classPath = filePath.replace(/\.java$/, '.class');
        if (fs.existsSync(classPath)) fs.unlinkSync(classPath);

        if (error) {
          return res.json({ output: stderr || error.message, error: true });
        }
        res.json({ output: stdout, error: false });
      });

      if (input && child.stdin) {
        child.stdin.write(input);
        child.stdin.end();
      }
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
