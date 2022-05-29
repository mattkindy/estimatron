"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slack = void 0;
const bolt_1 = require("@slack/bolt");
const secrets_1 = __importDefault(require("./service/secrets"));
const app = async () => new bolt_1.App({
    token: await secrets_1.default.retrieve('SLACK_BOT_TOKEN'),
    socketMode: true,
    appToken: await secrets_1.default.retrieve('SLACK_APP_TOKEN'),
});
const slack = async (req, res) => {
    console.log('Running typescript version');
    await app();
    res.status(200).send('Hello World');
};
exports.slack = slack;
//# sourceMappingURL=index.js.map