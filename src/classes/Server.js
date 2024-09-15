import express from "express";
import cors from 'cors';


export default class Server {
    constructor() {
        this.app = express();

        //корс заглушка
        this.app.use(cors());
        //отключение кеширования
        this.app.enable('view cache');
        this.app.set('view cache', false);
        this.app.use(express.json());
    }
    
    setPostRouter(path, callback) {
        this.app.post(path, callback);
    }

    setGetRouter(path, callback) {
        this.app.get(path, callback);
    }
}