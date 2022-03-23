import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import genieRouter from "./router/genie";
import charactersRouter from "./router/characters";
import productsRouter from "./router/products";
import authRouter from "./router/auth";
import { config } from "./config";
import { connectDB } from "./database/database";
import rateLimit from "./middleware/rate-limiter";

const app = express();

const corsOption = {
  origin: config.cors.allowedOrigin,
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(helmet());
app.use(cors(corsOption));
app.use(morgan("tiny"));
app.use(rateLimit);

app.use("/genie", genieRouter);
app.use("/characters", charactersRouter);
app.use("/products", productsRouter);
app.use("/auth", authRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(404);
});
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.sendStatus(500);
});

connectDB()
  .then(() => {
    app.listen(config.port, () => {
      console.log(
        `[server] is running at ${config.port}, data : ${new Date()}`
      );
    });
  })
  .catch(console.error);
