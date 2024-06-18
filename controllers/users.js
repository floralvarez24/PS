import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import argon2 from "argon2";


export const getUsers = async (req, res) => {
    try {
        const response = await db.query('SELECT DISTINCT mail, rol, idUsuario FROM usuario');
        const uniqueUsers = new Set();

        response.forEach(user => {
            uniqueUsers.add(user);
        });

        res.status(200).json(Array.from(uniqueUsers).flat()); //elimina los niveles de anidación
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

/*export const getUsersByID =  async(req, res) => {
    const { id } = req.params; // Obtiene el parámetro de ruta "id" desde la solicitud

    try {
        // Ejecuta una consulta SQL para obtener el usuario por su ID
        const response = await db.query('SELECT mail, rol FROM usuario WHERE idUsuario = ?', {
            replacements: [id],
            type: Sequelize.QueryTypes.SELECT
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}*/
export const getUsersByID = async (req, res) => {
    const { id } = req.params;

    try {
        const [user] = await db.query('SELECT mail, rol FROM usuario WHERE idUsuario = ?', {
            replacements: [id],
            type: Sequelize.QueryTypes.SELECT
        });

        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};



export const getUsersByMail = async (req, res) => {
    const { email } = req.params; // Obtiene el parámetro de ruta "email" desde la solicitud

    try {
        // Ejecuta una consulta SQL para obtener el usuario por su correo electrónico (mail)
        const query = `
            SELECT mail, rol
            FROM usuario
            WHERE mail = ?
        `;

        const [response] = await db.query(query, {
            replacements: [email],
            type: db.QueryTypes.SELECT
        });

        if (!response) {
            // Si no se encuentra el usuario, devuelve un mensaje de error
            return res.status(404).json({ msg: `Usuario con correo electrónico ${email} no encontrado` });
        }

        // Devuelve la respuesta con el usuario encontrado
        res.status(200).json(response);
    } catch (error) {
        // Maneja cualquier error que ocurra durante la consulta SQL
        res.status(500).json({ msg: error.message });
    }
};

/*export const createUsers = async(req, res) => {
  const {mail, contraseña, confContraseña, rol} = req.body;
  if(contraseña !== confContraseña) return res.status(400).json({msg: "La contraseña no coinciden"});
  const hashPassword = await argon2.hash(contraseña); 
  try {
    const query = `
    INSERT INTO usuario (mail, contraseña, rol)
    VALUES (?, ?, ?)`;

    await db.query(query, {
    replacements: [mail, hashPassword, rol],
    type: Sequelize.QueryTypes.INSERT
    });
    res.status(201).json({msg: "Usuario registrado"});
  } catch (error) {
    res.status(400).json({msg: error.message});
  }
}*/

export const createUsers = async (req, res) => {
    const { mail, contraseña, confContraseña, rol } = req.body;

    // Validación de la contraseña
    if (contraseña !== confContraseña) {
        return res.status(400).json({ msg: "Las contraseñas no coinciden" });
    }

    const contraseñaRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/; // Al menos 6 caracteres, una mayúscula y un número
    if (!contraseñaRegex.test(contraseña)) {
        return res.status(400).json({ msg: "La contraseña debe tener al menos 6 caracteres, contener al menos una letra mayúscula y un número." });
    }

    try {
        const hashPassword = await argon2.hash(contraseña);

        const query = `
        INSERT INTO usuario (mail, contraseña,confContraseña, rol)
        VALUES (?, ?, ?, ?)`;

        await db.query(query, {
            replacements: [mail, hashPassword, hashPassword, rol],
            type: Sequelize.QueryTypes.INSERT
        });

        res.status(201).json({ msg: "Usuario registrado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const updateUsers = async (req, res) => {
    const { id } = req.params;
    const { mail, contraseña, confContraseña, rol } = req.body;

    try {
        if (contraseña !== confContraseña || contraseña == "" || contraseña == null) {
            return res.status(400).json({ msg: "La contraseña y la confirmación de contraseña no coinciden" });
        }

        if (mail == null ||mail == "" ) {
            return res.status(401).json({ msg: "El mail es un campo obligatorio" });
        }

        if (rol == null || rol == "" || rol < 1 || rol > 2) {
            return res.status(401).json({ msg: "Rol incorrecto" });
        }
        const contraseñaRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/; // Al menos 6 caracteres, una mayúscula y un número
        if (!contraseñaRegex.test(contraseña)) {
            return res.status(400).json({ msg: "La contraseña debe tener al menos 6 caracteres, contener al menos una letra mayúscula y un número." });
        }
        let hashPassword = contraseña;
        if (contraseña && contraseña !== "") {
            hashPassword = await argon2.hash(contraseña);
        }

        const user = await db.query('SELECT * FROM usuario WHERE idUsuario = ?', {
            replacements: [id],
            type: db.QueryTypes.SELECT
        });

        if (!user || user.length === 0) {
            return res.status(404).json({ msg: `Usuario con ID ${id} no encontrado` });
        }

        // Actualizar el usuario usando el método update() de Sequelize
        await db.query('UPDATE usuario SET mail = ?, contraseña = ?, rol = ? WHERE idUsuario = ?', {
            replacements: [mail, hashPassword, rol, id],
            type: db.QueryTypes.UPDATE
        });

        res.status(200).json({ msg: `Usuario con ID ${id} actualizado correctamente` });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const deleteUsers = async (req, res) => {
    const { id } = req.params; // Obtiene el parámetro de ruta "id" desde la solicitud

    try {
        // Verifica si el usuario existe buscando por id
        const queryCheckUser = 
        `   SELECT *
            FROM usuario
            WHERE idUsuario = ? `;

        const [user] = await db.query(queryCheckUser, {
            replacements: [id],
            type: db.QueryTypes.SELECT
        });

        if (!user) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        // Ejecuta una consulta SQL para eliminar el usuario por su ID
        const queryDeleteUser = `
            DELETE  FROM usuario
            WHERE idUsuario = ?
        `;

        await db.query(queryDeleteUser, {
            replacements: [id],
            type: db.QueryTypes.DELETE
        });

        res.status(200).json({ msg: "Usuario eliminado" });
    } catch (error) {
        // Maneja cualquier error que ocurra durante la consulta SQL
        res.status(400).json({ msg: error.message });
    }
};