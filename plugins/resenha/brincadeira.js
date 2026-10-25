export default {
    name: 'brinks',
    description: 'Exemplo de comando de resenha',
    category: 'resenha',
    aliases: ['brincar'],
    async execute({ from, info, reply, sender }) {
        reply(`🎮 Modo resenha ativado! Divirta-se @${sender.split('@')[0]}!`);
    }
};