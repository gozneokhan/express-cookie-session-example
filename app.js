import express from 'express';
import cookieParser from 'cookie-parser'; // (2)cookie-parser

const app = express();
const SERVER_PORT = 5001;

app.use(express.json());
app.use(cookieParser()); // (2)cookie-parser ->  사용을 위한 전역 미들웨어 등록

/**
 *  set-cookie API
 *  res.cookie()를 이용하여 쿠키를 할당하는 API
 */
app.get('/set-cookie', (req, res) => {
    let expires = new Date();
    expires.setMinutes(expires.getMinutes() + 60); // 만료 시간을 60분으로 설정

    res.cookie('name', 'gozneok', {
        expires: expires,
    });

    return res.end(); // end(); res 안보낼 때 사용
});

/**
 *  get-cookie API
 *  req.hheaders.cookie를 이용하여 클라이언트의 모든 쿠키를 조회하는 API
 */
app.get('/get-cookie', (req, res) => {
    const cookie = req.headers.cookie;
    console.log(cookie); // name=gozneok

    const cookies = req.cookies; // { name: 'gozneok' } 하나의 객체처럼 관리 ->  (2)cookie-parser 방법
    console.log(cookies);

    return res.status(200).json({ cookie });
});

/**
 *  set-session API
 */
let session = {};
// set-session이라는 API를 1번 호출한 상태
// name: "gozneok"

app.get('/set-session', function (req, res, next) {
    // 현재는 gozneok이라는 이름을 저장하지만, 나중에 복잡한 사용자의 정보로 변경될 수 있음
    const name = 'gozneok';
    const uniqueInt = Date.now();
    // 세션 사용자의 시간 정보 저장
    session[uniqueInt] = { name };

    res.cookie('sessionKey', uniqueInt);
    return res.status(200).end();
});

/**
 *  get-session API
 *  세션 키에 해당하는 세션 정보를 조회하는 API
 */
app.get('/get-session', function (req, res, next) {
    const { sessionKey } = req.cookies;
    console.log(session); // 출력: { '1712921814557': { name: 'gozneok' } }

    // 클라이언트의 쿠키에 저장된 세션키로 서버의 세션 정보를 조회
    const name = session[sessionKey];
    return res.status(200).json({ name });
});

app.listen(SERVER_PORT, () => {
    console.log(SERVER_PORT, '포트로 서버가 열렸습니다.');
});
