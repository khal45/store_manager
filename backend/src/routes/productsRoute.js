import express from "express";
import path from "path";
import { fileURLToPath } from "url";

export default (app, filePath) => {
  app.route("/products").get((req, res) => {
    res.sendFile(filePath);
  });
};
