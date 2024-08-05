import express from 'express';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';

const app = express();

app.use(express.json());
app.use("/api/auth.js", authRoutes);
app.use("/api/users.js", userRoutes);
app.use("/api/posts", postRoutes);

app.use(express.json());

app.listen(8800, ()=> {
    console.log("Connected!");
})