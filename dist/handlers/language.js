"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLanguage = exports.sendLanguage = exports.localeActions = void 0;
const telegraf_1 = require("telegraf");
const fs_1 = require("fs");
const js_yaml_1 = require("js-yaml");
exports.localeActions = localesFiles().map((file) => file.split('.')[0]);
function sendLanguage(ctx) {
    return ctx.reply(ctx.i18n.t('language'), languageKeyboard());
}
exports.sendLanguage = sendLanguage;
function setLanguage(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = ctx.dbuser;
        if ('data' in ctx.callbackQuery) {
            user.language = ctx.callbackQuery.data;
            user = yield user.save();
            const message = ctx.callbackQuery.message;
            const anyI18N = ctx.i18n;
            anyI18N.locale(ctx.callbackQuery.data);
            yield ctx.telegram.editMessageText(message.chat.id, message.message_id, undefined, ctx.i18n.t('language_selected'), { parse_mode: 'HTML' });
        }
    });
}
exports.setLanguage = setLanguage;
function languageKeyboard() {
    const locales = localesFiles();
    const result = [];
    locales.forEach((locale, index) => {
        const localeCode = locale.split('.')[0];
        const localeName = js_yaml_1.safeLoad(fs_1.readFileSync(`${__dirname}/../../locales/${locale}`, 'utf8')).name;
        if (index % 2 == 0) {
            if (index === 0) {
                result.push([telegraf_1.Markup.button.callback(localeName, localeCode)]);
            }
            else {
                result[result.length - 1].push(telegraf_1.Markup.button.callback(localeName, localeCode));
            }
        }
        else {
            result[result.length - 1].push(telegraf_1.Markup.button.callback(localeName, localeCode));
            if (index < locales.length - 1) {
                result.push([]);
            }
        }
    });
    return telegraf_1.Markup.inlineKeyboard(result);
}
function localesFiles() {
    return fs_1.readdirSync(`${__dirname}/../../locales`);
}
//# sourceMappingURL=language.js.map