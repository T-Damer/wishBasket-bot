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
exports.attachUser = void 0;
const models_1 = require("@/models");
function attachUser(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        ctx.dbuser = yield models_1.findUser(ctx.from.id);
        return next();
    });
}
exports.attachUser = attachUser;
//# sourceMappingURL=attachUser.js.map