const empleado = require("../models/empleado");

// 🔍 Consulta de todos los empleados
const index = (req, res, next) => {
  empleado.find()
    .then(data => {
      res.json({ empleados: data });
    })
    .catch(error => {
      res.status(500).json({ message: "Ocurrió un error al consultar empleados", error });
    });
};

// 🔍 Consulta de empleado por ID
const show = (req, res) => {
  const id = req.params.id;
  empleado.findById(id)
    .then(data => {
      if (!data) return res.status(404).json({ message: "Empleado no encontrado" });
      res.json(data);
    })
    .catch(err => res.status(500).json({ error: err.message }));
};


// 📝 Guardar un nuevo empleado
const guardar = (req, res, next) => {
  const nuevoEmpleado = new empleado({
    nombre: req.body.nombre,
    correo: req.body.correo,
    celular: req.body.celular,
    edad: req.body.edad,
  });

  nuevoEmpleado.save()
    .then(() => {
      res.status(201).json({ message: "Empleado registrado correctamente" });
    })
    .catch(error => {
      res.status(500).json({ message: "Ocurrió un error al registrar el empleado", error });
    });
};

// Actualizar empleado
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const empleadoActualizado = await empleado.findByIdAndUpdate(id, data, { new: true });

    if (!empleadoActualizado) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    res.status(200).json({
      message: "Empleado actualizado correctamente",
      empleado: empleadoActualizado
    });
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar", error: error.message });
  }
};


// Eliminar un empleado por ID
const deleteEmpleado = async (req, res) => {
  try {
    const { id } = req.params;

    const empleadoEliminado = await empleado.findByIdAndDelete(id);

    if (!empleadoEliminado) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    res.json({ message: "Empleado eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el empleado", error });
  }
};


module.exports = {
  index,
  show,
  guardar,
  update,
  deleteEmpleado
};