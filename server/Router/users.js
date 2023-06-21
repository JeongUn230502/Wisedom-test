const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "wjd@36312",
  database: "wisedom_test_db"
});
con.connect(function (err) {
  if (err) throw err;
  console.log("DataBase Connected");
});

//* --- Sign Up ---
router.post("/signUp", (req, res) => {
  const userForm = req.body;
  console.log(userForm.password);
  let hashPassword = "";
  //password 암호화
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(userForm.password, salt, function (err, hash) {
      hashPassword = hash;
      //? 회원가입시 nickname, introduce, language 를 모두 넣을 필요가 있을까?
      const sql = `INSERT INTO Users(name, email, password, nickname, introduce, Language) VALUES('${userForm.name}','${userForm.email}','${hashPassword}','${userForm.nickname}','${userForm.introduce}','${userForm.language}')`;
      const sql2 = `INSERT INTO subscribe(followingUser, likesPost) VALUES("[]","[]")`;
      try {
        con.query(sql, function (err, result, fields) {
          console.log(err);
          res.send(result);
        });
        con.query(sql2, function (err, result, fields) {
          console.log(err);
        });
      } catch (error) {
        console.log(err);
      }
    });
  });
});

//* --- Email 중복여부 확인 ---
router.get("/dupleEmail", (req, res) => {
  const email = req.query.email;
  const sql = `SELECT email from Users WHERE email = '${email}'`;
  con.query(sql, function (err, result, fields) {
    res.send(result);
  });
});

//* --- Sign In ---
router.post("/login", (req, res) => {
  const loginInfo = req.body;
  const sql = `SELECT email,password from Users WHERE email = '${loginInfo.email}'`;
  con.query(sql, function (err, result, fields) {
    bcrypt.compare(
      loginInfo.password,
      result[0].password,
      function (err, result) {
        if (result === true) {
          res.send(true);
        } else {
          res.send(false);
        }
      }
    );
  });
});

//* ---Take UserInfo ---
router.get("/getInfo", (req, res) => {
  const email = req.query.email;
  console.log(email);
  const sql = `SELECT name,email,nickname,introduce,Language, subscribe.followingUser, subscribe.likesPost FROM Users JOIN subscribe ON Users.idNumber = subscribe.userNumber WHERE Users.email = '${email}'`;
  con.query(sql, function (err, result, fields) {
    console.log(result);
    res.send(result);
  });
});
module.exports = router;
