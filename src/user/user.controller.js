'use strict'

import User from './user.model.js'
import {    encrypt, 
            checkPassword,
            checkUpdate 
    } from '../utils/validator.js'
    import { generateJwt } from '../utils/jwt.js'

export const test =(req, res)=>{
    console.log('test is running')
    return res.send({message: 'Test is running'})
}

export const adminDef = async(req,res) =>{
    try{
        const adminExists = await User.findOne({username: 'admin'})
        if(adminExists){
            console.log('Ya existe el usuario principal')
        }else{
            const encryptPassword =  await encrypt('useAdmin')
            const nuevoUsuario = new User({
                name: 'admin',
                surname: 'admin',
                username: 'admin',
                password: encryptPassword,
                email: 'admin@gmail.com',
                phone: '21548798',
                role: 'ADMIN'
            })
            await nuevoUsuario.save()
        }
    }catch(err){
        console.error(err)
    }
}

export const register = async(req, res) => {
    try{
        //Capturar el formulario (body)
        let data = req.body
        const existingUser = await User.findOne({ username: data.username });
        if (existingUser) {
            return res.status(400).send({message: `An user with the same username already exists.`});
        }
        //Encriptar la constraseña 
        data.password = await encrypt(data.password)
        //Asignar el rol por defecto 
        data.role = 'CLIENT'
        //Guardar la información en la DB
        let user = new User(data)
        await user.save()
        //Responder al usuario  
        return res.send({message: `Register successfully, can be logged with email use ${user.email}`})
    }catch(err){    
        console.log(err)
        return res.status(500).send({message: 'Error registering user', err: err})
    }
}

export const login = async(req, res)=>{
    try{
        //Capturar los datos (body)
        let { username, email, password } = req.body
        //Validar que el usuario exista
        let user;
        if (username) {
            user = await User.findOne({ username });
        } else if (email) {
            user = await User.findOne({ email });
        } else {
            return res.status(400).send({ message: 'Username or email is required' });
        }
        //Verificar que la contraseña coincida
        if(user && await checkPassword(password, user.password)){
            let loggedUser = {
                uid: user._id,
                //email: user.email,
                username: user.username,
                name: user.name,
                role: user.role
            }
            //Generar
            let token = await generateJwt(loggedUser)
            //respondo al usuario
            return res.send(
                {
                    message: `Welcome ${loggedUser.name}`, 
                    loggedUser, 
                    token
                }
            )
        }
        return res.status(404).send({message: 'Invalid credentials'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to login'})
    }
}

export const update = async(req, res)=>{ //Datos generales (No password)
    try {
        //Obtener el id del usuario a actualizar
        let { id } = req.params
        //Obtener los datos a actualizar
        let data = req.body
        //Validar si data trae datos
        let update = checkUpdate(data, id)
        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be updated'})
        //Validar si tiene permisos (tekenizacion) X Por hoy no lo vemos X
        //Actualizar (DB)
        let updatedUser = await User.findOneAndUpdate(
            {_id: id}, // ObjectsId <- hexadecimales (Hora sys, version Mongo, Llave privada...)
            data //Los datos que se van a actualizar 
        )
        //Validar la actualizacion
        if (!updatedUser)return res.status(401).send({message: 'User not found and not updated'})
        return res.send({message: 'Update User', updatedUser})
        //Respondo al usuario
    } catch (err) {
        console.error(err)
        if(err.keyValue.username) return res.status(400).send({message: `Username ${err.keyValue.username} is already taken`})
        return res.satatus(500).send({message: 'error updating acount'})
    }
}

export const updatePassword = async (req, res) => {
    try {
        const { id } = req.params;
 
        const { oldPassword, newPassword } = req.body;
        // Verificar si se proporciona la contraseña antigua y la nueva contraseña
        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: 'Se requieren la contraseña antigua y la nueva contraseña' });
        }
 
        // Buscar al usuario por ID y contraseña antigua
        const user = await User.findOne({ _id: id});
 
        if (!user) {
            return res.status(401).json({ message: 'La contraseña antigua es incorrecta o el usuario no fue encontrado' });
        }
 
        // Verificar que la nueva contraseña cumpla con los requisitos mínimos
        if (newPassword.length < 8) {
            return res.status(400).json({ message: 'La nueva contraseña debe tener al menos 8 caracteres' });
        }
        let nuevacontra = await encrypt(newPassword)
        // Actualizar la contraseña del usuario
        const updatedUser = await User.findByIdAndUpdate(id, { password: nuevacontra }, { new: true });
 
        if (!updatedUser) {
            return res.status(500).json({ message: 'Error al actualizar la contraseña del usuario' });
        }
 
        return res.json({ message: 'Contraseña actualizada exitosamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};
