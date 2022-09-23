'use strict'

const User = require('../models/usuario.model');
const {validateData, encrypt, alreadyUser, 
    checkPassword, checkUpdate, checkPermission,
    checkUpdateAdmin} = require('../utils/validate');
const jwt = require('../services/jwt')

//FUNCIONES PÚBLICAS
exports.userTest = async (req, res)=>{
    await res.send({message: 'User Test is running.'})
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

//FUNCIONES PRIVADAS -- Admin --

exports.addUser = async (req, res) =>{

};

exports.updateUser = async (req, res) =>{

};

exports.deleteUser = async (req, res) =>{

};





// OPTIONS TABLES USER
exports.AtoZnameUser = async (req, res) =>{
    try {
        const users = await User.find({$or:[{role:'OPERARIO'},{role:'JEFE'}]}).sort({name: 'asc'});
        return res.send({users});

    } catch(err) {
        console.log(err)
        return res.status(500).send({ message: 'Error getting Users.', err});
    }
};

exports.ZtoAnameUser = async (req,res) =>{
    try {
        const users = await User.find({$or:[{role:'OPERARIO'},{role:'JEFE'}]}).sort({name: 'desc'});
        return res.send({users});  

    } catch(err){
        console.log(err)
        return res.status(500).send({ message: 'Error getting Users.', err});
    }
};

exports.AtoZsurnameUser = async(req, res)=>{
    try {
        const users = await User.find({$or:[{role:'CLIENTE'},{role:'ORGANIZADOR'}]}).sort({surname: 'asc'});
        return res.send({users});

    } catch(err) {
        console.log(err)
        return res.status(500).send({ message: 'Error getting Users.', err});
    }
}


exports.ZtosurnameAUser = async(req, res)=>
{
    try {
        const users = await User.find({$or:[{role:'CLIENTE'},{role:'ORGANIZADOR'}]}).sort({surname: 'desc'});
        return res.send({users});  

    } catch(err) {
        console.log(err)
        return res.status(500).send({ message: 'Error getting Users.', err});
    }
}

exports.AtoZroleUser = async (req, res) =>{
    try {
        const users = await User.find({$or:[{role:'CLIENTE'},{role:'ORGANIZADOR'}]}).sort({role: 'asc'});
        return res.send({users});  

    } catch(err) {
        console.log(err)
        return res.status(500).send({ message: 'Error getting Users.', err});
    }
};

exports.ZtoAroleUser = async (req, res) =>{
    try {
        const users = await User.find({$or:[{role:'CLIENTE'},{role:'ORGANIZADOR'}]}).sort({role: 'desc'});
        return res.send({users});  

    } catch(err) {
        console.log(err)
        return res.status(500).send({ message: 'Error getting Users.', err});
    }
};