/* eslint-disable no-unused-vars */
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
dotEnv.config({ path: "./config.env" });

const app = require("./app");

const DB = process.env.DATABASE_LOCAL;
// const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD_DB);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    autoIndex: true, //this is the code I added that solved it all
    keepAlive: true,
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4, // Use IPv4, skip trying IPv6
  })
  .then(() => console.log("DB is connected 🔥"));

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.message);
  server.close(() => {
    process.exit(1);
  });
});
process.on("uncaughtException", (err) => {
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
