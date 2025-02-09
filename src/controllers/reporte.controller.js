import { pool } from "../db.js";  // Importamos la conexión a la base de datos

export const getReporteByDocumento = async (req, res) => {
    try {
        const { documento, anio } = req.params;  // Obtenemos los parámetros de la URL

        // Consulta directa en PostgreSQL sin procedimientos almacenados
        const result = await pool.query(`
            SELECT 
                c.id,
                c.nombre,
                c.apellido,
                c.correo,
                c.celular AS telefono,
                c.direccion,
                c.ciudad,
                c.pais,
                c.distrito,
                c.provincia,
                v.id AS numero_registro,
                v.tipo_servicio,
                v.turno,
                v.tipo_sesion,
                v.horario,
                v.estado,
                v.fecha_registro,
                v.monto_pago AS costo, 
                v.medio_pago,
                v.fecha_pago
            FROM clientes c
            JOIN ventas v ON c.id = v.cliente_id 
            WHERE c.id = $1 AND EXTRACT(YEAR FROM v.fecha_registro) = $2
        `, [documento, anio]);

        // Verificar si hay resultados
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron ventas para este cliente en el año indicado' });
        }

        res.json({ cliente: result.rows[0], ventas: result.rows });

    } catch (error) {
        console.error('Error en la consulta:', error);
        return res.status(500).json({ message: 'Ocurrió un error en el servidor' });
    }
};
