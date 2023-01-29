import express from 'express';
import userRoutes from '../routes/usuario';
import cors from 'cors'
import db from '../db/connection';

class Server {
    private app: express.Application;
    private port: string;
    private apiEndpoints = {
        usuarios: '/api/usuarios'
    };

    constructor() {
        this.app = express(),
        this.port = process.env.PORT || '8000'


        //dbConnection
        this.dbConnection()

        //middlewares
        this.middlewares()

        //definiendo rutas
        this.routes()

    };

    async dbConnection(){
        try {
            await db.authenticate();
            console.log('SUCCESS: DB connection');
          } catch (error) {
            console.error('Unable to connect to the database:', error);
          }
    }

    middlewares() {
        //CORS
        this.app.use( cors() );

        //BODY PARSER - JSON 
        this.app.use(express.json())

        //PUBLIC
        this.app.use( express.static('public'))
    };


    routes(){
        this.app.use( this.apiEndpoints.usuarios, userRoutes)
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log('SUCCESS: PORT', this.port);
        } )
    };
};

export default Server;