"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuario_1 = __importDefault(require("../routes/usuario"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/connection"));
class Server {
    constructor() {
        this.apiEndpoints = {
            usuarios: '/api/usuarios'
        };
        this.app = (0, express_1.default)(),
            this.port = process.env.PORT || '8000';
        //dbConnection
        this.dbConnection();
        //middlewares
        this.middlewares();
        //definiendo rutas
        this.routes();
    }
    ;
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('SUCCESS: DB connection');
            }
            catch (error) {
                console.error('Unable to connect to the database:', error);
            }
        });
    }
    middlewares() {
        //CORS
        this.app.use((0, cors_1.default)());
        //BODY PARSER - JSON 
        this.app.use(express_1.default.json());
        //PUBLIC
        this.app.use(express_1.default.static('public'));
    }
    ;
    routes() {
        this.app.use(this.apiEndpoints.usuarios, usuario_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('SUCCESS: PORT', this.port);
        });
    }
    ;
}
;
exports.default = Server;
//# sourceMappingURL=server.js.map