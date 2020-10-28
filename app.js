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
database: "drinks_list_db"
});

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});


app.get("/", function (req, res) {
    connection.query("SELECT * FROM drink;", function (err, data) {
        if (err) {
            return res.status(500).end();
        }
        else {
            return res.send(views.layout({
                title: "new drink",
                children: views.list({ drinks: data })
            }
            ));
        }
    });
});

app.post("/api/drinks", function (req, res) {
    const newDrink = sanitizeHtml(req.body.plan);
    connection.query("INSERT INTO drink (name) VALUES (?)", [newDrink], function (err, result) {
        if (err) {
            return res.status(500).end();
        } else {
            return res.json({ id: result.insertId });
        }
    });
});


app.put("/api/drinks/:id", function (req, res) {
    const updateDrink = sanitizeHtml(req.body.plan);
    connection.query("UPDATE burger SET name = ? WHERE id = ?", [updateDrink, req.params.id], function (err, result) {
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


app.delete("/api/drinks/:id", function (req, res) {
    connection.query("DELETE FROM drink WHERE id = ?", [req.params.id], function (err, result) {
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

