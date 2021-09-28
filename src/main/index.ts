import express from "express";
import path from "path";
import fs from "fs";
import mime from "mime";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
const musicsPath = path.resolve("./musics");
const musics = fs.readdirSync(musicsPath);

app.use("/download", (req, res) => {
  const fileName = musics[Math.floor(Math.random() * musics.length)];
  const filePath = path.resolve(musicsPath, fileName);
  const fileStream = fs.createReadStream(filePath);
  const mimeType = mime.getType(fileName);

  res.setHeader("Content-Type", mimeType || "audio/mp3");
  res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);

  fileStream.pipe(res);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
