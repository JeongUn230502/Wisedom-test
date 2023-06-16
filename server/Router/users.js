const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const app = express();
const bodyParser = require("body-parser");
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

//! --- Sign Up ----
router.post("/signUp", (req, res) => {
  const userForm = req.body;
  console.log(userForm);
  const sql = `INSERT INTO Users(name, email, password, nickname, introduce, Language) VALUES('${userForm.name}','${userForm.email}','${userForm.password}','${userForm.nickname}','${userForm.introduce}','${userForm.language}')`;
  try {
    con.query(sql, function (err, result, fields) {
      console.log(err);
      res.send(result);
    });
  } catch (error) {
    console.log(err);
  }
});

//! user조회
// router.get("/validation", (req, res) => {
//   const email = req.query.email;
//   console.log(email);
//   const sql = `SELECT * from Users WHERE email = '${email}'`;
//   con.query(sql, function (err, result, fields) {
//     if (err) throw err;
//     res.send(result);
//   });
// });

module.exports = router;
