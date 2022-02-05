// mongodb 와 mongoose 가져오기
import "./db";
import "./models/Video";
import app from "./server";

// 백엔드 관습: 포트 4000번
const PORT = 4000;

const handleListening = () =>
  console.log(`✅ Server listening on port http://localhost:${PORT} 🚀 `);

app.listen(PORT, handleListening);