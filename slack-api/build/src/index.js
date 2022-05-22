"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.http = void 0;
const http = (req, res) => {
    console.log('Running typescript version');
    res.status(200).send('Hello World');
};
exports.http = http;
//# sourceMappingURL=index.js.map