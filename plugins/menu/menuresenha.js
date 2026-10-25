import fs from 'fs';
import path from 'path';
import MenuSystem from '../../arquivos/js/menuSystem.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    name: 'menuresenha',
    description: 'Mostra todos os comandos de resenha/diversão',
    category: 'menu',
    aliases: ['resenha', 'diversao', 'brincadeiras'],
    async execute({ columbina, from, info, prefix, reply, reagir, commandManager }) {
        await reagir('🎮');

        const menuSystem = new MenuSystem(commandManager);
        /* PUXA TODOS OS COMANDOS DA PASTA plugins/resenha/ */
        const comandos = menuSystem.getCommandsByFolder('resenha');

        const menuTexto = menuSystem.gerarMenuCustom(comandos, prefix, 'RESENHA/DIVERSÃO', '🎮');

        await reply(menuTexto, from, info);
    }
};