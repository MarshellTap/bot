const { Telegraf } = require("telegraf");
/* Commands */
const menu = require("./commands/menu");
/* Other */
const config = require("./config.js")

const bot = new Telegraf(config.BOT_TOKEN);

bot.telegram.setWebhook("", {
    drop_pending_updates: true,
});

bot.telegram.setMyCommands([
    {
        command: "start",
        description: "Start bot",
    },
]);

bot.use((ctx, next) => {
    if (ctx.from === undefined || ctx.chat === undefined) return;
    if (ctx.update !== undefined && ctx.update.callback_query !== undefined) {
        if (ctx.update.callback_query.data === "none") return next();
    }
    return ctx.from.id === ctx.chat.id && next();
});

bot.start(async (ctx) => {
    const affiliateCode = ctx.message.text.replace("/start", "").slice(1);
    return await menu(ctx, affiliateCode);
});

bot.launch()

console.log('Telegram bot started!')