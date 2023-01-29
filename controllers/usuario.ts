import { Request, Response } from "express"
import db from "../db/connection";
import Usuario from "../models/usuario";

export const getUsuarios = async (req: Request, res: Response) => {
    
    const usuarios = await Usuario.findAll();

    res.json(usuarios);
};


export const getUsuario = async (req: Request, res: Response) => {
    const {id} = req.params;

    const usuario = await Usuario.findByPk(id);

    if (usuario){
        res.json(usuario);
    } else {
        res.status(404).json({
            msg: `No user match with id: ${id}`
        })
    }
};


export const postUsuario = async (req: Request, res: Response) => {
    const { body } = req;


    //existe email?
    const existeEmail = await Usuario.findOne({ where: {email: body.email }})
    if (existeEmail) {
        return res.status(400).json({
            msg: `Email ${body.email} is already used.`
        })
    }

    try {
        const usuarioCreado = await Usuario.create(body)
        res.json(usuarioCreado)
    } catch (error) {
        res.json({msg: 'Databse error'})
    }
    
    
};


export const putUsuario = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;


    //existe usuario? 
    const exiseUsuario = await Usuario.findByPk(id)
    if (!exiseUsuario) {
        return res.status(404).json({
            msg: `User does not exist.`
        })
    }

    try {
        await exiseUsuario.update(body)
        res.json(exiseUsuario)
    } catch (error) {
        res.status(500).json({msg: 'Databse error'})
    }
};


export const deleteUsuario = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;


    //existe usuario? 
    const exiseUsuario = await Usuario.findByPk(id)
    if (!exiseUsuario) {
        return res.status(404).json({
            msg: `User does not exist.`
        })
    }

    try {
        await exiseUsuario.update({estado: false})
        res.json(exiseUsuario)
    } catch (error) {
        res.status(500).json({msg: 'Databse error'})
    }
};


