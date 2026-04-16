let users = {};

module.exports = (io) => {

  io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    socket.on("join", (username) => {
      users[socket.id] = username;
      io.emit("users", Object.values(users));
    });

    // TEXT MESSAGE
    socket.on("message", (msg) => {

      const data = {
        user: users[socket.id] || "Guest",
        message: msg,
        time: new Date().toLocaleTimeString(),
        type: "text"
      };

      io.emit("message", data);
    });

    // FILE MESSAGE
    socket.on("file", (fileData) => {

      const data = {
        user: users[socket.id],
        fileName: fileData.name,
        file: fileData.file,
        time: new Date().toLocaleTimeString(),
        type: "file"
      };

      io.emit("file", data);

    });

    socket.on("disconnect", () => {
      delete users[socket.id];
      io.emit("users", Object.values(users));
    });

  });

};