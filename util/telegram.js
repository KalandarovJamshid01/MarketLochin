const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.TELEGRAM); // Bot tokeni

bot.start((ctx) => {
  console.log(`Botga yozgan foydalanuvchi: ${ctx.chat.id}`);
  ctx.reply('Bot ishga tushdi!');
});

bot.command('ping', (ctx) => ctx.reply('Pong!'));

// Barcha xabarlarni logga yozish
bot.on('message', (ctx) => {
  console.log(ctx.chat);
});

// Botni ishga tushirish
bot
  .launch()
  .then(() => console.log('Bot ishga tushdi'))
  .catch((err) => console.error('Botni ishga tushirishda xatolik:', err));

const Send = (message, options = {}) => {
  return bot.telegram.sendMessage(process.env.MARKET_GROUP, message, options);
};

module.exports = { Send, bot };
