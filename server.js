const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const authRoute = require("./routes/auth");


// 🔐 Credenciales y configuración
const usuario = "base1";
const pwd = "Ana1208";
const dbname = "base1";

// 📦 Importar rutas
const empleadoRoute = require("./routes/empleado");


// 🌐 Conexión a MongoDB Atlas
mongoose.connect(`mongodb+srv://${usuario}:${pwd}@cluster0.defr9zn.mongodb.net/${dbname}?retryWrites=true&w=majority`)
  .then(() => console.log("✅ Conexión exitosa a MongoDB Atlas"))
  .catch((err) => console.error("❌ Error al conectar a MongoDB:", err));

// 🚀 Configuración del servidor Express
const app = express();
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 📁 Rutas
app.use("/empleado", empleadoRoute);
app.use("/auth", authRoute);

// 🏠 Ruta raíz para evitar el error "Cannot GET /"
app.get("/", (req, res) => {
  res.send("🚀 Bienvenido a la API de empleados");
});

// 🟢 Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🟢 Servidor corriendo en el puerto " + PORT);
});