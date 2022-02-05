// node.js 의 프레임워크인 express 를 가져온다
import express from "express";
import morgan from "morgan";

// 다른 파일에서 변수 import 해오기
// Every files are isolated.
import globalRouter from "./routers/globalRouter";
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';

// express application 생성
const app = express();

// 로그를 찍는 로거 생성
const logger = morgan("dev");

// pug 설정해주기
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views"); // 현재 작업 디렉토리 확인 후 경로 수정해주기

// 로거 설정
// 미들웨어(middlewares) 는 app.use 를 사용한다.
app.use(logger);

// express - form 입력을 받을 수 있도록 해주기
// sexy middleware: extended
// urlencoded: html form 을 json 형식으로 통역 >> router 전에 있기 때문에
// urlencoded 를 통해 json 형식으로 바뀐 req.body가 router 로 들어가게 된다
app.use(express.urlencoded({ extended: true }));
app.use('/', globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;