import { Sequelize, Model, DataTypes } from 'sequelize';
import db from '../db/connection';

const Usuario = db.define('Usuario', {
  nombre: DataTypes.STRING,
  email: DataTypes.STRING,
  estado: DataTypes.TINYINT
});

export default Usuario;