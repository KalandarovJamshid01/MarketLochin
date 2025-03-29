const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.TELEGRAM);

const Send = (chat, message) => {
  bot.telegram.sendMessage(chat, message);
};

bot.use((ctx) => {
  console.log(ctx.message);
});
bot.start((ctx) =>
  ctx.reply(
    'Assalamu Aleykum! \nEximErp kompaniyasini rasmiy botiga xush kelibsiz!'
  )
);

module.exports = { Send, bot };
