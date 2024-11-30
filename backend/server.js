import { loginRouter, productRouter } from "./src/routes/index.js";
import express from "express";
const app = express();

const port = process.env.PORT || 3000;

// routes
app.use("/", loginRouter);
app.use("/", productRouter);

// start the server
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
