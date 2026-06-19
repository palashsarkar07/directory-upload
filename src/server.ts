import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = Number(process.env.PORT ?? 5500);

app.use(express.static(path.join(__dirname, "public")));

app.get("/config.js", (_, res) => {
  res.type("application/javascript");
  res.send(`
window.APP_CONFIG = {
  API_BASE_URL: "${process.env.API_BASE_URL}"
};
`);
});

app.listen(PORT, () => {
  console.log(`Test client running at http://localhost:${PORT}`);
});