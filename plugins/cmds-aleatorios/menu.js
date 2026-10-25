import fs from 'fs';

export default {
    name: 'menu',
    description: 'Mostra o menu principal de comandos',
    category: 'cmds-aleatorios',
    aliases: ['comandos', 'help', 'ajuda'],
    
    async execute({ columbina, from, info, prefix, reply, reagir, pushname, isGroup, isDono, isAdm }) {
        await reagir("📋");

        let botName = 'HIYUKI SUPREME V1';
        let donoName = 'joao';
        try {
            const config = JSON.parse(fs.readFileSync('./database/config.json', 'utf8'));
            botName = config.NomeDoBot || botName;
            donoName = config.NomeDoDono || donoName;
        } catch(e) {}

        const menuTexto = 
`╭━━━〔 *${botName}* 〕━━━╮
┃ 👤 *Usuário:* @${pushname || 'Membro'}
┃ 👑 *Dono:* ${donoName}
┃ ⚡ *Prefixo:* ${prefix}
┃ 👥 *Chat:* ${isGroup ? 'Grupo' : 'Privado'}
╰━━━━━━━━━━━━━━━━━━━━━╯

📋 *CATEGORIAS DE COMANDOS:*

🛡️ *${prefix}menuadm*
└ Comandos de administração do grupo

👑 *${prefix}menudono*
└ Comandos exclusivos do dono

🎲 *${prefix}menucmds*
└ Comandos gerais (figurinhas, links, etc.)

⬇️ *${prefix}menudownloads*
└ Comandos de downloads

🎨 *${prefix}menuefeitos*
└ Efeitos de imagem e áudio

🤖 *${prefix}menuia*
└ Inteligência Artificial

🎬 *${prefix}menumidias*
└ Músicas e mídias

💎 *${prefix}menupremium*
└ Comandos VIP / Premium

🎮 *${prefix}menuresenha*
└ Brincadeiras e jogos

⚔️ *${prefix}menurpg*
└ Sistema de RPG

💡 *Dica:* Digite o nome da categoria para ver os comandos.
Exemplo: *${prefix}menuadm* ou *${prefix}menucmds*`;

        await reply(menuTexto, from, info);
    }
};
