import db from "../config/Database.js";
import { QueryTypes } from 'sequelize';


// Método para obtener todos los fletes (para rol 1)
export const getFletesAdmin = async (req, res) => {
    try {
        const fletes = await db.query(`
            SELECT 
                f.idFletero, f.idUsuario_Flete, f.fechaFlete,
                e.razonSocial, e.obra, e.condicionContrato_DOC, e.contactoMail, e.contactoTel, e.rut, e.direccion, e.departamento,
                e.constInscripcionDGI_DOC, e.constInscripcionBPS_DOC, e.certDGI_DOC, e.certDGI_FECHAVENCIMIENTO, e.certDGI_VENCIDO,
                e.certComunBPS_DOC, e.certComunBPS_FECHAVENCIMIENTO, e.certComunBPS_VENCIDO, e.segAccidenteTrab_DOC,
                e.segAccidenteTrab_FECHAVENCIMIENTO, e.segAccidenteTrab_VENCIDO, e.planillaTrab_DOC, e.planillaTrab_FECHAEMISION
                
            FROM 
                fletero f
                JOIN documentoEmpresaFlete e ON f.idFletero = e.idFletero_DocEmpresa
        `, {
            type: db.QueryTypes.SELECT
        });

        if (!fletes || fletes.length === 0) {
            return res.status(404).json({ msg: 'No se encontraron fletes.' });
        }

        res.status(200).json(fletes);
    } catch (error) {
        console.error('Error al obtener fletes:', error);
        res.status(500).json({ msg: error.message });
    }
};

// Método para obtener fletes por usuario (para rol 2)
export const getFletesByUser = async (req, res) => {
    const { userId } = req;

    try {
        const query = `
            SELECT 
                f.idFletero, f.idUsuario_Flete, f.fechaFlete,
                e.razonSocial, e.obra, e.condicionContrato_DOC, e.contactoMail, e.contactoTel, e.rut, e.direccion, e.departamento,
                e.constInscripcionDGI_DOC, e.constInscripcionBPS_DOC, e.certDGI_DOC, e.certDGI_FECHAVENCIMIENTO, e.certDGI_VENCIDO,
                e.certComunBPS_DOC, e.certComunBPS_FECHAVENCIMIENTO, e.certComunBPS_VENCIDO, e.segAccidenteTrab_DOC,
                e.segAccidenteTrab_FECHAVENCIMIENTO, e.segAccidenteTrab_VENCIDO, e.planillaTrab_DOC, e.planillaTrab_FECHAEMISION

            FROM 
                fletero f
                JOIN documentoEmpresaFlete e ON f.idFletero = e.idFletero_DocEmpresa
            WHERE 
                f.idUsuario_Flete = ?;
        `;

        const [results] = await db.query(query, {
            replacements: [userId]
        });

        if (!results || results.length === 0) {
            return res.status(404).json({ msg: 'No se encontraron fletes para este usuario.' });
        }

        res.status(200).json(results);
    } catch (error) {
        console.error('Error al obtener fletes por usuario:', error);
        res.status(500).json({ msg: error.message });
    }
};

