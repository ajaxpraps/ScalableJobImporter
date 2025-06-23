const { Server } = require('socket.io');
const cors = require('cors');
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
require('./config/dbConfig');


const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});


const jobImportHistorySchema = new mongoose.Schema({}, { strict: false }); 
const jobImportHistoryModel = mongoose.model('JobImportHistory', jobImportHistorySchema);

io.on('connection', async (socket) => {
  console.log('Client connected:', socket.id);

  const allHistory = await jobImportHistoryModel.find();
  socket.emit('initial_data', allHistory);
});


jobImportHistoryModel.watch().on('change', async (change) => {
  const all = await jobImportHistoryModel.find();
  console.log(all);
  io.emit('import_history_update', all);
});


server.listen(3001, () => console.log('Socket.io server running on http://localhost:3001'));