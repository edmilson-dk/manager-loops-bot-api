const fs = require('fs');

const paths = [
  "./musics/youtube",
];

paths.forEach(path => {
  fs.mkdirSync(path, { recursive: true });
  fs.writeFileSync(`${path}/file.txt`, `void`);
});