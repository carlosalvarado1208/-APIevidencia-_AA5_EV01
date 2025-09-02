const express = require("express");
const router = express.Router();
const { validarEmpleado } = require("../validaciones/empleado");
const { validationResult } = require("express-validator");
const empleadoController = require("../controllers/empleadoController");

// Middleware para manejar errores de validación
const manejarValidaciones = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  next();
};

// Rutas
router.get("/show/:id", empleadoController.show);
router.get("/", empleadoController.index);
router.post("/guardar", validarEmpleado, manejarValidaciones, empleadoController.guardar);
router.put("/update/:id", empleadoController.update);
router.delete("/:id", empleadoController.deleteEmpleado);
module.exports = router;