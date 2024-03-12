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
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncTables = void 0;
const sequelize_1 = require("sequelize");
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DATABASE;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT !== undefined ? parseInt(process.env.DB_PORT, 10) : 3306;
const sequelize = new sequelize_1.Sequelize({
    dialect: 'mysql',
    database,
    username,
    password,
    host,
    port,
    logging: false
});
function syncTables() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sequelize.sync();
            console.log(">> Tablas sincronizadas");
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Ocurrió un error: ${error.message}`);
            }
            else {
                throw new Error('Ocurrió un error desconocido.');
            }
        }
    });
}
exports.syncTables = syncTables;
exports.default = sequelize;
