import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

export default class FileWorker {
    constructor(fileName,autoCreate=true, autoCreateTemplate='{"users":[], "messages":[]}') {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const binPath = join(__dirname, '..', '..', 'bin');
        const filePath = join(binPath, fileName);

        this.pathTofile = filePath;

        //создаем файл, если он не существует
        if(autoCreate) {
            fs.access(this.pathTofile, fs.constants.F_OK, (err) => {
                if (err) {
                    fs.writeFile(
                        this.pathTofile, 
                        autoCreateTemplate ?? '', 
                        (err) => {
                        if (err) { 
                            throw err;
                        }
                        console.log('The file has been created!');
                    });
                }

            });
        }
    }

    async readFile() {
        const data = await fs.promises.readFile(this.pathTofile, 'utf8');
        return data;
    }

    async writeFile(data) {
        await fs.promises.writeFile(this.pathTofile, data);
    }
}