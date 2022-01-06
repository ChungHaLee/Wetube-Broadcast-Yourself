import express from "express";
import {videoWatch, videoUpload, postVideoEdit, getVideoEdit, videoDelete} from "../controllers/videoController.js";

const videoRouter = express.Router();

// /:~ --> .params = 고유 식별자  
videoRouter.get("/upload", videoUpload);
videoRouter.get("/:id(\\d+)/watch", videoWatch);
// .route 사용 (같은 링크인데 get 방식, post 방식을 둘다 사용해야할 때)
videoRouter.route("/:id(\\d+)/edit").get(getVideoEdit).post(postVideoEdit);
videoRouter.get("/:id(\\d+)/delete", videoDelete);

// const 변수만 export 할 수 있다
export default videoRouter;  