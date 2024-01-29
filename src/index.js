const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");

const app = express();

app.use(express.json());

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.set("view engine", "ejs");

//static file
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.username,
    password: req.body.password,
  };
  //Kullanici Zaten Var ise?
  const existingUser = await collection.findOne({
    name: data.name,
  });

  if (existingUser) {
    res.send(
      "Kullanici zaten mevcut. Lütfen farkli bir kullanici adi giriniz."
    );
  } else {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    data.password = hashedPassword;

    const userData = await collection.insertMany(data);
    console.log(userData);
  }
});

app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({
      name: req.body.username,
    });

    if (!check) {
      res.send("Kullanici Adi Bulunamadi.❌");
    }

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      check.password
    );

    if (isPasswordMatch) {
      res.render("home");
    } else {
      req.send("Yanliş Şifre❌");
    }
  } catch (error) {
    res.send("Yanlis giriş yapildi." + error);
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on Port: ${port}`);
});

