import db from "../config/Database.js";

export const getFletes = async (req, res) => {
    
}

export const getFleteId = async (req, res) => {
    
}

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
    
}

export const deleteFlete = (req, res) => {
    
}