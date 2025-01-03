import {
  loginRouter,
  productRouter,
  logoutRouter,
  userRouter,
  salesRouter,
  saleDetailsRouter,
  productDetailsRouter,
} from "./src/routes/index.js";
import express from "express";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import path from "path";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../frontend/public")));
app.use(express.static(path.join(__dirname, "../frontend/node_modules")));

const port = process.env.PORT || 3000;

// routes
app.use("/api/v1", loginRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/logout", logoutRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1/sales", salesRouter);
app.use("/api/v1/sale-details", saleDetailsRouter);
app.use("/api/v1/product-details", productDetailsRouter);

// start the server
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
