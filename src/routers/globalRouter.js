// 글로벌: 맨 처음 접속했을 때 보는 화면의 URL 이므로 유저 기능에 해당해도 글로벌에 넣는다.
import express from "express";
import { home, search } from "../controllers/videoController.js";
import { join, userLogin, userSearch } from "../controllers/userController.js";

const globalRouter = express.Router();

// 홈에서 할 수 있는 다양한 기능들
globalRouter.get("/", home);
globalRouter.get("/join", join);
globalRouter.get('/login', userLogin);
globalRouter.get('/search', search);

// const 변수만 export 할 수 있다
export default globalRouter;