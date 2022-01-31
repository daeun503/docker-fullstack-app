// 필요한 모듈들을 가져오기
const express = require("express")
const bodyParser = require("body-parser")

// db 가져오기
const db = require("./db")

// Express 서버를 생성
const app = express()

// json 형태로 오는 요청의 본문을 해석해줄 수 있도록 등록
app.use(bodyParser.json())

/////////////////////////////////////////////////////////
// 테이블 생성하기
// db.pool.query(`CREATE TABLE lists (
//     id INTERGET AUTO_INCREMENT,
//     value TEXT,
//     PRIMARY KEY (id)
// )`, (err, results, fileds) => {
//     console.log("results", results)
// })

// db list 테이블에 있는 모든 데이터를 프론트 서버로
app.get('/api/values', function(req, res) {
    // db 에서 모든 정보 가져오기
    db.pool.query("SELECT * FROM lists;", (err, results, fileds) => {
        if (err)
            return res.status(500).send(err)
        else
            return res.json(results)
    })
})

// 클라이언트에서 입력한 값을 db에 삽입
app.post("/api/value", function(req, res, next) {
    // db에 값 넣어주기
    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`, (err, results, fileds) => {
        if (err)
            return res.status(500).send(err)
        else
            return res.json({ success: true, value: req.body.value}) 
    })
})


app.listen(5000, () => {
    console.log("애플리케이션이 5000번 포트에서 시작")
})