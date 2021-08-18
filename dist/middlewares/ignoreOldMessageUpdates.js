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
exports.ignoreOldMessageUpdates = void 0;
function ignoreOldMessageUpdates(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (ctx.updateType === 'message') {
            if (new Date().getTime() / 1000 - ctx.message.date < 5 * 60) {
                return next();
            }
            else {
                console.log(`Ignoring message from ${ctx.from.id} at ${ctx.chat.id} (${new Date().getTime() / 1000}:${ctx.message.date})`);
            }
        }
        else {
            return next();
        }
    });
}
exports.ignoreOldMessageUpdates = ignoreOldMessageUpdates;
//# sourceMappingURL=ignoreOldMessageUpdates.js.map