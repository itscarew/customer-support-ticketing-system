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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const server_1 = __importDefault(require("../src/server"));
const supertest_1 = __importDefault(require("supertest"));
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const url = `mongodb://localhost:27017/testing`;
    yield mongoose_1.default.connect(url, { useNewUrlParser: true });
}));
describe("Post Endpoints", () => {
    it("should create a new post", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield supertest_1.default(server_1.default).post("/user/register").send({
            name: "Zellanski",
            email: "testing@gmail.com",
            password: "zella",
            role: "basic",
        });
        if (res) {
            expect(res.body.data.name).toBeTruthy();
            expect(res.body.data.email).toBeTruthy();
            expect(res.body.data.role).toBeTruthy();
        }
        expect(res.status).toEqual(201);
        expect(res.body).toHaveProperty("data");
        expect(res.body.data).toEqual(expect.any(Object));
    }));
});
//# sourceMappingURL=user.test.js.map