export const getFleteById = async (req, res) => {
    const { idFletero} = req.params;
    
    try {
        const [results] = await db.query(`
            SELECT 
                f.idFletero, f.idUsuario_Flete, f.fechaFlete,
                e.razonSocial, e.obra, e.condicionContrato_DOC, e.contactoMail, e.contactoTel, e.rut, e.direccion, e.departamento,
                e.constInscripcionDGI_DOC, e.constInscripcionBPS_DOC, e.certDGI_DOC, e.certDGI_FECHAVENCIMIENTO, e.certDGI_VENCIDO,
                e.certComunBPS_DOC, e.certComunBPS_FECHAVENCIMIENTO, e.certComunBPS_VENCIDO, e.segAccidenteTrab_DOC,
                e.segAccidenteTrab_FECHAVENCIMIENTO, e.segAccidenteTrab_VENCIDO, e.planillaTrab_DOC, e.planillaTrab_FECHAEMISION
            FROM 
                fletero f
                JOIN documentoEmpresaFlete e ON f.idFletero = e.idFletero_DocEmpresa
            WHERE 
                 f.idFletero = ?;
        `, {
            replacements: [idFletero]
        });

        if (results.length === 0) {
            return res.status(404).json({ msg: 'Flete no encontrado' });
        }

        res.json(results[0]);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
export const getFleteRazonSocial = async (req, res) => {
    const { razonSocial } = req.params;
    
    try {
        const [results] = await db.query(`
            SELECT 
                f.idFletero, f.idUsuario_Flete, f.fechaFlete,
                e.razonSocial, e.obra, e.condicionContrato_DOC, e.contactoMail, e.contactoTel, e.rut, e.direccion, e.departamento,
                e.constInscripcionDGI_DOC, e.constInscripcionBPS_DOC, e.certDGI_DOC, e.certDGI_FECHAVENCIMIENTO, e.certDGI_VENCIDO,
                e.certComunBPS_DOC, e.certComunBPS_FECHAVENCIMIENTO, e.certComunBPS_VENCIDO, e.segAccidenteTrab_DOC,
                e.segAccidenteTrab_FECHAVENCIMIENTO, e.segAccidenteTrab_VENCIDO, e.planillaTrab_DOC, e.planillaTrab_FECHAEMISION

            FROM 
                fletero f
                JOIN documentoEmpresaFlete e ON f.idFletero = e.idFletero_DocEmpresa
            WHERE 
                 e.razonSocial = ?;
        `, {
            replacements: [razonSocial]
        });

        if (results.length === 0) {
            return res.status(404).json({ msg: 'Flete no encontrado' });
        }

        res.json(results[0]);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getFleteObra = async (req, res) => {
    const { obra } = req.params;
    
    try {
        const [results] = await db.query(`
            SELECT 
                f.idFletero, f.idUsuario_Flete, f.fechaFlete,
                e.razonSocial, e.obra, e.condicionContrato_DOC, e.contactoMail, e.contactoTel, e.rut, e.direccion, e.departamento,
                e.constInscripcionDGI_DOC, e.constInscripcionBPS_DOC, e.certDGI_DOC, e.certDGI_FECHAVENCIMIENTO, e.certDGI_VENCIDO,
                e.certComunBPS_DOC, e.certComunBPS_FECHAVENCIMIENTO, e.certComunBPS_VENCIDO, e.segAccidenteTrab_DOC,
                e.segAccidenteTrab_FECHAVENCIMIENTO, e.segAccidenteTrab_VENCIDO, e.planillaTrab_DOC, e.planillaTrab_FECHAEMISION
               
            FROM 
                fletero f
                JOIN documentoEmpresaFlete e ON f.idFletero = e.idFletero_DocEmpresa
            WHERE 
                 e.obra = ?;
        `, {
            replacements: [obra]
        });

        if (results.length === 0) {
            return res.status(404).json({ msg: 'Flete no encontrado' });
        }

        res.json(results[0]);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createFleteWithDocuments = async (req, res) => {
    const { 
        razonSocial, obra, condicionContrato_DOC, contactoMail, contactoTel, rut, direccion, departamento, 
        constInscripcionDGI_DOC, constInscripcionBPS_DOC, certDGI_DOC, certDGI_FECHAVENCIMIENTO, certDGI_VENCIDO, 
        certComunBPS_DOC, certComunBPS_FECHAVENCIMIENTO, certComunBPS_VENCIDO, segAccidenteTrab_DOC, 
        segAccidenteTrab_FECHAVENCIMIENTO, segAccidenteTrab_VENCIDO, planillaTrab_DOC, planillaTrab_FECHAEMISION,
    } = req.body;
    
    
    const { userId } = req;
    
    try {
        // Iniciar una transacción
        await db.transaction(async (t) => {
            // Crear el flete
            const [idFletero] = await db.query(`
                INSERT INTO fletero (idUsuario_Flete)
                VALUES (?)
            `, {
                replacements: [userId],
                transaction: t
            });

            // Crear el documento relacionado con el flete
            await db.query(`
                INSERT INTO documentoEmpresaFlete (
                    idFletero_DocEmpresa, razonSocial, obra, condicionContrato_DOC, contactoMail, contactoTel, rut, direccion, departamento,
                    constInscripcionDGI_DOC, constInscripcionBPS_DOC, certDGI_DOC, certDGI_FECHAVENCIMIENTO, certDGI_VENCIDO,
                    certComunBPS_DOC, certComunBPS_FECHAVENCIMIENTO, certComunBPS_VENCIDO, segAccidenteTrab_DOC,
                    segAccidenteTrab_FECHAVENCIMIENTO, segAccidenteTrab_VENCIDO, planillaTrab_DOC, planillaTrab_FECHAEMISION
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, {
                replacements: [
                    idFletero, razonSocial || null, obra || null, condicionContrato_DOC || null, contactoMail || null, contactoTel || null, 
                    rut || null, direccion || null, departamento || null, constInscripcionDGI_DOC || null, constInscripcionBPS_DOC || null, 
                    certDGI_DOC || null, certDGI_FECHAVENCIMIENTO || null, certDGI_VENCIDO || null, certComunBPS_DOC || null, 
                    certComunBPS_FECHAVENCIMIENTO || null, certComunBPS_VENCIDO || null, segAccidenteTrab_DOC || null, 
                    segAccidenteTrab_FECHAVENCIMIENTO || null, segAccidenteTrab_VENCIDO || null, planillaTrab_DOC || null, 
                    planillaTrab_FECHAEMISION || null
                ],
                transaction: t
            });
            res.status(201).json({ id: idFletero, msg: "Flete creado exitosamente" });
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const updateFlete = async (req, res) => {
    const { idFletero } = req.params;
    const {
        razonSocial, obra, condicionContrato_DOC, contactoMail, contactoTel, rut, direccion, departamento,
        constInscripcionDGI_DOC, constInscripcionBPS_DOC, certDGI_DOC, certDGI_FECHAVENCIMIENTO, certDGI_VENCIDO,
        certComunBPS_DOC, certComunBPS_FECHAVENCIMIENTO, certComunBPS_VENCIDO, segAccidenteTrab_DOC,
        segAccidenteTrab_FECHAVENCIMIENTO, segAccidenteTrab_VENCIDO, planillaTrab_DOC, planillaTrab_FECHAEMISION
    } = req.body;

    try {
        // Iniciar una transacción
        await db.transaction(async (t) => {
            // Actualizar el documento relacionado con el flete
            await db.query(`
                UPDATE documentoEmpresaFlete SET 
                    razonSocial = ?, obra = ?, condicionContrato_DOC = ?, contactoMail = ?, contactoTel = ?, rut = ?, direccion = ?, departamento = ?,
                    constInscripcionDGI_DOC = ?, constInscripcionBPS_DOC = ?, certDGI_DOC = ?, certDGI_FECHAVENCIMIENTO = ?, certDGI_VENCIDO = ?,
                    certComunBPS_DOC = ?, certComunBPS_FECHAVENCIMIENTO = ?, certComunBPS_VENCIDO = ?, segAccidenteTrab_DOC = ?,
                    segAccidenteTrab_FECHAVENCIMIENTO = ?, segAccidenteTrab_VENCIDO = ?, planillaTrab_DOC = ?, planillaTrab_FECHAEMISION = ?
                WHERE idFletero_DocEmpresa = ?
            `, {
                replacements: [
                    razonSocial || null, obra || null, condicionContrato_DOC || null, contactoMail || null, contactoTel || null,
                    rut || null, direccion || null, departamento || null, constInscripcionDGI_DOC || null, constInscripcionBPS_DOC || null,
                    certDGI_DOC || null, certDGI_FECHAVENCIMIENTO || null, certDGI_VENCIDO || null, certComunBPS_DOC || null,
                    certComunBPS_FECHAVENCIMIENTO || null, certComunBPS_VENCIDO || null, segAccidenteTrab_DOC || null,
                    segAccidenteTrab_FECHAVENCIMIENTO || null, segAccidenteTrab_VENCIDO || null, planillaTrab_DOC || null,
                    planillaTrab_FECHAEMISION || null, idFletero
                ],
                transaction: t
            });

            res.status(200).json({ msg: "Flete y documentos actualizados exitosamente" });
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};



export const deleteFlete = async (req, res) => {
    const { idFletero } = req.params;

    try {
        // Iniciar una transacción
        await db.transaction(async (t) => {
            // Eliminar los documentos del conductor asociados al flete
            await db.query(`
                DELETE FROM documentoConductor
                WHERE idDocVehiculoFlete_Conductor IN (
                    SELECT idVehiculoFlete FROM documentoVehiculo WHERE idFlete_Vehiculo = ?
                )
            `, {
                replacements: [idFletero],
                transaction: t
            });

            // Eliminar los documentos del vehículo asociados al flete
            await db.query(`
                DELETE FROM documentoVehiculo
                WHERE idFlete_Vehiculo = ?
            `, {
                replacements: [idFletero],
                transaction: t
            });

            // Eliminar los documentos de la empresa asociados al flete
            await db.query(`
                DELETE FROM documentoEmpresaFlete
                WHERE idFletero_DocEmpresa = ?
            `, {
                replacements: [idFletero],
                transaction: t
            });

            // Eliminar el flete
            await db.query(`
                DELETE FROM fletero
                WHERE idFletero = ?
            `, {
                replacements: [idFletero],
                transaction: t
            });

            res.status(200).json({ msg: "Flete y documentos eliminados exitosamente" });
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
//metodos para vehiculos
export const addVehicleToFlete = async (req, res) => {
    const { idFletero } = req.params;
    const {
        descripcion,
        libretaCirculacion_DOC,
        cedulaMTOP_DOC,
        cedulaMTOP_FECHAVENCIMIENTO,
        cedulaMTOP_VENCIDO,
        applus_DOC,
        applus_FECHAVENCIMIENTO,
        applus_VENCIDO,
        aplus_PRORROGA,
        aplus_PRORROGAVENCIDA,
        soa_DOC,
        soa_FECHAVENCIMIENTO,
        soa_VENCIDO
    } = req.body;

    try {
        await db.transaction(async (t) => {
            // Verificar si el flete existe
            const fleteExistente = await db.query(`
                SELECT * FROM fletero WHERE idFletero = ? FOR UPDATE
            `, {
                replacements: [idFletero],
                type: QueryTypes.SELECT,
                transaction: t
            });

            if (!fleteExistente || fleteExistente.length === 0) {
                return res.status(404).json({ msg: 'El flete especificado no existe' });
            }

            // Crear el documento relacionado con el vehículo
            const [idVehiculoFlete] = await db.query(`
                INSERT INTO documentoVehiculo (
                    idFlete_Vehiculo, descripcion, libretaCirculacion_DOC, cedulaMTOP_DOC, cedulaMTOP_FECHAVENCIMIENTO, cedulaMTOP_VENCIDO,
                    applus_DOC, applus_FECHAVENCIMIENTO, applus_VENCIDO, aplus_PRORROGA, aplus_PRORROGAVENCIDA, soa_DOC, soa_FECHAVENCIMIENTO, soa_VENCIDO
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, {
                replacements: [
                    idFletero, descripcion || null, libretaCirculacion_DOC || null, cedulaMTOP_DOC || null, 
                    cedulaMTOP_FECHAVENCIMIENTO || null, cedulaMTOP_VENCIDO || null, applus_DOC || null, 
                    applus_FECHAVENCIMIENTO || null, applus_VENCIDO || null, aplus_PRORROGA || null, 
                    aplus_PRORROGAVENCIDA || null, soa_DOC || null, soa_FECHAVENCIMIENTO || null, soa_VENCIDO || null
                ],
                transaction: t
            });

            res.status(201).json({ idVehiculoFlete, msg: 'Vehículo agregado correctamente'});
        });
    } catch (error) {
        console.error('Error al agregar vehículo:', error);
        res.status(500).json({ msg: 'Error al agregar el vehículo', error });
    }
};



export const getVehiculosByFlete = async (req, res) => {
    const { idFlete_Vehiculo } = req.params;
    
    try {
        const [results] = await db.query(`
            SELECT 
                v.idVehiculoFlete, v.descripcion, v.libretaCirculacion_DOC, 
                v.cedulaMTOP_DOC, v.cedulaMTOP_FECHAVENCIMIENTO, v.cedulaMTOP_VENCIDO,
                v.applus_DOC, v.applus_FECHAVENCIMIENTO, v.applus_VENCIDO, v.aplus_PRORROGA, 
                v.aplus_PRORROGAVENCIDA, v.soa_DOC, v.soa_FECHAVENCIMIENTO, v.soa_VENCIDO
            FROM 
                documentovehiculo v
            WHERE 
                v.idFlete_Vehiculo = ?;
        `, {
            replacements: [idFlete_Vehiculo]
        });

        if (results.length === 0) {
            return res.status(404).json({ msg: 'No se encontraron vehículos para este flete' });
        }

        res.json(results);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getVehiculoById = async (req, res) => {
    const { idVehiculoFlete } = req.params;

    try {
        const [results] = await db.query(`
            SELECT 
                v.idVehiculoFlete, v.descripcion, v.libretaCirculacion_DOC, 
                v.cedulaMTOP_DOC, v.cedulaMTOP_FECHAVENCIMIENTO, v.cedulaMTOP_VENCIDO,
                v.applus_DOC, v.applus_FECHAVENCIMIENTO, v.applus_VENCIDO, v.aplus_PRORROGA, 
                v.aplus_PRORROGAVENCIDA, v.soa_DOC, v.soa_FECHAVENCIMIENTO, v.soa_VENCIDO
            FROM 
                documentovehiculo v
            WHERE 
                v.idVehiculoFlete = ?;
        `, {
            replacements: [idVehiculoFlete]
        });

        if (results.length === 0) {
            return res.status(404).json({ msg: 'No se encontró el vehículo especificado' });
        }

        res.json(results[0]); // Devuelve solo el primer resultado (debería ser único por el ID)
    } catch (error) {
        console.error('Error al obtener vehículo por ID:', error);
        res.status(500).json({ msg: 'Error al obtener el vehículo por ID', error });
    }
};


export const updateVehiculoById = async (req, res) => {
    const { idVehiculoFlete } = req.params;
    const {
        descripcion,
        libretaCirculacion_DOC,
        cedulaMTOP_DOC,
        cedulaMTOP_FECHAVENCIMIENTO,
        applus_DOC,
        applus_FECHAVENCIMIENTO,
        aplus_PRORROGA,
        soa_DOC,
        soa_FECHAVENCIMIENTO
    } = req.body;

    try {
        // Iniciar una transacción
        await db.transaction(async (t) => {
            // Actualizar el documento del vehículo
            await db.query(`
                UPDATE documentoVehiculo SET 
                    descripcion = ?, 
                    libretaCirculacion_DOC = ?, 
                    cedulaMTOP_DOC = ?, 
                    cedulaMTOP_FECHAVENCIMIENTO = ?, 
                    applus_DOC = ?, 
                    applus_FECHAVENCIMIENTO = ?, 
                    aplus_PRORROGA = ?, 
                    soa_DOC = ?, 
                    soa_FECHAVENCIMIENTO = ?
                WHERE idVehiculoFlete = ?
            `, {
                replacements: [
                    descripcion || null,
                    libretaCirculacion_DOC || null,
                    cedulaMTOP_DOC || null,
                    cedulaMTOP_FECHAVENCIMIENTO || null,
                    applus_DOC || null,
                    applus_FECHAVENCIMIENTO || null,
                    aplus_PRORROGA || null,
                    soa_DOC || null,
                    soa_FECHAVENCIMIENTO || null,
                    idVehiculoFlete
                ],
                transaction: t
            });

            res.status(200).json({ msg: "Vehículo actualizado exitosamente" });
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


export const deleteVehiculo = async (req, res) => {
    const { idVehiculoFlete } = req.params; // Obtener el id del vehículo a eliminar

    let transaction; // Variable para la transacción

    try {
        // Iniciar una transacción
        transaction = await db.transaction();

        // Verificar si el vehículo existe antes de eliminarlo
        const vehiculo = await db.query(
            `SELECT * FROM documentoVehiculo WHERE idVehiculoFlete = ? FOR UPDATE`,
            {
                replacements: [idVehiculoFlete],
                transaction,
                type: QueryTypes.SELECT,
            }
        );

        if (vehiculo.length === 0) {
            throw new Error("No se encontró el vehículo o ya fue eliminado");
        }
             // Eliminar los documentos del conductor asociados al flete
        await db.query(`
         DELETE FROM documentoConductor
            WHERE idDocVehiculoFlete_Conductor IN (
            SELECT idVehiculoFlete FROM documentoVehiculo WHERE idFlete_Vehiculo = ?
        )
        `, {
         replacements: [idVehiculoFlete],
         transaction,
        });

        // Eliminar todos los conductores asociados al vehículo
        await db.query(
            `DELETE FROM documentoConductor WHERE idDocVehiculoFlete_Conductor = ?`,
            {
                replacements: [idVehiculoFlete],
                transaction,
            }
        );
        // Realizar la eliminación del vehículo
        await db.query(
            `DELETE FROM documentoVehiculo WHERE idVehiculoFlete = ?`,
            {
                replacements: [idVehiculoFlete],
                transaction,
            }
        );

        // Confirmar la transacción
        await transaction.commit();

        // Responder con éxito
        res.status(200).json({ msg: "Vehículo eliminado exitosamente" });

    } catch (error) {
        // Revertir la transacción en caso de error
        console.error('Error al eliminar vehículo:', error);
        if (transaction) {
            await transaction.rollback();
        }

        // Manejar el error
        res.status(500).json({ msg: error.message });
    }
};

//metodos para conductores
export const addConductorToVehiculo = async (req, res) => {
    const { idVehiculoFlete } = req.params;
    const {
       nombreApellido,
       documentoIdentidad_DOC,
       dni,
       carnetSalud_DOC,
        carnetSalud_FECHAVENCIMIENTO,
        licenciaConducir_DOC,
        licenciaConducir_FECHAVENCIMIENTO,
        altaBPS

    } = req.body;

    try {
        await db.transaction(async (t) => {
            // Verificar si el vehiculo existe
            const vehiculoExistente = await db.query(`
                SELECT * FROM documentoVehiculo WHERE idVehiculoFlete = ? FOR UPDATE
            `, {
                replacements: [idVehiculoFlete],
                type: QueryTypes.SELECT,
                transaction: t
            });

            if (!vehiculoExistente || vehiculoExistente.length === 0) {
                return res.status(404).json({ msg: 'El vehiculo especificado no existe' });
            }

            // Crear el documento relacionado con el conductor
            await db.query(`
                INSERT INTO documentoconductor (
                    idDocVehiculoFlete_Conductor, nombreApellido, documentoIdentidad_DOC, dni, carnetSalud_DOC, carnetSalud_FECHAVENCIMIENTO, licenciaConducir_DOC, licenciaConducir_FECHAVENCIMIENTO, altaBPS
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, {
                replacements: [
                    idVehiculoFlete, nombreApellido || null, documentoIdentidad_DOC || null, dni || null, carnetSalud_DOC || null, carnetSalud_FECHAVENCIMIENTO || null, licenciaConducir_DOC || null, licenciaConducir_FECHAVENCIMIENTO || null, altaBPS || null
                ],
                transaction: t
            });

            res.status(201).json({ msg: 'Conductor agregado correctamente' });
        });
    } catch (error) {
        console.error('Error al agregar conductor:', error);
        res.status(500).json({ msg: 'Error al agregar el conductor', error });
    }
};

export const getConductorByVehiculo = async (req, res) => {
    const { idDocVehiculoFlete_Conductor } = req.params;
    
    try {
        const [results] = await db.query(`
            SELECT 
                c.idDocConductorFlete,
                c.idDocVehiculoFlete_Conductor, c.nombreApellido, c.documentoIdentidad_DOC, c.dni, c.carnetSalud_DOC, c.carnetSalud_FECHAVENCIMIENTO, c.licenciaConducir_DOC, c.licenciaConducir_FECHAVENCIMIENTO, c.altaBPS
            FROM 
                documentoconductor c
            WHERE 
                c.idDocVehiculoFlete_Conductor = ?;
        `, {
            replacements: [idDocVehiculoFlete_Conductor]
        });

        if (results.length === 0) {
            return res.status(404).json({ msg: 'No se encontraron conductores para este vehiculo' });
        }

        res.json(results);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getConductorById = async (req, res) => {
    const { idDocConductorFlete } = req.params;

    try {
        const [results] = await db.query(`
            SELECT 
                c.idDocConductorFlete, c.nombreApellido, c.documentoIdentidad_DOC, c.dni, c.carnetSalud_DOC, c.carnetSalud_FECHAVENCIMIENTO, c.licenciaConducir_DOC, c.licenciaConducir_FECHAVENCIMIENTO, c.altaBPS
            FROM 
                documentoconductor c
            WHERE 
                c.idDocConductorFlete = ?;
        `, {
            replacements: [idDocConductorFlete]
        });

        if (results.length === 0) {
            return res.status(404).json({ msg: 'No se encontró el conductor especificado' });
        }

        res.json(results[0]); // Devuelve solo el primer resultado (debería ser único por el ID)
    } catch (error) {
        console.error('Error al obtener conductor por ID:', error);
        res.status(500).json({ msg: 'Error al obtener el conductor por ID', error });
    }
};
export const updateConductorById = async (req, res) => {
    const { idDocConductorFlete } = req.params;
    const {
        nombreApellido,
        documentoIdentidad_DOC,
        dni,
        carnetSalud_DOC,
        carnetSalud_FECHAVENCIMIENTO,
        licenciaConducir_DOC,
        licenciaConducir_FECHAVENCIMIENTO,
        altaBPS
    } = req.body;

    try {
        // Iniciar una transacción
        await db.transaction(async (t) => {
            // Actualizar el documento del conductor
            await db.query(`
                UPDATE documentoconductor SET 
                    nombreApellido = ?, 
                    documentoIdentidad_DOC = ?, 
                    dni = ?, 
                    carnetSalud_DOC = ?, 
                    carnetSalud_FECHAVENCIMIENTO = ?, 
                    licenciaConducir_DOC = ?, 
                    licenciaConducir_FECHAVENCIMIENTO = ?, 
                    altaBPS = ?
                WHERE idDocConductorFlete = ?
            `, {
                replacements: [
                    nombreApellido || null,
                    documentoIdentidad_DOC || null,
                    dni || null,
                    carnetSalud_DOC || null,
                    carnetSalud_FECHAVENCIMIENTO || null,
                    licenciaConducir_DOC || null,
                    licenciaConducir_FECHAVENCIMIENTO || null,
                    altaBPS || null,
                    idDocConductorFlete
                ],
                transaction: t
            });

            res.status(200).json({ msg: "Conductor actualizado exitosamente" });
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
/*export const deleteConductor = async (req, res) => {
    const { idDocConductorFlete } = req.params; // Obtener el id del vehículo a eliminar

    let transaction; // Variable para la transacción

    try {
        // Iniciar una transacción
        transaction = await db.transaction();

        // Verificar si el conductor existe antes de eliminarlo
        const vehiculo = await db.query(
            `SELECT * FROM documentoconductor WHERE idDocConductorFlete = ? FOR UPDATE`,
            {
                replacements: [idDocConductorFlete],
                transaction,
                type: QueryTypes.SELECT,
            }
        );

        if (vehiculo.length === 0) {
            throw new Error("No se encontró el conductor o ya fue eliminado");
        }

        // Realizar la eliminación del conductor
        await db.query(
            `DELETE FROM documentoconductor WHERE idDocConductorFlete = ?`,
            {
                replacements: [idDocConductorFlete],
                transaction,
            }
        );

        // Confirmar la transacción
        await transaction.commit();

        // Responder con éxito
        res.status(200).json({ msg: "Conductor eliminado exitosamente" });

    } catch (error) {
        // Revertir la transacción en caso de error
        console.error('Error al eliminar conductor:', error);
        if (transaction) {
            await transaction.rollback();
        }

        // Manejar el error
        res.status(500).json({ msg: error.message });
    }
};*/


export const deleteConductor = async (req, res) => {
    const { idDocConductorFlete } = req.params;

    let transaction;

    try {
        transaction = await db.transaction();

        const conductor = await db.query(
            `SELECT * FROM documentoconductor WHERE idDocConductorFlete = ? FOR UPDATE`,
            {
                replacements: [idDocConductorFlete],
                transaction,
                type: QueryTypes.SELECT,
            }
        );

        if (conductor.length === 0) {
            throw new Error("No se encontró el conductor o ya fue eliminado");
        }

        await db.query(
            `DELETE FROM documentoconductor WHERE idDocConductorFlete = ?`,
            {
                replacements: [idDocConductorFlete],
                transaction,
            }
        );

        await transaction.commit();

        res.status(200).json({ msg: "Conductor eliminado exitosamente" });
    } catch (error) {
        console.error('Error al eliminar conductor:', error);
        if (transaction) {
            await transaction.rollback();
        }
        res.status(500).json({ msg: error.message });
    }
};



