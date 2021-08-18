"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.share = void 0;
// 1. Send a message with questions
function share(ctx) {
    return ctx.replyWithHTML(ctx.i18n.t('share'));
}
exports.share = share;
//# sourceMappingURL=share.js.map