"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBasket = void 0;
// 1. Send a message with questions
function addBasket(ctx) {
    return ctx.replyWithHTML(ctx.i18n.t('addBasket'));
}
exports.addBasket = addBasket;
// 2. User completes the fields
// 3. This information stores in object
// 4. Compare if there's same basket in db
// 5. /POST new basket object in DB
//# sourceMappingURL=addBasket.js.map