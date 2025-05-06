const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');

const storage = new GridFsStorage({
    url: process.env.DB,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const match = ['image/png', 'image/jpeg', 'image/jpg'];

            if (match.indexOf(file.mimetype) === -1) {
                const filename = `${Date.now()}-any-name-${file.originalname}`;
                return filename;
            }
            
            return {
                bucketName: 'uploads',
                filename: `${Date.now()}-any-name-${file.originalname}`
            }
        });
    }
}); 

module.exports = multer({ storage });