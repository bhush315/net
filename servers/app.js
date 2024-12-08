import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import CONNECT from "./configs/database.js";
import authRouter from "./routes/authRoutes.js";
import session from "express-session";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.get("/", (req, res) => {
  return res.send(`APi working at port ${PORT}`);
});

app.use("/auth/api", authRouter);

app.listen(PORT, () => console.log(`Port running at ${PORT}`));
CONNECT();
