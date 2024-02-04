import express, { Response, Request } from "express";
import { join } from "path";
const app = express();

app.use(express.static(join(__dirname, "../build")));

app.get("/", (_req: Request, res: Response) => {
  res.sendFile(join(__dirname, "../build", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`app is listening on port ${PORT}...`));
