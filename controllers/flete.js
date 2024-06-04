import db from "../config/Database.js";


export const getFletesAdmin = async (req, res) => {
    try {
        // Consulta para obtener todos los fletes y sus documentos asociados
        const fletes = await db.query(`
        SELECT 
        f.idFletero, f.idUsuario_Flete, f.fechaFlete,
        e.razonSocial, e.obra, e.condicionContrato_DOC, e.contactoMail, e.contactoTel, e.rut, e.direccion, e.departamento,
        e.constInscripcionDGI_DOC, e.constInscripcionBPS_DOC, e.certDGI_DOC, e.certDGI_FECHAVENCIMIENTO, e.certDGI_VENCIDO,
        e.certComunBPS_DOC, e.certComunBPS_FECHAVENCIMIENTO, e.certComunBPS_VENCIDO, e.segAccidenteTrab_DOC,
        e.segAccidenteTrab_FECHAVENCIMIENTO, e.segAccidenteTrab_VENCIDO, e.planillaTrab_DOC, e.planillaTrab_FECHAEMISION,
        v.descripcion, v.libretaCirculacion_DOC, v.cedulaMTOP_DOC, v.cedulaMTOP_FECHAVENCIMIENTO, v.cedulaMTOP_VENCIDO,
        v.applus_DOC, v.applus_FECHAVENCIMIENTO, v.applus_VENCIDO, v.aplus_PRORROGA, v.aplus_PRORROGAVENCIDA,
        v.soa_DOC, v.soa_FECHAVENCIMIENTO, v.soa_VENCIDO,
        c.nombreApellido, c.documentoIdentidad_DOC, c.dni, c.carnetSalud_DOC, c.carnetSalud_FECHAVENCIMIENTO,
        c.carnetSalud_VENCIDO, c.licenciaConducir_DOC, c.licenciaConducir_FECHAVENCIMIENTO, c.licenciaConducir_VENCIDO, c.altaBPS
    FROM 
        fletero f
        JOIN documentoEmpresaFlete e ON f.idFletero = e.idFletero_DocEmpresa
        JOIN documentoVehiculo v ON f.idFletero = v.idFlete_Vehiculo
        JOIN documentoConductor c ON v.idVehiculoFlete = c.idDocVehiculoFlete_Conductor;
        `, {
            type: db.QueryTypes.SELECT
        });

        // Devolver los fletes y documentos en la respuesta
        res.status(200).json(fletes);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getFletesByUser = async (req, res) => {
    const { userId } = req;

    try {
        // Define la consulta SQL
        const query = `
            SELECT 
                f.idFletero, f.idUsuario_Flete, f.fechaFlete,
                e.razonSocial, e.obra, e.condicionContrato_DOC, e.contactoMail, e.contactoTel, e.rut, e.direccion, e.departamento,
                e.constInscripcionDGI_DOC, e.constInscripcionBPS_DOC, e.certDGI_DOC, e.certDGI_FECHAVENCIMIENTO, e.certDGI_VENCIDO,
                e.certComunBPS_DOC, e.certComunBPS_FECHAVENCIMIENTO, e.certComunBPS_VENCIDO, e.segAccidenteTrab_DOC,
                e.segAccidenteTrab_FECHAVENCIMIENTO, e.segAccidenteTrab_VENCIDO, e.planillaTrab_DOC, e.planillaTrab_FECHAEMISION,
                v.descripcion, v.libretaCirculacion_DOC, v.cedulaMTOP_DOC, v.cedulaMTOP_FECHAVENCIMIENTO, v.cedulaMTOP_VENCIDO,
                v.applus_DOC, v.applus_FECHAVENCIMIENTO, v.applus_VENCIDO, v.aplus_PRORROGA, v.aplus_PRORROGAVENCIDA,
                v.soa_DOC, v.soa_FECHAVENCIMIENTO, v.soa_VENCIDO,
                c.nombreApellido, c.documentoIdentidad_DOC, c.dni, c.carnetSalud_DOC, c.carnetSalud_FECHAVENCIMIENTO,
                c.carnetSalud_VENCIDO, c.licenciaConducir_DOC, c.licenciaConducir_FECHAVENCIMIENTO, c.licenciaConducir_VENCIDO, c.altaBPS
            FROM 
                fletero f
                JOIN documentoEmpresaFlete e ON f.idFletero = e.idFletero_DocEmpresa
                JOIN documentoVehiculo v ON f.idFletero = v.idFlete_Vehiculo
                JOIN documentoConductor c ON v.idVehiculoFlete = c.idDocVehiculoFlete_Conductor
            WHERE 
                f.idUsuario_Flete = ?;
        `;

        const [results] = await db.query(query, {
            replacements: [userId]
        });

        if (results.length === 0) {
            return res.status(404).json({ msg: 'No se encontraron fletes' });
        }

        res.json(results);
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
                e.segAccidenteTrab_FECHAVENCIMIENTO, e.segAccidenteTrab_VENCIDO, e.planillaTrab_DOC, e.planillaTrab_FECHAEMISION,
                v.descripcion, v.libretaCirculacion_DOC, v.cedulaMTOP_DOC, v.cedulaMTOP_FECHAVENCIMIENTO, v.cedulaMTOP_VENCIDO,
                v.applus_DOC, v.applus_FECHAVENCIMIENTO, v.applus_VENCIDO, v.aplus_PRORROGA, v.aplus_PRORROGAVENCIDA,
                v.soa_DOC, v.soa_FECHAVENCIMIENTO, v.soa_VENCIDO,
                c.nombreApellido, c.documentoIdentidad_DOC, c.dni, c.carnetSalud_DOC, c.carnetSalud_FECHAVENCIMIENTO,
                c.carnetSalud_VENCIDO, c.licenciaConducir_DOC, c.licenciaConducir_FECHAVENCIMIENTO, c.licenciaConducir_VENCIDO, c.altaBPS
            FROM 
                fletero f
                JOIN documentoEmpresaFlete e ON f.idFletero = e.idFletero_DocEmpresa
                JOIN documentoVehiculo v ON f.idFletero = v.idFlete_Vehiculo
                JOIN documentoConductor c ON v.idVehiculoFlete = c.idDocVehiculoFlete_Conductor
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
                e.segAccidenteTrab_FECHAVENCIMIENTO, e.segAccidenteTrab_VENCIDO, e.planillaTrab_DOC, e.planillaTrab_FECHAEMISION,
                v.descripcion, v.libretaCirculacion_DOC, v.cedulaMTOP_DOC, v.cedulaMTOP_FECHAVENCIMIENTO, v.cedulaMTOP_VENCIDO,
                v.applus_DOC, v.applus_FECHAVENCIMIENTO, v.applus_VENCIDO, v.aplus_PRORROGA, v.aplus_PRORROGAVENCIDA,
                v.soa_DOC, v.soa_FECHAVENCIMIENTO, v.soa_VENCIDO,
                c.nombreApellido, c.documentoIdentidad_DOC, c.dni, c.carnetSalud_DOC, c.carnetSalud_FECHAVENCIMIENTO,
                c.carnetSalud_VENCIDO, c.licenciaConducir_DOC, c.licenciaConducir_FECHAVENCIMIENTO, c.licenciaConducir_VENCIDO, c.altaBPS
            FROM 
                fletero f
                JOIN documentoEmpresaFlete e ON f.idFletero = e.idFletero_DocEmpresa
                JOIN documentoVehiculo v ON f.idFletero = v.idFlete_Vehiculo
                JOIN documentoConductor c ON v.idVehiculoFlete = c.idDocVehiculoFlete_Conductor
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
        descripcion, libretaCirculacion_DOC, cedulaMTOP_DOC, cedulaMTOP_FECHAVENCIMIENTO, cedulaMTOP_VENCIDO, 
        applus_DOC, applus_FECHAVENCIMIENTO, applus_VENCIDO, aplus_PRORROGA, aplus_PRORROGAVENCIDA, soa_DOC, 
        soa_FECHAVENCIMIENTO, soa_VENCIDO, nombreApellido, documentoIdentidad_DOC, dni, carnetSalud_DOC, 
        carnetSalud_FECHAVENCIMIENTO, carnetSalud_VENCIDO, licenciaConducir_DOC, licenciaConducir_FECHAVENCIMIENTO, 
        licenciaConducir_VENCIDO, altaBPS
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

            // Crear el documento relacionado con el vehículo
            const [idVehiculo] = await db.query(`
            INSERT INTO documentoVehiculo (
                idFlete_Vehiculo, descripcion, libretaCirculacion_DOC, cedulaMTOP_DOC, cedulaMTOP_FECHAVENCIMIENTO, cedulaMTOP_VENCIDO,
                applus_DOC, applus_FECHAVENCIMIENTO, applus_VENCIDO, aplus_PRORROGA, aplus_PRORROGAVENCIDA, soa_DOC, soa_FECHAVENCIMIENTO, soa_VENCIDO
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, {
            replacements: [
                idFletero, descripcion || null, libretaCirculacion_DOC || null, cedulaMTOP_DOC || null, 
                cedulaMTOP_FECHAVENCIMIENTO || null, cedulaMTOP_VENCIDO || null, applus_DOC || null, 
                applus_FECHAVENCIMIENTO || null, applus_VENCIDO || null, aplus_PRORROGA || null,aplus_PRORROGAVENCIDA || null, soa_DOC || null, soa_FECHAVENCIMIENTO || null, soa_VENCIDO || null
            ],
            transaction: t
        });

            // Crear el documento relacionado con el conductor
            await db.query(`
                INSERT INTO documentoConductor (
                    idDocVehiculoFlete_Conductor, nombreApellido, documentoIdentidad_DOC, dni, carnetSalud_DOC,
                    carnetSalud_FECHAVENCIMIENTO, carnetSalud_VENCIDO, licenciaConducir_DOC, licenciaConducir_FECHAVENCIMIENTO,
                    licenciaConducir_VENCIDO, altaBPS
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, {
                replacements: [
                    idVehiculo, nombreApellido || null, documentoIdentidad_DOC || null, dni || null, carnetSalud_DOC || null, 
                    carnetSalud_FECHAVENCIMIENTO || null, carnetSalud_VENCIDO || null, licenciaConducir_DOC || null, 
                    licenciaConducir_FECHAVENCIMIENTO || null, licenciaConducir_VENCIDO || null, altaBPS || null
                ],
                transaction: t
            });

            res.status(201).json({ msg: "Flete y documentos creados exitosamente" });
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
        segAccidenteTrab_FECHAVENCIMIENTO, segAccidenteTrab_VENCIDO, planillaTrab_DOC, planillaTrab_FECHAEMISION,
        descripcion, libretaCirculacion_DOC, cedulaMTOP_DOC, cedulaMTOP_FECHAVENCIMIENTO, cedulaMTOP_VENCIDO,
        applus_DOC, applus_FECHAVENCIMIENTO, applus_VENCIDO, aplus_PRORROGA, aplus_PRORROGAVENCIDA, soa_DOC,
        soa_FECHAVENCIMIENTO, soa_VENCIDO, nombreApellido, documentoIdentidad_DOC, dni, carnetSalud_DOC,
        carnetSalud_FECHAVENCIMIENTO, carnetSalud_VENCIDO, licenciaConducir_DOC, licenciaConducir_FECHAVENCIMIENTO,
        licenciaConducir_VENCIDO, altaBPS
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

            // Actualizar el documento relacionado con el vehículo
            await db.query(`
                UPDATE documentoVehiculo SET 
                    descripcion = ?, libretaCirculacion_DOC = ?, cedulaMTOP_DOC = ?, cedulaMTOP_FECHAVENCIMIENTO = ?, cedulaMTOP_VENCIDO = ?,
                    applus_DOC = ?, applus_FECHAVENCIMIENTO = ?, applus_VENCIDO = ?, aplus_PRORROGA = ?, aplus_PRORROGAVENCIDA = ?,
                    soa_DOC = ?, soa_FECHAVENCIMIENTO = ?, soa_VENCIDO = ?
                WHERE idFlete_Vehiculo = ?
            `, {
                replacements: [
                    descripcion || null, libretaCirculacion_DOC || null, cedulaMTOP_DOC || null, cedulaMTOP_FECHAVENCIMIENTO || null,
                    cedulaMTOP_VENCIDO || null, applus_DOC || null, applus_FECHAVENCIMIENTO || null, applus_VENCIDO || null,
                    aplus_PRORROGA || null, aplus_PRORROGAVENCIDA || null, soa_DOC || null, soa_FECHAVENCIMIENTO || null,
                    soa_VENCIDO || null, idFletero
                ],
                transaction: t
            });

            // Actualizar el documento relacionado con el conductor
            await db.query(`
                UPDATE documentoConductor SET 
                    nombreApellido = ?, documentoIdentidad_DOC = ?, dni = ?, carnetSalud_DOC = ?, carnetSalud_FECHAVENCIMIENTO = ?, 
                    carnetSalud_VENCIDO = ?, licenciaConducir_DOC = ?, licenciaConducir_FECHAVENCIMIENTO = ?, licenciaConducir_VENCIDO = ?, 
                    altaBPS = ?
                WHERE idDocVehiculoFlete_Conductor = (
                    SELECT idVehiculoFlete FROM documentoVehiculo WHERE idFlete_Vehiculo = ?
                )
            `, {
                replacements: [
                    nombreApellido || null, documentoIdentidad_DOC || null, dni || null, carnetSalud_DOC || null, 
                    carnetSalud_FECHAVENCIMIENTO || null, carnetSalud_VENCIDO || null, licenciaConducir_DOC || null, 
                    licenciaConducir_FECHAVENCIMIENTO || null, licenciaConducir_VENCIDO || null, altaBPS || null, idFletero
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