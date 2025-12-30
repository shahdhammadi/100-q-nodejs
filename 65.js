const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

app.post('/upload-avatar', upload.single('avatar'), (req, res) => {
    res.json({
        message: 'تم رفع الملف بنجاح',
        filename: req.file.filename,
        path: `/uploads/${req.file.filename}`
    });
});