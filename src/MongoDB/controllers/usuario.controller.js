'use strict'

const User = require('../models/usuario.model');
const { validateData, encrypt, alreadyUser,
    checkPassword, checkUpdate, checkPermission,
    checkUpdateAdmin } = require('../utils/validate');
const jwt = require('../services/jwt')

//FUNCIONES PÚBLICAS
exports.userTest = async (req, res) => {
    await res.send({ message: 'Modúlo de usuarios corriendo' })
}

exports.login = async (req, res) => {
    try {
        const params = req.body;
        let data = {
            username: params.username,
            password: params.password
        }
        let msg = validateData(data);

        if (msg) return res.status(400).send(msg);
        let already = await alreadyUser(params.username);
        if (already && await checkPassword(data.password, already.password)) {
            let token = await jwt.createToken(already);
            delete already.password;

            return res.send({ message: 'Login successfuly', already, token });
        } else return res.status(401).send({ message: 'Invalid credentials' });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Failed to login' });
    }
}

//FUNCIONES PRIVADAS -- Admin --

exports.addUser = async (req, res) => {
    try {
        const params = req.body;
        const data = {
            nombre: params.name,
            apellido: params.surname,
            contraseña: params.password,
            usuario: params.username,
            role: params.role
        }

        if (data.role === 'OPERARIO' || data.role === 'JEFE') {
            const msg = validateData(data);
            if (msg) return res.status(400).send(msg);

            const existUser = await User.findOne({ username: params.username });
            if (!existUser) {
                data.password = await encrypt(params.password);
                const user = new User(data);
                await user.save();
                return res.send({ message: 'Usuario registrado Existosamente.', user });
            } else {
                return res.send({ message: 'Usuario agregadó anteriormente' });
            }
        } else{
            return res.send({message: 'Rol no autorizado'})
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error creando al Usuario' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const params = req.body;

        const userExist = await User.findOne({ _id: userId });
        if (!userExist) return res.status(400).send({ message: 'Usuario no Encontrado.' });
        const emptyParams = await checkUpdateAdmin(params);
        if (emptyParams === false) return res.status(400).send({ message: 'Parámetros Vacíos o no Editables' });
        if (userExist.role === 'ADMINISTRADOR') return res.status(400).send({ message: 'No se puede Editar al Administrador.' });
        const alreadyUsername = await User.findOne({ username: params.username });
        if (alreadyUsername && userExist.username != alreadyUsername.username)
            return res.status(400).send({ message: 'El nombre de usuario se encuentra en uso.' });
        const userUpdate = await User.findOneAndUpdate({ _id: userId }, params, { new: true });
        if (!userUpdate) return res.status(400).send({ message: 'Usuario no Editado.' });
        return res.send({ message: 'Usuario Editado Exitosamente', userUpdate });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Error al Editar al Usuario.' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const userExist = await User.findOne({ _id: userId });
        if (!userExist) return res.status(400).send({ message: 'Organizador No Encontrado.' });
        if (userExist.role === 'ADMINISTRADOR')
            return res.status(400).send({ message: 'No se puede eliminar al Administrador.' });
        const userDeleted = await User.findOneAndDelete({ _id: userId });
        if (!userDeleted) return res.status(400).send({ message: 'Usuario no Eliminado.' });
        return res.send({ message: 'Usuario Eliminado Correctamente', userDeleted })
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Error al eliminar al Usuario' });
    }
};





// OPTIONS TABLES USER
exports.AtoZnameUser = async (req, res) => {
    try {
        const users = await User.find({ $or: [{ role: 'OPERARIO' }, { role: 'JEFE' }] }).sort({ name: 'asc' });
        return res.send({ users });

    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Error getting Users.', err });
    }
};

exports.ZtoAnameUser = async (req, res) => {
    try {
        const users = await User.find({ $or: [{ role: 'OPERARIO' }, { role: 'JEFE' }] }).sort({ name: 'desc' });
        return res.send({ users });

    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Error getting Users.', err });
    }
};

exports.AtoZsurnameUser = async (req, res) => {
    try {
        const users = await User.find({ $or: [{ role: 'CLIENTE' }, { role: 'ORGANIZADOR' }] }).sort({ surname: 'asc' });
        return res.send({ users });

    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Error getting Users.', err });
    }
}

exports.ZtosurnameAUser = async (req, res) => {
    try {
        const users = await User.find({ $or: [{ role: 'CLIENTE' }, { role: 'ORGANIZADOR' }] }).sort({ surname: 'desc' });
        return res.send({ users });

    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Error getting Users.', err });
    }
}

exports.AtoZroleUser = async (req, res) => {
    try {
        const users = await User.find({ $or: [{ role: 'CLIENTE' }, { role: 'ORGANIZADOR' }] }).sort({ role: 'asc' });
        return res.send({ users });

    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Error getting Users.', err });
    }
};

exports.ZtoAroleUser = async (req, res) => {
    try {
        const users = await User.find({ $or: [{ role: 'CLIENTE' }, { role: 'ORGANIZADOR' }] }).sort({ role: 'desc' });
        return res.send({ users });

    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Error getting Users.', err });
    }
};