const multer = require('multer');

const storage = multer.diskStorage({

  destination: (_req, _file, callback) => callback(null, 'src/uploads'),
  filename: (req, _file, callback) => {
    const { id } = req.params;
    const name = `${id}.jpeg`;
    callback(null, name);
  },
});

const upload = multer({ storage });

module.exports = upload;