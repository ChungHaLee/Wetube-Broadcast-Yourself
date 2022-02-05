import mongoose from "mongoose";
// 데이터의 타입을 지정, DB 에게 알려주기 (중요, 자세할수록 좋음)
// Schema: mongoose 가 시스템을 만들어서
// 지정된 데이터의 형식으로만 입력을 받을 수 있도록 해준다

// default 를 지정하면 controller 에 안 적어도됨
const videoSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, maxLength: 80 },
    description: { type: String, required: true, trim: true, minLength: 10 },
    createdAt: { type: Date, required: true, default: Date.now },
    hashtags: [{ type: String, trim: true }],
    meta: {
        views: { type: Number, default: 0, required: true},
        rating: { type: Number, default: 0, required: true },
    }
});

// mongoose 미들웨어
videoSchema.static('formatHashtags', function(hashtags) {
    return hashtags
        .split(",")
        .map((word) => (word.startsWith("#") ? word : `#${word}`))
});


// 유저로부터 받는 데이터는 이 형식(모델)에 맞게만 받을 수 있음
const Video = mongoose.model("Video", videoSchema);

export default Video;