import express from "express";
import {videoWatch,  
    getVideoEdit,
    postVideoEdit, 
    getUpload, 
    postUpload,
    deleteVideo} 
from "../controllers/videoController.js";

const videoRouter = express.Router();
// /:~ --> .params = 고유 식별자  
videoRouter.get("/:id([0-9a-f]{24})", videoWatch);
// .route 사용 (같은 링크인데 get 방식, post 방식을 둘다 사용해야할 때)
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getVideoEdit).post(postVideoEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").get(deleteVideo);
videoRouter.route("/upload").get(getUpload).post(postUpload);

// const 변수만 export 할 수 있다
export default videoRouter; 