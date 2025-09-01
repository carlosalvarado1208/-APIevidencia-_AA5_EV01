const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const empleadoSchema = new Schema({
  nombre: {
    type: String,
    required: true, // 🚨 obligatorio
    trim: true
  },
  correo: {
    type: String,
    required: true,
    unique: true, // 🚨 no se puede repetir
    lowercase: true
  },
  celular: {
    type: String,
    required: true
  },
  edad: {
    type: Number,
    required: true,
    min: 18 // 🚨 mínimo 18 años
  }
}, { timestamps: true });

const empleado = mongoose.model("empleado", empleadoSchema);

module.exports = empleado;
