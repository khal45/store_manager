import {
  loginRouter,
  productRouter,
  logoutRouter,
  userRouter,
  salesRouter,
  saleDetailsRouter,
  cartRouter,
} from "./src/routes/index.js";
import express from "express";
import cookieParser from "cookie-parser";
const app = express();
app.use(cookieParser());

const port = process.env.PORT || 3000;

// routes
app.use("/", loginRouter);
app.use("/", productRouter);
app.use("/", logoutRouter);
app.use("/", userRouter);
app.use("/", salesRouter);
app.use("/", saleDetailsRouter);
app.use("/", cartRouter);

// start the server
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
