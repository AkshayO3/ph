import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { connectDB } from './utils/db.js';
import dotenv from 'dotenv';
import routes from "./routes/index.js";
import { apiLimiter } from "./utils/rateLimiter.js";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

await connectDB();

app.use(express.json());
app.use(apiLimiter);
routes(app);

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

app.set('io', io);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(process.env.DB_URI);
});