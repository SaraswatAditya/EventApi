import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import connect from "./database/conn.js";
import router from "./router/route.js";
import eventRoutes from "./router/eventRoutes.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

/* middleware */
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(
  cors({
    origin: "*", // Allow all origins
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: "Content-Type,Authorization",
  })
);


app.use(morgan("tiny"));
app.disable("x-powered-by"); // less hackers know about our stack

// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads'));


const port = process.env.PORT || 8080;

// HTTP GET Request
app.get("/", (req, res) => {
  res.status(201).json("Home GET Request");
});

// API routes
app.use("/api", router);
app.use("/api/events", eventRoutes);

// Start server when there is a valid connection
connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server connected to http://localhost:${port}`);
      });
    } catch (error) {
      console.log("Cannot connect to the server");
    }
  })
  .catch((error) => {
    console.log("Invalid database connection...!", error);
  });

export default app;
