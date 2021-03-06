const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const errorHandler = require('./middleware/error')
const connectDB = require("./config/db");

//env config
dotenv.config({ path: "./config/config.env" });

//Connect to database
connectDB();

//routes
const bootcamps = require("./routes/bootcamps");

const app = express();

//Body Parser
app.use(express.json())

//Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// mount routes
app.use("/api/v1/bootcamps/", bootcamps);

app.use(errorHandler)

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

//handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1))
})
