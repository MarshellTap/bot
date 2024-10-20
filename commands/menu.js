const fs = require("fs");
const path = require("path");
const { Markup } = require("telegraf");
const config = require("../config.js");

module.exports = async (ctx, affiliate) => {
  const message = fs.readFileSync(
    path.resolve(__dirname, "../messages/welcome.txt"),
    "UTF-8"
  );
  let gameDomain = config.GAME_DOMAIN
  if (affiliate) {
    gameDomain += "?affiliate=" + affiliate
  }
  return ctx.replyWithPhoto("https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Example_image.svg/600px-Example_image.svg.png", {
    caption: message,
    parse_mode: "HTML",
    ...Markup.inlineKeyboard([
      [
        Markup.button.webApp(
          "🚀 Start to play",
            gameDomain
        ),
      ],
      [Markup.button.url("Join community", config.TG_COMMUNITY)],
    ]),
  });
};
