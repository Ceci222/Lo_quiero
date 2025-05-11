import User from "../../models/user.js"
import ObjectModel from "../../models/object.js"
import Pickup from "../../models/pickup.js"
import { hash } from '../../utils/bycrypt.js';
import {
    UserNameNotProvided,
    UserEmailNotProvided,
    UserPasswordNotProvided,
    UserNotFound
} from '../../utils/errors.js';


async function getProfile(user_id) {
    try {
        const user = await User.findByPk(user_id, { 
        attributes: { exclude: ['user_pwd'] },
        include: [
            { model: ObjectModel, as: 'DonatedObjects', include: [{ model: Pickup, as: 'Pickup' }] },
            { model: ObjectModel, as: 'ReceivedObjects', include: [{ model: Pickup, as: 'Pickup' }] }
        ]
        });
        if (!user) throw new UserNotFound();
        
        return user;

    } catch (error) {
        throw error;
    }
    
}

async function getAll(){
    try {
        const users = await User.findAll({
            include: [
                { model: ObjectModel, as: 'DonatedObjects', include: [{ model: Pickup, as: 'Pickup' }] },
                { model: ObjectModel, as: 'ReceivedObjects', include: [{ model: Pickup, as: 'Pickup' }] }
            ]
        });
        if (users.length === 0) {
            throw new UserNotFound();
        }
        return users;

    } catch(error) {
        throw error //para que aproveche el error personalizado del try y lo reutilice
    }

}

async function getById(id) {
    try {
       const user = await User.findByPk(id, {
        attributes: { exclude: ['user_pwd'] },
        include: [
            { model: ObjectModel, as: 'DonatedObjects', include: [{ model: Pickup, as: 'Pickup' }] },
            { model: ObjectModel, as: 'ReceivedObjects', include: [{ model: Pickup, as: 'Pickup' }] }
        ] //debo usar esta sintáxis pq hay dos realciones con la misma tabla y para diferenciarlas hace falta un alias, no es una asociacion simple con dos tablas diferentes
        });
        if (!user) throw new UserNotFound();
        return user; 

    } catch (error) {
        throw error;
    }
    
}

async function edit(id, data) {

    try {     
        const user = await User.findByPk(id);
        if (!user) throw new UserNotFound();

        // Verifico si user_pwd está presente y hashearlo
        const updateData = { ...data }; //IMPORTANTE: le paso data usando el operador de propagación pq así se crea una copia de data, y no se modifica el original
        if (updateData.user_pwd) {
            updateData.user_pwd = await hash(updateData.user_pwd);
        }

        await User.update(updateData, { 
            where: {
                user_id: id
            }
        });

        return await User.findByPk(id, { 
            attributes: { exclude: ['user_pwd'] }, 
            include: [
                { model: ObjectModel, as: 'DonatedObjects', include: [{ model: Pickup, as: 'Pickup' }] },
                { model: ObjectModel, as: 'ReceivedObjects', include: [{ model: Pickup, as: 'Pickup' }] }
            ]
        });

    } catch (error) {
        throw error;
    }
}

async function create(data){
    try {
        
        
        if(!data.user_name){
            throw new UserNameNotProvided();
        }
        if(!data.user_pwd){
            throw new UserPasswordNotProvided();
        }
        if (!data.user_email) {
            throw new UserEmailNotProvided();
        }

        const hashedPwd = await hash(data.user_pwd);// requiere importar el hash desde bycrypt, es lo mismo que la linea anterior pero se separa por modularidad

        // Crear usuario con la contraseña hasheada
        const user = await User.create({
            user_name: data.user_name,
            user_email: data.user_email,
            user_pwd: hashedPwd //necesito usar los datos explicitos para poder hashear la contraseña, no puedo usar data
        });

        return await User.findByPk(user.user_id, {
            attributes: { exclude: ['user_pwd'] }
        });

    } catch (error) {
        throw error;
    }
}


async function remove(id) {
    try {
        const response = await User.destroy({where: {user_id: id}})

        if (!response) throw new UserNotFound();
        return response; 

    } catch (error) {
        throw error;
    }
       
};



async function getDonations(user_id) {
    try {

        const donations = await ObjectModel.findAll({
            where: { object_donor_id: user_id },
            include: [
                { model: User, as: 'Donor', attributes: { exclude: ['user_pwd'] } },
                { model: User, as: 'Recipient', attributes: { exclude: ['user_pwd'] } },
                { model: Pickup, as: 'Pickup', required: false }
            ]
        });

        

        if (donations.length === 0) { //no puede ser (!donations) ni or (donations?.length === 0) porque con que devuelva un arr  vacío ya va a ser true
            const error = new Error('No se encontraron donaciones asociadas a este usuario');
            error.statusCode = 404;
            throw error; ;  
        }

        return donations;

    } catch (error) {
        throw error;
    }
       
}

async function getPickups(user_id) {
    try {

        const pickups = await Pickup.findAll(
            { 
            include: [
                {
                    model: ObjectModel, //para sacar el object_recipient_id: user_id
                    where: { object_recipient_id: user_id },
                    include: [ //para sacar los ids de usuarios
                        { model: User, as: 'Donor', attributes: { exclude: ['user_pwd'] } },
                        { model: User, as: 'Recipient', attributes: { exclude: ['user_pwd'] } }
                    ]
                }
            ]
        });

        if (pickups.length === 0) {
        
            const error = new Error('No se encontraron recogidas asociadas a este usuario');
            error.statusCode = 404;
            throw error; 
        }

        return pickups;

    } catch (error) {
        throw error;
    }
       
}

export default {
    getById,
    edit,
    remove,
    create,
    getAll,
    getProfile,
    getDonations,
    getPickups
};

