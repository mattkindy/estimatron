import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import { TextDecoder } from 'util';

const client = new SecretManagerServiceClient();

const secretName = (secret: string) => ['projects', process.env.PROJECT, 'secrets', secret].join('/');
const latestSecretVersion = (secret: string) => [secretName(secret), 'versions', 'latest'].join('/');

const secrets = {
  retrieve: async (secret: string): Promise<string> => {
    const name = latestSecretVersion(secret);
    let payload;
    
    try {
      [{ payload }] = await client.accessSecretVersion({ name });
    } catch (error) {
      const message = `Error during secret access call for ${name}`;
      console.error(message, error);
      throw Error(`${message}: ${error}`);
    }

    if (!payload || !payload.data) {
      const message = `Couldn't retrieve secret ${name}`;
      console.error(message);
      throw Error(message);
    }

    if (payload.data instanceof Uint8Array) {
      try {
        return new TextDecoder().decode(payload.data);
      } catch (error) {
        const message = `Error while decoding payload for ${name}`;
        console.error(message, error);
        throw new Error(`${message}: ${error}`);
      }
    }

    return payload.data;
  }
};

export default secrets;

