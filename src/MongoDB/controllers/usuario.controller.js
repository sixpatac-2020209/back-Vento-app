'use strict'

const User = require('../models/usuario.model');
const {validateData, encrypt, alreadyUser, 
    checkPassword, checkUpdate, checkPermission,
    checkUpdateAdmin} = require('../../utils/validate');

//FUNCIONES PÚBLICAS
exports.userTest = async (req, res)=>{
    await res.send({message: 'User Test is running.'})
}

exports.register = async(req, res)=>{
    try{
        const params = req.body;
        let data = {
            name: params.name,
            username: params.username,
            email: params.email,
            password: params.password,
            role: 'CLIENT'
        };
        let msg = validateData(data);

        if(msg) return res.status(400).send(msg);
        let already = await alreadyUser(data.username);
        if(already) return res.status(400).send({message: 'Username already in use'});
        data.surname = params.surname;
        data.phone = params.phone;
        data.password = await encrypt(params.password);

        let user = new User(data);
        await user.save();
        return res.send({message: 'User created successfully'});
    }catch(err){
        console.log(err);
        return res.status(500).send({err, message: 'Error saving user'});
    }
}

exports.login = async(req, res)=>{
    try{
        const params = req.body;
        let data = {
            username: params.username,
            password: params.password
        }
        let msg = validateData(data);

        if(msg) return res.status(400).send(msg);
        let already = await alreadyUser(params.username);
        if(already && await checkPassword(data.password, already.password)){
            let token = await jwt.createToken(already);
            delete already.password;

            return res.send({message: 'Login successfuly', already, token});
        }else return res.status(401).send({message: 'Invalid credentials'});
    }catch(err){
        console.log(err);
        return res.status(500).send({err, message: 'Failed to login'});
    }
}

//FUNCIONES PRIVADAS
//CLIENT

exports.update = async(req, res)=>{
    try{
        const userId = req.params.id;
        const params = req.body;

        const permission = await checkPermission(userId, req.user.sub);
        if(permission === false) return res.status(401).send({message: 'You dont have permission to update this user'});
        const userExist = await User.findOne({_id: userId});
        if(!userExist) return res.send({message: 'User not found'});
        const validateUpdate = await checkUpdate(params);
        if(validateUpdate === false) return res.status(400).send({message: 'Cannot update this information or invalid params'});
        let alreadyname = await alreadyUser(params.username);
        if(alreadyname && userExist.username != params.username) return res.send({message: 'Username already in use'});
        const userUpdate = await User.findOneAndUpdate({_id: userId}, params, {new: true}).lean();
        if(userUpdate) return res.send({message: 'User updated', userUpdate});
        return res.send({message: 'User not updated'});
    }catch(err){
        console.log(err);
        return res.status(500).send({err, message: 'Failed to update user'});
    }
}

exports.delete = async(req, res)=>{
    try{
        const userId = req.params.id;
        const persmission = await checkPermission(userId, req.user.sub);
        if(persmission === false) return res.status(403).send({message: 'You dont have permission to delete this user'});
        const userDeleted = await User.findOneAndDelete({_id: userId});
        if(userDeleted) return res.send({message: 'Account deleted', userDeleted});
        return res.send({message: 'User not found or already deleted'});
    }catch(err){
        console.log(err);
        return res.status(500).send({err, message: 'Error deleting user'});
    }
}
