const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve uploaded files statically
app.use('/uploads', express.static(uploadsDir));

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const safeName = file.originalname.replace(/[^a-zA-Z0-9_.-]/g, '_');
    cb(null, `${timestamp}_${safeName}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB per file
});

// Health
app.get('/api/health', (req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

// File upload endpoint
app.post('/api/upload', upload.array('files', 10), (req, res) => {
  const files = req.files || [];
  const results = files.map(f => ({
    originalName: f.originalname,
    filename: f.filename,
    size: f.size,
    url: `/uploads/${f.filename}`
  }));
  res.json({ success: true, files: results });
});

// Application submission endpoint
app.post('/api/applications', (req, res) => {
  const application = req.body || {};
  // Naive persistence: write to a JSONL log for demo purposes
  const line = JSON.stringify({ ts: new Date().toISOString(), application }) + '\n';
  const outPath = path.join(__dirname, 'applications.log');
  fs.appendFile(outPath, line, err => {
    if (err) {
      console.error('Failed to write application', err);
      return res.status(500).json({ success: false });
    }
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
