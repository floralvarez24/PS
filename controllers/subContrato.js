import db from "../config/Database.js";

export const getSubContratoAdmin = async (req, res) => {
    try {
        // Consulta para obtener todos los subcontratos y sus documentos asociados
        const subContratos = await db.query(`
            SELECT 
                s.idSubContratos, s.idUsuario_SubContrato, s.fechaSubContrato,
                e.razonSocial, e.obra, e.contactoMail, e.contactoTel, e.rut, e.direccion, e.departamento,
                e.constInscripDGI_DOC, e.constInscripBPS_DOC, e.certificadoDGI_DOC, e.certificadoDGI_FECHAVENCIMIENTO, e.certificadoDGI_VENCIDO,
                e.certComunBPS_DOC, e.certComunBPS_FECHAVENCIMIENTO, e.certComunBPS_VENCIDO, e.seguroAcidenteTrab_DOC,
                e.seguroAcidenteTrab_FECHAVENCIMIENTO, e.seguroAcidenteTrab_VENCIDO, e.planillaTrabado_DOC, e.planillaTrabado_FECHAEMISION,
                e.tecnicoPrevencionista_NomYApe, e.tecnicoPrevencionista_Titulo, e.tecnicoPrevencionista_Matricula,
                v.libretaCirculacion, v.cedulaMTOP_DOC, v.cedulaMTOP_FECHAVENCIMIENTO, v.cedulaMTOP_VENCIDO,
                v.applus_DOC, v.applus_FECHAVENCIMIENTO, v.applus_VENCIDO, v.aplus_PRORROGA, v.aplus_PRORROGAVENCIDA,
                v.soa_DOC, v.soa_FECHAVENCIMIENTO, v.soa_VENCIDO, v.planillaMantenimiento_DOC,
                p.esChofer, p.nomYapell, p.docIdentidad_DOC, p.dni, p.carnetSalud_DOC, p.carnetSalud_FECHAVENCIMIENTO,
                p.carnetSalud_VENCIDO, p.carnetPsicotecnico_DOC, p.induccionSST_DOC, p.licenciaConducir_DOC,
                p.licenciaConducir_FECHAVENCIMIENTO, p.licenciaConducir_VENCIDO, p.altaBPS
            FROM 
                subContratos s
                JOIN docEmpresaSubContrato e ON s.idSubContratos = e.idSubContrato_DocEmprSubContrato
                JOIN vehiculoSubContrato v ON s.idSubContratos = v.idSubContrato_Vehiculo
                JOIN personalSubContrato p ON s.idSubContratos = p.idSubContrato_Personal;
        `, {
            type: db.QueryTypes.SELECT
        });

        // Devolver los subcontratos y documentos en la respuesta
        res.status(200).json(subContratos);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getSubContratoByUser = async (req, res) => {
    const { userId } = req; // Obtener el ID del usuario desde el middleware de autenticación

    try {
        // Consulta para obtener el subcontrato del usuario actual
        const subContrato = await db.query(`
            SELECT 
                s.idSubContratos, s.fechaSubContrato,
                e.razonSocial, e.obra, e.contactoMail, e.contactoTel, e.rut, e.direccion, e.departamento,
                e.constInscripDGI_DOC, e.constInscripBPS_DOC, e.certificadoDGI_DOC, e.certificadoDGI_FECHAVENCIMIENTO, e.certificadoDGI_VENCIDO,
                e.certComunBPS_DOC, e.certComunBPS_FECHAVENCIMIENTO, e.certComunBPS_VENCIDO, e.seguroAcidenteTrab_DOC,
                e.seguroAcidenteTrab_FECHAVENCIMIENTO, e.seguroAcidenteTrab_VENCIDO, e.planillaTrabado_DOC, e.planillaTrabado_FECHAEMISION,
                e.tecnicoPrevencionista_NomYApe, e.tecnicoPrevencionista_Titulo, e.tecnicoPrevencionista_Matricula,
                v.libretaCirculacion, v.cedulaMTOP_DOC, v.cedulaMTOP_FECHAVENCIMIENTO, v.cedulaMTOP_VENCIDO,
                v.applus_DOC, v.applus_FECHAVENCIMIENTO, v.applus_VENCIDO, v.aplus_PRORROGA, v.aplus_PRORROGAVENCIDA,
                v.soa_DOC, v.soa_FECHAVENCIMIENTO, v.soa_VENCIDO, v.planillaMantenimiento_DOC,
                p.esChofer, p.nomYapell, p.docIdentidad_DOC, p.dni, p.carnetSalud_DOC, p.carnetSalud_FECHAVENCIMIENTO,
                p.carnetSalud_VENCIDO, p.carnetPsicotecnico_DOC, p.induccionSST_DOC, p.licenciaConducir_DOC,
                p.licenciaConducir_FECHAVENCIMIENTO, p.licenciaConducir_VENCIDO, p.altaBPS
            FROM 
                subContratos s
                JOIN docEmpresaSubContrato e ON s.idSubContratos = e.idSubContrato_DocEmprSubContrato
                JOIN vehiculoSubContrato v ON s.idSubContratos = v.idSubContrato_Vehiculo
                JOIN personalSubContrato p ON s.idSubContratos = p.idSubContrato_Personal
            WHERE 
                s.idUsuario_SubContrato = ?; 
        `, {
            replacements: [userId],
            type: db.QueryTypes.SELECT
        });

        if (!subContrato || subContrato.length === 0) {
            return res.status(404).json({ msg: 'Aún no tiene subcontratos' });
        }

        // Devolver el subcontrato en la respuesta
        res.status(200).json(subContrato);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
export const getSubContratoRazonSocial = async (req, res) => {
    const { razonSocial } = req.params;

    try {
        // Consulta para obtener los subcontratos filtrados por la razón social
        const subContratos = await db.query(`
            SELECT 
                s.idSubContratos, s.fechaSubContrato,
                e.razonSocial, e.obra, e.contactoMail, e.contactoTel, e.rut, e.direccion, e.departamento,
                e.constInscripDGI_DOC, e.constInscripBPS_DOC, e.certificadoDGI_DOC, e.certificadoDGI_FECHAVENCIMIENTO, e.certificadoDGI_VENCIDO,
                e.certComunBPS_DOC, e.certComunBPS_FECHAVENCIMIENTO, e.certComunBPS_VENCIDO, e.seguroAcidenteTrab_DOC,
                e.seguroAcidenteTrab_FECHAVENCIMIENTO, e.seguroAcidenteTrab_VENCIDO, e.planillaTrabado_DOC, e.planillaTrabado_FECHAEMISION,
                e.tecnicoPrevencionista_NomYApe, e.tecnicoPrevencionista_Titulo, e.tecnicoPrevencionista_Matricula,
                v.libretaCirculacion, v.cedulaMTOP_DOC, v.cedulaMTOP_FECHAVENCIMIENTO, v.cedulaMTOP_VENCIDO,
                v.applus_DOC, v.applus_FECHAVENCIMIENTO, v.applus_VENCIDO, v.aplus_PRORROGA, v.aplus_PRORROGAVENCIDA,
                v.soa_DOC, v.soa_FECHAVENCIMIENTO, v.soa_VENCIDO, v.planillaMantenimiento_DOC,
                p.esChofer, p.nomYapell, p.docIdentidad_DOC, p.dni, p.carnetSalud_DOC, p.carnetSalud_FECHAVENCIMIENTO,
                p.carnetSalud_VENCIDO, p.carnetPsicotecnico_DOC, p.induccionSST_DOC, p.licenciaConducir_DOC,
                p.licenciaConducir_FECHAVENCIMIENTO, p.licenciaConducir_VENCIDO, p.altaBPS
            FROM 
                subContratos s
                JOIN docEmpresaSubContrato e ON s.idSubContratos = e.idSubContrato_DocEmprSubContrato
                JOIN vehiculoSubContrato v ON s.idSubContratos = v.idSubContrato_Vehiculo
                JOIN personalSubContrato p ON s.idSubContratos = p.idSubContrato_Personal
            WHERE 
                e.razonSocial = ?; 
        `, {
            replacements: [razonSocial],
            type: db.QueryTypes.SELECT
        });

        // Verificar si no se encontraron subcontratos
        if (!subContratos || subContratos.length === 0) {
            return res.status(404).json({ msg: 'Aún no tiene subcontratos asociados' });
        }

        // Devolver los subcontratos en la respuesta
        res.status(200).json(subContratos);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getSubContratoObra = async (req, res) => {
    const { obra } = req.params;

    try {
        // Consulta para obtener los subcontratos filtrados por la razón social
        const subContratos = await db.query(`
            SELECT 
                s.idSubContratos, s.fechaSubContrato,
                e.razonSocial, e.obra, e.contactoMail, e.contactoTel, e.rut, e.direccion, e.departamento,
                e.constInscripDGI_DOC, e.constInscripBPS_DOC, e.certificadoDGI_DOC, e.certificadoDGI_FECHAVENCIMIENTO, e.certificadoDGI_VENCIDO,
                e.certComunBPS_DOC, e.certComunBPS_FECHAVENCIMIENTO, e.certComunBPS_VENCIDO, e.seguroAcidenteTrab_DOC,
                e.seguroAcidenteTrab_FECHAVENCIMIENTO, e.seguroAcidenteTrab_VENCIDO, e.planillaTrabado_DOC, e.planillaTrabado_FECHAEMISION,
                e.tecnicoPrevencionista_NomYApe, e.tecnicoPrevencionista_Titulo, e.tecnicoPrevencionista_Matricula,
                v.libretaCirculacion, v.cedulaMTOP_DOC, v.cedulaMTOP_FECHAVENCIMIENTO, v.cedulaMTOP_VENCIDO,
                v.applus_DOC, v.applus_FECHAVENCIMIENTO, v.applus_VENCIDO, v.aplus_PRORROGA, v.aplus_PRORROGAVENCIDA,
                v.soa_DOC, v.soa_FECHAVENCIMIENTO, v.soa_VENCIDO, v.planillaMantenimiento_DOC,
                p.esChofer, p.nomYapell, p.docIdentidad_DOC, p.dni, p.carnetSalud_DOC, p.carnetSalud_FECHAVENCIMIENTO,
                p.carnetSalud_VENCIDO, p.carnetPsicotecnico_DOC, p.induccionSST_DOC, p.licenciaConducir_DOC,
                p.licenciaConducir_FECHAVENCIMIENTO, p.licenciaConducir_VENCIDO, p.altaBPS
            FROM 
                subContratos s
                JOIN docEmpresaSubContrato e ON s.idSubContratos = e.idSubContrato_DocEmprSubContrato
                JOIN vehiculoSubContrato v ON s.idSubContratos = v.idSubContrato_Vehiculo
                JOIN personalSubContrato p ON s.idSubContratos = p.idSubContrato_Personal
            WHERE 
                e.obra = ?; 
        `, {
            replacements: [obra],
            type: db.QueryTypes.SELECT
        });

        // Verificar si no se encontraron subcontratos
        if (!subContratos || subContratos.length === 0) {
            return res.status(404).json({ msg: 'Aún no tiene subcontratos asociados' });
        }

        // Devolver los subcontratos en la respuesta
        res.status(200).json(subContratos);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createSubContratoWithDocuments = async (req, res) => {
    const { 
        razonSocial, obra, contactoMail, contactoTel, rut, direccion, departamento,
        constInscripDGI_DOC, constInscripBPS_DOC, certificadoDGI_DOC, certificadoDGI_FECHAVENCIMIENTO, certificadoDGI_VENCIDO,
        certComunBPS_DOC, certComunBPS_FECHAVENCIMIENTO, certComunBPS_VENCIDO, seguroAcidenteTrab_DOC, 
        seguroAcidenteTrab_FECHAVENCIMIENTO, seguroAcidenteTrab_VENCIDO, planillaTrabado_DOC, planillaTrabado_FECHAEMISION,
        tecnicoPrevencionista_NomYApe, tecnicoPrevencionista_Titulo, tecnicoPrevencionista_Matricula,
        direccionVehiculo, libretaCirculacion, cedulaMTOP_DOC, cedulaMTOP_FECHAVENCIMIENTO, cedulaMTOP_VENCIDO, 
        applus_DOC, applus_FECHAVENCIMIENTO, applus_VENCIDO, aplus_PRORROGA, aplus_PRORROGAVENCIDA, soa_DOC, 
        soa_FECHAVENCIMIENTO, soa_VENCIDO, planillaMantenimiento_DOC, esChofer, nomYapell, docIdentidad_DOC, dni, 
        carnetSalud_DOC, carnetSalud_FECHAVENCIMIENTO, carnetSalud_VENCIDO, carnetPsicotecnico_DOC, induccionSST_DOC, 
        licenciaConducir_DOC, licenciaConducir_FECHAVENCIMIENTO, licenciaConducir_VENCIDO, altaBPS
    } = req.body;
    
    const { userId } = req;
    
    try {
        // Iniciar una transacción
        await db.transaction(async (t) => {
            // Crear el subcontrato
            const [idSubContrato] = await db.query(`
                INSERT INTO subContratos (idUsuario_SubContrato)
                VALUES (?)
            `, {
                replacements: [userId],
                transaction: t
            });

            // Crear el documento de la empresa
            await db.query(`
                INSERT INTO docEmpresaSubContrato (
                    idSubContrato_DocEmprSubContrato, razonSocial, obra, contactoMail, contactoTel, rut, direccion, departamento,
                    constInscripDGI_DOC, constInscripBPS_DOC, certificadoDGI_DOC, certificadoDGI_FECHAVENCIMIENTO, certificadoDGI_VENCIDO,
                    certComunBPS_DOC, certComunBPS_FECHAVENCIMIENTO, certComunBPS_VENCIDO, seguroAcidenteTrab_DOC, 
                    seguroAcidenteTrab_FECHAVENCIMIENTO, seguroAcidenteTrab_VENCIDO, planillaTrabado_DOC, planillaTrabado_FECHAEMISION,
                    tecnicoPrevencionista_NomYApe, tecnicoPrevencionista_Titulo, tecnicoPrevencionista_Matricula
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, {
                replacements: [
                    idSubContrato, razonSocial || null, obra || null, contactoMail || null, contactoTel || null, rut || null, 
                    direccion || null, departamento || null, constInscripDGI_DOC || null, constInscripBPS_DOC || null, 
                    certificadoDGI_DOC || null, certificadoDGI_FECHAVENCIMIENTO || null, certificadoDGI_VENCIDO || null, 
                    certComunBPS_DOC || null, certComunBPS_FECHAVENCIMIENTO || null, certComunBPS_VENCIDO || null, 
                    seguroAcidenteTrab_DOC || null, seguroAcidenteTrab_FECHAVENCIMIENTO || null, seguroAcidenteTrab_VENCIDO || null, 
                    planillaTrabado_DOC || null, planillaTrabado_FECHAEMISION || null, tecnicoPrevencionista_NomYApe || null, 
                    tecnicoPrevencionista_Titulo || null, tecnicoPrevencionista_Matricula || null
                ],
                transaction: t
            });

            // Crear el documento del vehículo
            const [idVehiculo] = await db.query(`
                INSERT INTO vehiculoSubContrato (
                    idSubContrato_Vehiculo, libretaCirculacion, cedulaMTOP_DOC, cedulaMTOP_FECHAVENCIMIENTO, 
                    cedulaMTOP_VENCIDO, applus_DOC, applus_FECHAVENCIMIENTO, applus_VENCIDO, aplus_PRORROGA, 
                    aplus_PRORROGAVENCIDA, soa_DOC, soa_FECHAVENCIMIENTO, soa_VENCIDO, planillaMantenimiento_DOC
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, {
                replacements: [
                    idSubContrato, libretaCirculacion || null, cedulaMTOP_DOC || null, 
                    cedulaMTOP_FECHAVENCIMIENTO || null, cedulaMTOP_VENCIDO || null, applus_DOC || null, applus_FECHAVENCIMIENTO || null, 
                    applus_VENCIDO || null, aplus_PRORROGA || null, aplus_PRORROGAVENCIDA || null, soa_DOC || null, 
                    soa_FECHAVENCIMIENTO || null, soa_VENCIDO || null, planillaMantenimiento_DOC || null
                ],
                transaction: t
            });


            // Crear el personal relacionado con el subcontrato
            await db.query(`
                INSERT INTO personalSubContrato (
                    idSubContrato_Personal, idVehiculoSub_Personal, esChofer, nomYapell, docIdentidad_DOC, dni, carnetSalud_DOC, 
                    carnetSalud_FECHAVENCIMIENTO, carnetSalud_VENCIDO, carnetPsicotecnico_DOC, induccionSST_DOC, 
                    licenciaConducir_DOC, licenciaConducir_FECHAVENCIMIENTO, licenciaConducir_VENCIDO, altaBPS
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, {
                replacements: [
                    idSubContrato, idVehiculo, esChofer || false, nomYapell || null, docIdentidad_DOC || null, dni || null, 
                    carnetSalud_DOC || null, carnetSalud_FECHAVENCIMIENTO || null, carnetSalud_VENCIDO || null, 
                    carnetPsicotecnico_DOC || null, induccionSST_DOC || null, licenciaConducir_DOC || null, 
                    licenciaConducir_FECHAVENCIMIENTO || null, licenciaConducir_VENCIDO || null, altaBPS || null
                ],
                transaction: t
            });

            res.status(201).json({ msg: "Subcontrato y documentos creados exitosamente" });
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const updateSubContrato = async (req, res) => {
    const { idSubContrato } = req.params;
    
    const {
        razonSocial, obra, contactoMail, contactoTel, rut, direccion, departamento,
        constInscripDGI_DOC, constInscripBPS_DOC, certificadoDGI_DOC, certificadoDGI_FECHAVENCIMIENTO, certificadoDGI_VENCIDO,
        certComunBPS_DOC, certComunBPS_FECHAVENCIMIENTO, certComunBPS_VENCIDO, seguroAcidenteTrab_DOC, 
        seguroAcidenteTrab_FECHAVENCIMIENTO, seguroAcidenteTrab_VENCIDO, planillaTrabado_DOC, planillaTrabado_FECHAEMISION,
        tecnicoPrevencionista_NomYApe, tecnicoPrevencionista_Titulo, tecnicoPrevencionista_Matricula,
        direccionVehiculo, libretaCirculacion, cedulaMTOP_DOC, cedulaMTOP_FECHAVENCIMIENTO, cedulaMTOP_VENCIDO, 
        applus_DOC, applus_FECHAVENCIMIENTO, applus_VENCIDO, aplus_PRORROGA, aplus_PRORROGAVENCIDA, soa_DOC, 
        soa_FECHAVENCIMIENTO, soa_VENCIDO, planillaMantenimiento_DOC, esChofer, nomYapell, docIdentidad_DOC, dni, 
        carnetSalud_DOC, carnetSalud_FECHAVENCIMIENTO, carnetSalud_VENCIDO, carnetPsicotecnico_DOC, induccionSST_DOC, 
        licenciaConducir_DOC, licenciaConducir_FECHAVENCIMIENTO, licenciaConducir_VENCIDO, altaBPS
    } = req.body;

    try {
        // Iniciar una transacción
        await db.transaction(async (t) => {
            // Actualizar el documento de la empresa
            await db.query(`
                UPDATE docEmpresaSubContrato SET
                    razonSocial = ?, obra = ?, contactoMail = ?, contactoTel = ?, rut = ?, direccion = ?, departamento = ?, 
                    constInscripDGI_DOC = ?, constInscripBPS_DOC = ?, certificadoDGI_DOC = ?, certificadoDGI_FECHAVENCIMIENTO = ?, 
                    certificadoDGI_VENCIDO = ?, certComunBPS_DOC = ?, certComunBPS_FECHAVENCIMIENTO = ?, certComunBPS_VENCIDO = ?, 
                    seguroAcidenteTrab_DOC = ?, seguroAcidenteTrab_FECHAVENCIMIENTO = ?, seguroAcidenteTrab_VENCIDO = ?, 
                    planillaTrabado_DOC = ?, planillaTrabado_FECHAEMISION = ?, tecnicoPrevencionista_NomYApe = ?, 
                    tecnicoPrevencionista_Titulo = ?, tecnicoPrevencionista_Matricula = ?
                WHERE idSubContrato_DocEmprSubContrato = ?
            `, {
                replacements: [
                    razonSocial || null, obra || null, contactoMail || null, contactoTel || null, rut || null, direccion || null, 
                    departamento || null, constInscripDGI_DOC || null, constInscripBPS_DOC || null, certificadoDGI_DOC || null, 
                    certificadoDGI_FECHAVENCIMIENTO || null, certificadoDGI_VENCIDO || null, certComunBPS_DOC || null, 
                    certComunBPS_FECHAVENCIMIENTO || null, certComunBPS_VENCIDO || null, seguroAcidenteTrab_DOC || null, 
                    seguroAcidenteTrab_FECHAVENCIMIENTO || null, seguroAcidenteTrab_VENCIDO || null, planillaTrabado_DOC || null, 
                    planillaTrabado_FECHAEMISION || null, tecnicoPrevencionista_NomYApe || null, tecnicoPrevencionista_Titulo || null, 
                    tecnicoPrevencionista_Matricula || null, idSubContrato
                ],
                transaction: t
            });

            // Actualizar el documento del vehículo
            await db.query(`
                UPDATE vehiculoSubContrato SET
                     libretaCirculacion = ?, cedulaMTOP_DOC = ?, cedulaMTOP_FECHAVENCIMIENTO = ?, 
                    cedulaMTOP_VENCIDO = ?, applus_DOC = ?, applus_FECHAVENCIMIENTO = ?, applus_VENCIDO = ?, 
                    aplus_PRORROGA = ?, aplus_PRORROGAVENCIDA = ?, soa_DOC = ?, soa_FECHAVENCIMIENTO = ?, soa_VENCIDO = ?, 
                    planillaMantenimiento_DOC = ?
                WHERE idSubContrato_Vehiculo = ?
            `, {
                replacements: [
                    libretaCirculacion || null, cedulaMTOP_DOC || null, cedulaMTOP_FECHAVENCIMIENTO || null, 
                    cedulaMTOP_VENCIDO || null, applus_DOC || null, applus_FECHAVENCIMIENTO || null, applus_VENCIDO || null, 
                    aplus_PRORROGA || null, aplus_PRORROGAVENCIDA || null, soa_DOC || null, soa_FECHAVENCIMIENTO || null, 
                    soa_VENCIDO || null, planillaMantenimiento_DOC || null, idSubContrato
                ],
                transaction: t
            });

            // Actualizar el personal relacionado con el subcontrato
            await db.query(`
                UPDATE personalSubContrato SET
                    esChofer = ?, nomYapell = ?, docIdentidad_DOC = ?, dni = ?, carnetSalud_DOC = ?, 
                    carnetSalud_FECHAVENCIMIENTO = ?, carnetSalud_VENCIDO = ?, carnetPsicotecnico_DOC = ?, induccionSST_DOC = ?, 
                    licenciaConducir_DOC = ?, licenciaConducir_FECHAVENCIMIENTO = ?, licenciaConducir_VENCIDO = ?, altaBPS = ?
                WHERE idSubContrato_Personal = ? AND idVehiculoSub_Personal = ?
            `, {
                replacements: [
                    esChofer || false, nomYapell || null, docIdentidad_DOC || null, dni || null, carnetSalud_DOC || null, 
                    carnetSalud_FECHAVENCIMIENTO || null, carnetSalud_VENCIDO || null, carnetPsicotecnico_DOC || null, 
                    induccionSST_DOC || null, licenciaConducir_DOC || null, licenciaConducir_FECHAVENCIMIENTO || null, 
                    licenciaConducir_VENCIDO || null, altaBPS || null, idSubContrato, idSubContrato
                ],
                transaction: t
            });

            res.status(200).json({ msg: "Subcontrato y documentos actualizados exitosamente" });
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const deleteSubContrato = async (req, res) => {
    const { idSubContratos } = req.params;

    try {
        // Iniciar una transacción
        await db.transaction(async (t) => {
            // Eliminar el personal relacionado con el subcontrato
            await db.query(`
                DELETE FROM personalSubContrato
                WHERE idSubContrato_Personal = ?
            `, {
                replacements: [idSubContratos],
                transaction: t
            });

            // Eliminar el documento del vehículo relacionado con el subcontrato
            await db.query(`
                DELETE FROM vehiculoSubContrato
                WHERE idSubContrato_Vehiculo = ?
            `, {
                replacements: [idSubContratos],
                transaction: t
            });

            // Eliminar el documento de la empresa relacionado con el subcontrato
            await db.query(`
                DELETE FROM docEmpresaSubContrato
                WHERE idSubContrato_DocEmprSubContrato = ?
            `, {
                replacements: [idSubContratos],
                transaction: t
            });

            // Eliminar el subcontrato
            await db.query(`
                DELETE FROM subContratos
                WHERE idSubContratos = ?
            `, {
                replacements: [idSubContratos],
                transaction: t
            });

            res.status(200).json({ msg: "Subcontrato y documentos eliminados exitosamente" });
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};