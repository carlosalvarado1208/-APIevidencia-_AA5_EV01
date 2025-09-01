const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "El nombre de usuario es obligatorio"],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"]
  }
});

module.exports = mongoose.model("Usuario", usuarioSchema);