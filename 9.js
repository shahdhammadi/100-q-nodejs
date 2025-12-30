import { writeFile } from 'fs/promises';
await writeFile("result.json", JSON.stringify({ok:true}));