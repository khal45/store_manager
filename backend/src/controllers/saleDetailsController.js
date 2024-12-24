import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(
  __dirname,
  "../../../frontend/views/sale-details.html"
);

const getSaleDetails = (req, res) => {
  res.sendFile(filePath);
};

export { getSaleDetails };
