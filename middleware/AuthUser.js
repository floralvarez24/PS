import db from "../config/Database.js";


export const verifyUser = async (req, res, next) => {
    try {
        // Verificar si hay un userId en la sesión
        if (!req.session.userId) {
            return res.status(401).json({ msg: "Por favor inicia sesión en tu cuenta." });
        }

        // Consulta SQL para obtener el usuario por su id desde la base de datos
        const query = `
            SELECT idUsuario, rol
            FROM usuario
            WHERE idUsuario = ?
        `;

        // Ejecutar la consulta con el userId almacenado en la sesión
        const [user] = await db.query(query, {
            replacements: [req.session.userId],
            type: db.QueryTypes.SELECT
        });

        // Verificar si se encontró el usuario en la base de datos
        if (!user) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        // Establecer propiedades adicionales en el objeto req
        req.userId = user.idUsuario;
        req.role = user.rol;

        // Llamar a la siguiente función middleware
        next();
    } catch (error) {
        console.error('Error al verificar usuario:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

export const adminOnly = async (req, res, next) => {
    try {
        // Consulta SQL para obtener el usuario por su uuid desde la base de datos
        const query = `
            SELECT rol
            FROM usuario
            WHERE idUsuario = ?
        `;

        // Ejecutar la consulta con el userId almacenado en la sesión
        const [user] = await db.query(query, {
            replacements: [req.session.userId],
            type: db.QueryTypes.SELECT
        });

        // Verificar si se encontró el usuario en la base de datos
        if (!user) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        // Verificar el rol del usuario
        if (user.rol !== "1") {
            return res.status(403).json({ msg: "Acceso no permitido" });
        }

        // Llamar a la siguiente función middleware
        next();
    } catch (error) {
        console.error('Error al verificar el acceso de administrador:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};