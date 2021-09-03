import { errorHandler } from "./middleware/errorHandler";
import cors from "cors";
import express, { Express, Request, Response, NextFunction } from "express";
import postRoutes from "./routes/PostRoutes";
import userRoutes from "./routes/UserRoutes";

const app: Express = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// express-winston logger makes sense BEFORE the router
// app.use(infoLogger());

// this must come after the winston config and before error logger
app.use("/posts", postRoutes);
app.use("/users", userRoutes);

// express-winston errorLogger makes sense AFTER the router.
// app.use(errorLogger());

// Error Handler
app.use(errorHandler);

app.listen(PORT, () =>
  console.log("🔥 server is running at PORT : ", PORT, "🔥")
);
