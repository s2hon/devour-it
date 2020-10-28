const express = require("express");
const mysql = require("mysql");
const sanitizeHtml = require("sanitize-html");

const views = require("./views");
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connection = mysql.createConnection({
host: "localhost",
port: 3306,
user: "root",
password: "Yuel04Banh08",
database: "burger_list_db"
});

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});


app.get("/", function (req, res) {
    connection.query("SELECT * FROM burger;", function (err, data) {
        if (err) {
            return res.status(500).end();
        }
        else {
            return res.send(views.layout({
                title: "new burger",
                children: views.list({ burgers: data })
            }
            ));
        }
    });
});

app.post("/api/burgers", function (req, res) {
    const newburger = sanitizeHtml(req.body.plan);
    connection.query("INSERT INTO burger (name) VALUES (?)", [newburger], function (err, result) {
        if (err) {
            return res.status(500).end();
        } else {
            return res.json({ id: result.insertId });
        }
    });
});


app.put("/api/burgers/:id", function (req, res) {
    const updateBurger = sanitizeHtml(req.body.plan);
    connection.query("UPDATE burger SET name = ? WHERE id = ?", [updateBurger, req.params.id], function (err, result) {
        if (err) {
            return res.status(500).end();
        }
        else if (result.changedRows === 0) {
            return res.status(404).end();
        } else {
            return res.status(200).end();
        }
    });
});


app.delete("/api/burgers/:id", function (req, res) {
    connection.query("DELETE FROM burger WHERE id = ?", [req.params.id], function (err, result) {
        if (err) {
            return res.status(500).end();
        }
        else if (result.affectedRows === 0) {
            return res.status(404).end();
        } else {
            return res.status(200).end();
        }
    });
});


app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});

