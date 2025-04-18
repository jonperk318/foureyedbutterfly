import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(cookieParser())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/src/img')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
    }
});
const upload = multer({storage});
app.post('/api/upload', upload.any("files"), function (req, res) {

    const files = req.files;
    let fileNames = []
    files.forEach(file => {
      fileNames.push(file.filename)
    })
    const fileNamesString = fileNames.join(", ");
    res.status(200).json(fileNamesString);
});

app.use(cors({origin: process.env.CLIENT_URL, credentials: true }));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

/*
app.use(
  "/api/service",
  createProxyMiddleware({
    target: `http://127.0.0.1:${process.env.LOAD_BALANCER_PORT}/hello`,
    ignorePath: true,
  })
);
*/

app.listen(process.env.PROXY_PORT, ()=> {
    console.log("Connected");
})