'user strict'

import Publication from "../publication/publication.model.js"
import User from '../user/user.model.js'
import Comment from "./comment.model.js"

import {    encrypt, 
    checkPassword,
    checkUpdate 
} from '../utils/validator.js'

export const testComment = (req, res) =>{
    console.log('test is running')
    res.send({message: 'Test is running'})
}

export const saveComment = async (req, res) => {
    try {
        //Capturar la data
        let data = req.body
        //Validar que el user exista
        let user = await User.findOne({_id: data.user})
        if(!user) return res.status(404).send({message: 'user not found'})
        //Validar que el publication exista
        //let publication = await Publication.findOne({_id: data.title})
        //if(!publication) return res.status(404).send({message: 'publication not found'})
        //Crear la instancia 
        let comment = new Comment(data)
        //Guardar 
        await comment.save()
        //Responder si todo sale bien
        return res.send({message: 'Comment saved successfully'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error saving Comment'})
    }
}

export const updateComment = async(req, res)=>{
    try {
        //Capturar la data
        let data = req.body
        //Capturar el id de la publicacion a actualizar
        let {id} = req.params
        //Validar que vengan datos
        //Hacer que no pueda cambiar de publicacion
        let update = checkUpdate(data, false)
        if(!update) return res.status(400).send({message: 'Have sumitted some data that cannot be updated or missing data'})
        //Actualizar
        let updatedComment = await Comment.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        ).populate('user', 'publication', ['name', 'title'])//Elimianr la informacion sensible
        //Validar la actualizacion
        if(!updatedComment) return res.status(404).send({message: 'Comment not found and not updated'})
        
        //Responder si todo sale bien
        return res.send({message: 'Comment updated successfully', updatedComment})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error updating comment'})
    }
}

export const deleteComment = async(req, res)=>{
    try{
      //Capturar el id de la publicacion a eliminar
      let { id } = req.params
      //Eliminar
      let deteledComment = await Comment.deleteOne({_id: id})
      //Validar que se elimino
      if(deteledComment.deleteCount === 0)return res.status(404).send({message: 'Comment not found and not deleted'})
      //Responder
      return res.send({message: 'Deleted comment successfully'})
    }catch(err){
      console.error(err)
      return res.status(404).send({message: 'Error deleting comment'})
    }
}
