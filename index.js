const express = require('express');
const { Pool } = require('pg');
const cors = require('cors'); // Importa cors
require('dotenv').config();

const app = express();

app.use(cors({
  origin: 'https://p3-e7kwcsq8t-miguels-projects-7c70e0af.vercel.app' // Cambia esto por la URL exacta de tu aplicación en Vercel
}));

app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Intento de conexión para verificar que la base de datos esté disponible
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error conectando a la base de datos:', err.stack);
  }
  console.log('Conexión exitosa a la base de datos');
  release(); // Libera el cliente después de la verificación
});

app.get('/productos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM producto');
    res.json(result.rows);
  } catch (err) {
    console.error('Error en la consulta:', err.stack); // Muestra el error en caso de fallo
    res.status(500).send('Error en el servidor');
  }
});

app.get('/usuario', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuario');
    res.json(result.rows);
  } catch (err) {
    console.error('Error en la consulta:', err.stack); // Muestra el error en caso de fallo
    res.status(500).send('Error en el servidor');
  }
});

app.post('/login', async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
      const query = 'SELECT * FROM usuario WHERE correo = $1 AND contraseña = $2';
      const values = [correo, contraseña];
      const result = await pool.query(query, values);

      if (result.rows.length > 0) {
          res.status(200).json({ mensaje: 'Inicio de sesión exitoso' });
      } else {
          res.status(401).json({ mensaje: 'Credenciales incorrectas' });
      }
  } catch (err) {
      console.error('Error en la consulta de login:', err.stack);
      res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Servidor ejecutándose en el puerto ${PORT}`));
