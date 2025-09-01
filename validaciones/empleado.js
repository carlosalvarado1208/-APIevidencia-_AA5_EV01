const { body } = require("express-validator");

exports.validarEmpleado = [
  body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
  body("correo").isEmail().withMessage("El correo debe ser válido"),
  body("celular").isLength({ min: 10 }).withMessage("El celular debe tener al menos 10 dígitos"),
  body("edad").isInt({ min: 18 }).withMessage("La edad mínima es 18 años")
];