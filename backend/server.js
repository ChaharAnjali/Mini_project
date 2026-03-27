const app = require("./app");
const connectDB = require("./config/db");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 5000;

// DB connect
connectDB();

// Server start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});