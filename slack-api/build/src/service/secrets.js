"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const secret_manager_1 = require("@google-cloud/secret-manager");
const util_1 = require("util");
const client = new secret_manager_1.SecretManagerServiceClient();
const secretName = (secret) => ['projects', process.env.PROJECT, 'secrets', secret].join('/');
const latestSecretVersion = (secret) => [secretName(secret), 'versions', 'latest'].join('/');
const secrets = {
    retrieve: async (secret) => {
        const name = latestSecretVersion(secret);
        console.log(`Retrieving ${name} secret`);
        const [{ payload }] = await client.accessSecretVersion({ name });
        if (!payload || !payload.data) {
            const message = `Couldn't retrieve secret ${name}`;
            console.error(message);
            throw Error(message);
        }
        if (payload.data instanceof Uint8Array) {
            return new util_1.TextDecoder().decode(payload.data);
        }
        return payload.data;
    }
};
exports.default = secrets;
//# sourceMappingURL=secrets.js.map