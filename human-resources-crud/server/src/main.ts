import 'reflect-metadata'
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.join(__dirname, '../../.env')
});

import { Application } from './application/application';
import { sequelize } from './sequelize';

async function main() {
    if (process.argv.includes('--restore-db')) {
        await sequelize.sync({ force: true });
    } else {
        await sequelize.sync();
    }

    const app = new Application(3001);
    app.run();
}

main();