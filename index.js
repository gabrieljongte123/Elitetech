const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const path = require("path");
const Document = require("./Document");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

mongoose.connect("mongodb://127.0.0.1:27017/editor", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error(err));

app.use(express.static(path.join(__dirname, "../client")));

io.on("connection", async (socket) => {
  console.log("A user connected");

  let doc = await Document.findOne();
  if (!doc) {
    doc = await Document.create({ content: "" }); // Prevent validation error
  }

  socket.emit("load-document", doc.content);

  socket.on("doc-change", async (newContent) => {
    socket.broadcast.emit("doc-change", newContent);
    doc.content = newContent;
    await doc.save();
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});