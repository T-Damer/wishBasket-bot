"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachI18N = exports.i18n = void 0;
const dirtyI18N = require('telegraf-i18n');
exports.i18n = new dirtyI18N({
    directory: `${__dirname}/../../locales`,
    defaultLanguage: 'en',
    sessionName: 'session',
    useSession: false,
    allowMissing: false,
});
function attachI18N(ctx, next) {
    const anyI18N = ctx.i18n;
    anyI18N.locale(ctx.dbuser.language);
    return next();
}
exports.attachI18N = attachI18N;
//# sourceMappingURL=i18n.js.map