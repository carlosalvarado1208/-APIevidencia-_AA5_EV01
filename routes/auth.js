const express = require("express");
const router = express.Router();
const Usuario = require("../models/usuario");
const bcrypt = require("bcrypt");

// 📥 Ruta para registrar usuario
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // Validación básica
  if (!username || !password) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ username });
    if (usuarioExistente) {
      return res.status(409).json({ error: "El usuario ya está registrado" });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Guardar nuevo usuario
    const nuevoUsuario = new Usuario({ username, password: hashedPassword });
    await nuevoUsuario.save();

    res.status(201).json({
      mensaje: "✅ Usuario registrado correctamente",
      datos: { username }
    });
  } catch (err) {
    res.status(500).json({ error: "❌ Error al registrar usuario", detalles: err.message });
  }
});

module.exports = router;