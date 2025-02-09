import app from './app.js';
import { testDBConnection } from './db.js';

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  testDBConnection();
});
