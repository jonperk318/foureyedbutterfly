import multer from "multer";


const storage = multer.diskStorage({
  destination: "../client/public/posts/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

export const upload = multer({ storage });

export const uploadFiles = (req, res) => {
  const files = req.files;
  let fileNames = [];
  files.forEach((file) => {
    fileNames.push(file.filename);
  });
  const fileNamesString = fileNames.join(", ");
  res.status(200).json(fileNamesString);
}
