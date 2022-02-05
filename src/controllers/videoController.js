import { acceptsLanguage } from "express/lib/request";
import Video from '../models/Video.js'

// 유저 로그인 (페이크 유저)
const fakeUser = {
    username:"ChungHa",
    loggedIn: true
};

export const home = async (req, res) => {
    try {
        const videos = await Video.find({}).sort({ createdAt:"desc" }); // await: db 로부터 video 를 받을 때까지 이 자리에서 기다려준다(wait!)
        console.log(videos);
        return res.render("home", { pageTitle: "Home", fakeUser, videos });
    } catch { // python 의 try-except (예외처리) 처럼 에러가 나면 catch 로 가게 됨
        return res.render("server-error");
    }
}

export const videoWatch = async(req, res) => {
    const { id } = req.params; // video 에 id 로 접근(url 에 있는 video's id)
    const video = await Video.findById(id);
    if (!video) {
        return res.render("404", { pageTitle: "Video Not Found.", fakeUser});
    }
    return res.render("watch", { pageTitle: video.title, fakeUser, video })
};

export const getVideoEdit = async(req, res) => {
    const { id } = req.params; // video 에 id 로 접근
    const video = await Video.findById(id);
    if (!video) {
        return res.render("404", { pageTitle: "Video Not Found.", fakeUser});
    }
    return res.render("edit", { pageTitle: `Edit ${video.title}`, fakeUser, video })
};

export const postVideoEdit = async(req, res) => {
    const { id } = req.params; // video 에 id 로 접근
    const { title, description, hashtags } = req.body;
    const video = await Video.exists({ _id: id });
    if (!video) {
        return res.render("404", { pageTitle: "Video Not Found.", fakeUser});
    }
    await Video.findByIdAndUpdate(id, {
        title,
        description,
        hasthags: Video.formatHashtags(hashtags)
    });

    await video.save();

    return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Uploading a video", fakeUser});
};

export const postUpload = async (req, res) => {
    // 여기에 새로운 비디오를 trending 비디오 리스트에 추가, 다시 홈으로 이동해 보여줄 것임
    // render (x) redirect (o)
    const { title, description, hashtags } = req.body;
    try {
    // mongoose 에서 저장한 데이터 스키마 불러오기(스키마에 맞는 검증된 데이터만 받는다)
    // 데이터를 DB 에 전송하는데에 시간이 걸리기 때문에 await
        await Video.create({
            title,
            description,
            hashtags: Video.formatHashtags(hashtags)
        });
        return res.redirect("/");
    }   catch (error) { // catch - 에러 대응
        return res.render("upload", { 
            pageTitle: "Upload Video", 
            errorMessage: error._message, 
        });
    }
};

export const deleteVideo = async(req, res) =>  {
    const { id } = req.params; 
    await Video.findByIdAndDelete(id);
    return res.redirect("/") // delete 로 삭제하고 home 으로 redirect
}


export const search = async(req, res) => {
    const { keyword } = req.query; // req.query is for url data, 쿼리를 가졌으니 여기에 검색 조건 추가 (쿼리로 검색)
    let videos = []; // 조건문 밖에서 정의한 videos 라는 빈 배열에 아래 조건에 맞는 비디오를 담아서 return 해줘야 render 가능
    if (keyword) {
        videos = await Video.find({
            title: {
                $regex: new RegExp(keyword, "i")  //[mongoDB] 정규표현식을 이용한 조건문! (i = 대/소문자 구별 없애줌)
            }
        })
    }
    console.log('검색 쿼리:', keyword);
    return res.render("search", { pageTitle: "Search", fakeUser, videos })
}