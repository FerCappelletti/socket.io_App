import app from "./app.js"
import { Server as SocketServer } from "socket.io";
import http from "http";
import cors from "cors";
import { PORT } from "./config.js";
import { connectDB } from "./db.js";


connectDB();

const server = http.createServer(app);
const httpServer = server.listen(PORT)
const io = new SocketServer(httpServer, {
        cors: {
             origin: "*"
        }
   });


console.log("Server started on port " + PORT)

// import morgan from "morgan";





// app.use(cors())
// app.use(morgan("dev"));

// io.on('connection', (socket) => {
//     console.log('a user connected ' + socket.id);

//     socket.on('message', (message) => {
//         console.log(message)
//         socket.broadcast.emit('message', {
//             body: message,
//             from: socket.id
//         })
//     })
//   });



