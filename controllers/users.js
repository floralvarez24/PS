import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import argon2 from "argon2";

export const getUsers = async(req, res) => {
    try {
        const response = await db.query('SELECT * FROM usuario');
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getUsersByID =  async(req, res) => {
    const { id } = req.params; // Obtiene el parámetro de ruta "id" desde la solicitud

    try {
        // Ejecuta una consulta SQL para obtener el usuario por su ID
        const [usuario] = await db.query('SELECT * FROM usuario WHERE idUsuario = ?', {
            replacements: [id],
            type: Sequelize.QueryTypes.SELECT
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createUsers = async(req, res) => {
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
}

export const updateUsers = (req, res) => {
    
}

export const deleteUsers = (req, res) => {
    
}