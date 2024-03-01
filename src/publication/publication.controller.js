'user strict'

import publication from "./publication.model.js"
import {    encrypt, 
    checkPassword,
    checkUpdate 
} from '../utils/validator.js'

export const testPublication = (req, res) =>{
    console.log('test is running')
    res.send({message: 'Test is running'})
}

export const savePublication = async (req, res) =>{
    try{
        // Capturar el nombre del curso desde el body
        let data = req.body;
        // Crear una nueva instancia de publication solo con el nombre
        const publication = new Publication( data );
        // Guardar la empresa
        await publication.save();
        // Responder al usuario
        return res.send({ message: `La publicacion "${data.title}" se ha registrado exitosamente` });
    } catch(err){
        console.error(err);
        return res.status(500).send({ message: 'No se pudo guardar la publicacion', err: err });
    }
};
/*
export const updateCompany = async(req, res) => {
    try{
        //Obtener el id del usuario para actualizar
        let { id } = req.params
        //obtener los datos a actualizar
        let data = req.body
        //Actualizar la db
        let updatedCompany = await Company.findOneAndUpdate(
            //va a buscar un solo registro
            {_id: id},  //ObjectId <- hexadecimales(hora sys, version mongo, llave privada...)
            data, //los datos que se van a actualizar 
            {new: true}
        )
        //Validar la actualización
        if(!updatedCompany) return res.status(401).send({message: 'Company not found and not update'})
        //Responde al usuario
        return res.send({message: `Update company`, updatedCompany})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: `Error updating company`})
    }
}

export const listCompanies = async (req, res) => {
    try {
        // Obtener todos las empresas de la base de datos
        let companies = await Company.find();

        // Validar si no se encontraron empresas
        if (!companies || companies.length === 0) {
            return res.status(404).send({ message: 'No companies found' });
        }

        // Responder con la lista de empresas
        return res.send({ message: 'Companies found', companies });
    } catch(err) {
        console.error(err);
        return res.status(500).send({ message: 'Error listing categories' });
    }
}

export const filterCompaniesByYears = async (req, res) => {
    try {
        const { yearOfExperience } = req.query;
        
        // Verificar si se proporciona el parámetro yearOfExperience
        if (!yearOfExperience) {
            return res.status(400).json({ message: 'Se requiere el parámetro yearsOfExperience' });
        }

        // Consultar empresas con el número específico de años de trayectoria
        const companies = await Company.find({ yearOfExperience: yearOfExperience });

        return res.json(companies);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error al filtrar las empresas por años de trayectoria' });
    }
}

export const filterCompaniesByCategory = async (req, res) => {
    try {
        const { businessCategory } = req.query;
        
        // Verificar si se proporciona el parámetro businessCategory
        if (!businessCategory) {
            return res.status(400).json({ message: 'Se requiere el parámetro businessCategory' });
        }

        // Consultar empresas con la categoría específica
        const companies = await Company.find({ businessCategory });

        return res.json(companies);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error al filtrar las empresas por categoría' });
    }
}

export const sortCompaniesAZ = async (req, res) => {
    try {
        // Consultar empresas y ordenarlas de A-Z por el campo de nombre
        const companies = await Company.find().sort({ name: 1 });
        return res.json(companies);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error al ordenar las empresas de A-Z' });
    }
}

export const sortCompaniesZA = async (req, res) => {
    try {
        // Consultar empresas y ordenarlas de Z-A por el campo de nombre
        const companies = await Company.find().sort({ name: -1 });
        return res.json(companies);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error al ordenar las empresas de Z-A' });
    }
}

export const generateExcelReport = async (req, res) => {
    try {
        // Consultar todas las empresas registradas en la base de datos
        const companies = await Company.find();

        // Crear un nuevo workbook de Excel
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Empresas');

        // Definir las columnas del reporte
        worksheet.columns = [
            { header: 'Nombre', key: 'name', width: 20 },
            { header: 'Descripción', key: 'description', width: 40 },
            { header: 'Nivel de Impacto', key: 'impactLevel', width: 20 },
            { header: 'Años de Experiencia', key: 'yearOfExperience', width: 20 },
            { header: 'Categoría Comercial', key: 'businessCategory', width: 30 },
            { header: 'CEO', key: 'CEO', width: 20 }
        ];

        // Agregar los datos de las empresas al worksheet
        companies.forEach(company => {
            worksheet.addRow({
                name: company.name,
                description: company.description,
                impactLevel: company.impactLevel,
                yearOfExperience: company.yearOfExperience,
                businessCategory: company.businessCategory,
                CEO: company.CEO
            });
        });

        // Generar el archivo Excel
        const buffer = await workbook.xlsx.writeBuffer();

        // Establecer los encabezados de la respuesta para indicar que se envía un archivo Excel
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=reporte_empresas.xlsx');

        // Enviar el archivo Excel como respuesta
        res.send(buffer);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error al generar el reporte en Excel' });
    }
}*/