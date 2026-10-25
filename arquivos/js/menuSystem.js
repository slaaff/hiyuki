import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class MenuSystem {
    constructor(commandManager) {
        this.commandManager = commandManager;
        this.hiddenCommandsFile = './arquivos/json/commandos_ocultos.json';
        this.carregarComandosOcultos();
    }

    carregarComandosOcultos() {
        try {
            if (fs.existsSync(this.hiddenCommandsFile)) {
                this.hiddenCommands = JSON.parse(fs.readFileSync(this.hiddenCommandsFile));
            } else {
                this.hiddenCommands = {};
                fs.writeFileSync(this.hiddenCommandsFile, JSON.stringify({}, null, 2));
            }
        } catch (e) {
            this.hiddenCommands = {};
        }
    }

    salvarComandosOcultos() {
        fs.writeFileSync(this.hiddenCommandsFile, JSON.stringify(this.hiddenCommands, null, 2));
    }

    ocultarComando(categoria, nomeComando) {
        if (!this.hiddenCommands[categoria]) {
            this.hiddenCommands[categoria] = [];
        }
        if (!this.hiddenCommands[categoria].includes(nomeComando)) {
            this.hiddenCommands[categoria].push(nomeComando);
            this.salvarComandosOcultos();
            return true;
        }
        return false;
    }

    restaurarComando(categoria, nomeComando) {
        if (this.hiddenCommands[categoria]) {
            const index = this.hiddenCommands[categoria].indexOf(nomeComando);
            if (index !== -1) {
                this.hiddenCommands[categoria].splice(index, 1);
                this.salvarComandosOcultos();
                return true;
            }
        }
        return false;
    }

    isComandoOculto(categoria, nomeComando) {
        return this.hiddenCommands[categoria] && this.hiddenCommands[categoria].includes(nomeComando);
    }

    getCommandsByFolder(folderName) {
        const todosComandos = this.commandManager.ObterComandosPorCategoria(folderName);
        return todosComandos.filter(cmd => {
            const nomeCmd = cmd.name || cmd.originalName;
            return !this.isComandoOculto(folderName, nomeCmd);
        });
    }

    gerarMenuCustom(commands, prefix, titulo, icone = '📋') {
        let output = `╭━━━〔 *${icone} ${titulo}* 〕━━━╮\n`;
        if (!commands || commands.length === 0) {
            output += `┃\n┃  Nenhum comando cadastrado ainda.\n┃\n`;
        } else {
            output += `┃\n`;
            for (let i = 0; i < commands.length; i++) {
                const cmd = commands[i];
                const nomeComando = cmd.name || cmd.originalName;
                const desc = cmd.description ? ` - _${cmd.description}_` : '';
                output += `┃ • *${prefix}${nomeComando}*${desc}\n`;
            }
            output += `┃\n`;
        }
        output += `╰━━━━━━━━━━━━━━━━━━━━━╯\n`;
        output += `💡 *Total:* ${commands ? commands.length : 0} comando(s)\n`;
        output += `💡 Digite *${prefix}menu* para voltar ao menu principal.`;

        return output;
    }

    gerarMenuDesigner(commands, prefix, titulo, iconeEsq = '🌸', iconeDir = '🌸') {
        return this.gerarMenuCustom(commands, prefix, titulo, iconeEsq);
    }
}

export default MenuSystem;
