import Ticket from './models/Ticket.js';
import { Sequelize } from 'sequelize';
import path from 'path';

export default class Database {
    constructor() {
        this.sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: path.join("../bin", 'database.sqlite'),
        });

        this.ticketModel = Ticket(this.sequelize);
    }

    async initialization() {
        try {
            await this.sequelize.authenticate();
            console.log('Соединение с БД установлено успешно.');
            await this.sequelize.sync();
            console.log('Модели синхронизированы с БД.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}