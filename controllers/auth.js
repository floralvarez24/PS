import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import argon2 from "argon2";

// Función para autenticar el usuario
export const login = (req, res) => {
    const { mail, contraseña } = req.body;

    // Aquí puedes usar los valores de `mail` y `contraseña` para autenticar al usuario
    // Por ejemplo, realizando una consulta SQL para buscar el usuario en la base de datos
    // y verificar la contraseña hash almacenada en la base de datos con la contraseña proporcionada

    // Ejemplo de consulta SQL:
    const query = `
        SELECT idUsuario, mail, contraseña, rol
        FROM usuario
        WHERE mail = ?
    `;
    
    db.query(query, {
        replacements: [mail],
        type: db.QueryTypes.SELECT
    })
    .then(([user]) => {
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        // Verificar la contraseña utilizando argon2
        return argon2.verify(user.contraseña, contraseña)
            .then((match) => {
                if (!match) {
                    return res.status(400).json({ msg: 'Contraseña incorrecta' });
                }

                // Si la autenticación es exitosa, puedes establecer la sesión del usuario, etc.
                req.session.userId = user.idUsuario;

                // Devolver los datos del usuario como respuesta
                const { idUsuario, mail, rol } = user;
                res.status(200).json({ idUsuario, mail, rol });
            });
    })
    .catch((error) => {
        console.error('Error durante la autenticación:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    });
};

export const me = async (req, res) => {
    try {
        // Verificar si hay un userId en la sesión
        if (!req.session.userId) {
            return res.status(401).json({ msg: "Por favor inicia sesión en tu cuenta" });
        }

        // Consulta SQL para obtener el usuario por su idUsuario desde la base de datos
        const query = `
            SELECT idUsuario, mail, rol
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

        // Devolver el usuario como respuesta
        res.status(200).json(user);
    } catch (error) {
        // Manejar cualquier error durante la consulta SQL
        res.status(500).json({ msg: error.message });
    }
};

export const logOut = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(400).json({ msg: "No se pudo cerrar sesión" });
        res.status(200).json({ msg: "Has cerrado sesión correctamente" });
    });
};