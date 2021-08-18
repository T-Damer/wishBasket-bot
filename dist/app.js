"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const language_1 = require("./handlers/language");
// Setup @/ aliases for modules
require("module-alias/register");
// Config dotenv
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/../.env` });
// Dependencies
const bot_1 = require("@/helpers/bot");
const ignoreOldMessageUpdates_1 = require("@/middlewares/ignoreOldMessageUpdates");
const sendHelp_1 = require("@/handlers/sendHelp");
const i18n_1 = require("@/helpers/i18n");
const language_2 = require("@/handlers/language");
const addBasket_1 = require("@/handlers/addBasket");
const addWish_1 = require("@/handlers/addWish");
const share_1 = require("@/handlers/share");
const attachUser_1 = require("@/middlewares/attachUser");
// Middlewares
bot_1.bot.use(ignoreOldMessageUpdates_1.ignoreOldMessageUpdates);
bot_1.bot.use(attachUser_1.attachUser);
bot_1.bot.use(i18n_1.i18n.middleware(), i18n_1.attachI18N);
// Commands
bot_1.bot.command(['help', 'start'], sendHelp_1.sendHelp);
bot_1.bot.command('language', language_2.sendLanguage);
bot_1.bot.command('addBasket', addBasket_1.addBasket);
bot_1.bot.command('addWish', addWish_1.addWish);
bot_1.bot.command('share', share_1.share);
// Actions
bot_1.bot.action(language_1.localeActions, language_2.setLanguage);
// Errors
bot_1.bot.catch(console.error);
// Start bot
bot_1.bot.launch().then(() => {
    console.info(`Bot ${bot_1.bot.botInfo.username} is up and running`);
});
//# sourceMappingURL=app.js.map