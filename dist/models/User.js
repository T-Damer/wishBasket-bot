"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.findUser = exports.User = void 0;
const typegoose_1 = require("@typegoose/typegoose");
class User {
}
__decorate([
    typegoose_1.prop({ required: true, index: true, unique: true }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typegoose_1.prop({ required: true, default: 'en' }),
    __metadata("design:type", String)
], User.prototype, "language", void 0);
exports.User = User;
// Get User model
const UserModel = typegoose_1.getModelForClass(User, {
    schemaOptions: { timestamps: true },
});
// Get or create user
function findUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = yield UserModel.findOne({ id });
        if (!user) {
            // Try/catch is used to avoid race conditions
            try {
                user = yield new UserModel({ id }).save();
            }
            catch (err) {
                user = yield UserModel.findOne({ id });
            }
        }
        return user;
    });
}
exports.findUser = findUser;
//# sourceMappingURL=User.js.map