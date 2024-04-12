// test 문제
// 1. cookie-parser 미들웨어를 적용하기
// 2. `GET` Method로 `http://localhost:5001/set`을 호출했을 때, name이라는 이름을 가진 nodejs 문자열을 저장한 쿠키를 반환하기
// 3. `GET` Method로 `http://localhost:5001/get`을 호출했을 때, 클라이언트에게 전달받은 모든 쿠키 정보들이 반환되는 API를 만들기
import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
const SERVER_PORT = 5001;

app.use(express.json());
app.use(cookieParser());

app.get('/set', (req, res) => {
    res.cookie('name', 'nodejs');
    return res.status(200).end();
});

app.get('/get', (req, res) => {
    const cookies = req.cookies;
    return res.status(200).json({ cookies });
});

app.listen(SERVER_PORT, () => {
    console.log(SERVER_PORT, '포트로 서버가 열렸습니다.');
});
