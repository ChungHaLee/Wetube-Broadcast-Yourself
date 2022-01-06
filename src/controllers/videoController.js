// 웹에서 처음 보여주는 페이지
const fakeUser = {
    username:"ChungHa",
    loggedIn: true
};

let videos = [
    {
        title: "aespa, <Savage>",
        rating: 5,
        comments: 1,
        createdAt: "2 minutes ago",
        views: 49,
        id: 0
    },
    {
        title: "GOT the beat, <Step back>",
        rating: 3,
        comments: 2455,
        createdAt: "1 minutes ago",
        views: 95,
        id: 1
    },
    {
        title: "SMCU Concert",
        rating: 5,
        comments: 56662,
        createdAt: "Just Now",
        views: 63,
        id: 2       
    }
];

export const trending = (req, res) => {
    return res.render("home", { pageTitle: "Home", fakeUser, videos })
};

export const videoWatch = (req, res) => {
    const { id } = req.params; // video 에 id 로 접근
    const video = videos[id];
    return res.render("watch", { pageTitle: `Watching ${video.title}`, fakeUser, video})
};

export const getVideoEdit = (req, res) => {
    const { id } = req.params; // video 에 id 로 접근
    const video = videos[id];
    return res.render("edit", { pageTitle: `Editing ${video.title}`, fakeUser, video})
};

export const postVideoEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body; // form(html)에 있는 value 의 js 식 표현
    videos[id].title = title; // 바로 이렇게 변경이 가능하다니 ;;
    return res.redirect(`/videos/${id}/watch`);
};

export const videoUpload = (req, res) => res.send("Upload a Video");
export const videoDelete = (req, res) => res.send("Delete a Video");