'user strict'

import Publication from "../publication/publication.model.js"
import User from '../user/user.model.js'

import {    encrypt, 
    checkPassword,
    checkUpdate 
} from '../utils/validator.js'

export const testPublication = (req, res) =>{
    console.log('test is running')
    res.send({message: 'Test is running'})
}

export const savePublication = async (req, res) => {
    try {
        //Capturar la data
        let data = req.body
        //Validar que el user exista
        let user = await User.findOne({_id: data.user})
        if(!user) return res.status(404).send({message: 'user not found'})
        //Crear la instancia 
        let publication = new Publication(data)
        //Guardar 
        await publication.save()
        //Responder si todo sale bien
        return res.send({message: 'Publication saved successfully'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error saving publication'})
    }
}

export const updatePublication = async(req, res)=>{
    try {
        //Capturar la data
        let data = req.body
        //Capturar el id de la publicacion a actualizar
        let {id} = req.params
        //Validar que vengan datos
        let update = checkUpdate(data, false)
        if(!update) return res.status(400).send({message: 'Have sumitted some data that cannot be updated or missing data'})
        //Actualizar
        let updatedPublication = await Publication.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        ).populate('user', ['name'])//Elimianr la informacion sensible
        //Validar la actualizacion
        if(!updatedPublication) return res.status(404).send({message: 'Publication not found and not updated'})
        
        //Responder si todo sale bien
        return res.send({message: 'Publication updated successfully', updatedPublication})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error updating publication'})
    }
}

export const deletePublication = async(req, res)=>{
    try{
      //Capturar el id de la publicacion a eliminar
      let { id } = req.params
      //Eliminar
      let deletedPublication = await Publication.deleteOne({_id: id})
      //Validar que se elimino
      if(deletedPublication.deleteCount === 0)return res.status(404).send({message: 'Publication not found and not deleted'})
      //Responder
      return res.send({message: 'Deleted publication successfully'})
    }catch(err){
      console.error(err)
      return res.status(404).send({message: 'Error deleting publication'})
    }
}
