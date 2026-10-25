import fs from 'fs';
import path from 'path';
import MenuSystem from '../../arquivos/js/menuSystem.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    name: 'menuefeitos',
    description: 'Mostra todos os comandos de efeitos',
    category: 'menu',
    aliases: ['efeitos', 'fxmenu', 'efmenu'],
    async execute({ columbina, from, info, prefix, reply, reagir, commandManager }) {
        await reagir('✨');

        const menuSystem = new MenuSystem(commandManager);
        /* PUXA TODOS OS COMANDOS DA PASTA plugins/efeitos/ */
        const comandos = menuSystem.getCommandsByFolder('efeitos');

        const menuTexto = menuSystem.gerarMenuCustom(comandos, prefix, 'EFEITOS', '✨');

        await reply(menuTexto, from, info);
    }
};