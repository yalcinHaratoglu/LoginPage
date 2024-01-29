const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/login");

// Veritabanı Bağlantı Kontrolü
connect
  .then(() => {
    console.log("Veritabanı başarıyla bağlandı.✔");
  })
  .catch(() => {
    console.log("Veritabanına bağlanılamadı.❌");
  });

// Schema Oluştur
const logInSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//Koleksiyon Oluştur
const collection = new mongoose.model("users", logInSchema);

module.exports = collection;
