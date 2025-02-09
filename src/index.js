import app from './app.js';
import { testDBConnection } from './db.js';
import { PORT } from './config.js'; // Importa el puerto desde config.js

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  testDBConnection();
});
