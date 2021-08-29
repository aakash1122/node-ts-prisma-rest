import cors from "cors";
import express, { Express } from "express";
import postRoutes from "./routes/PostRoutes";
import { errorLogger, infoLogger } from "./logger/index";

const app: Express = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// express-winston logger makes sense BEFORE the router
// app.use(infoLogger());

// this must come after the winston config and before error logger
app.use("/posts", postRoutes);

// express-winston errorLogger makes sense AFTER the router.
// app.use(errorLogger());

app.listen(PORT, () =>
  console.log("🔥 server is running at PORT : ", PORT, "🔥")
);
