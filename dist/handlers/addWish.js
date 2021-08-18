"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addWish = void 0;
// 1. Send a message with questions
function addWish(ctx) {
    return ctx.replyWithHTML(ctx.i18n.t('addWish'));
}
exports.addWish = addWish;
//# sourceMappingURL=addWish.js.map