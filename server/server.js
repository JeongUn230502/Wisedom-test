const express = require("express");
const app = express();
const users = require("./Router/users");

app.use(express.json());

app.use("/users", users);

const port = 5000;
app.listen(port, () => console.log(`${port}`));

// app.get("/api/users", (req, res) => {
//   const sql = "select * from users";
//   con.query(sql, function (err, result, fields) {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// app.get("/api/teddy", (req, res) => {
//   const sql = "select * from users";
//   con.query(sql, function (err, result, fields) {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// app.post("/api/add", (req, res) => {
//   const item = req.body;
//   console.log(item);
//   const sql = `INSERT INTO users set ?`;
//   con.query(
//     sql,
//     { name: item.name, email: item.email },
//     function (err, result, fields) {
//       if (err) throw err;
//       console.log(err);
//     }
//   );
// });

// app.put("/api/put", (req, res) => {
//   const item = req.body;
//   console.log(item);
//   const sql = `UPDATE users SET email = '${item.email}' WHERE name = '${item.name}'`;
//   con.query(sql, function (err, result, fields) {
//     if (err) throw err;
//     console.log(err);
//   });
// });

// app.delete("/api/delete", (req, res) => {
//   const name = req.query.name;
//   console.log(name);
//   const sql = `DELETE from users where name = '${name}'`;
//   con.query(sql, function (err, result, fields) {
//     if (err) throw err;
//     console.log(err);
//   });
// });
