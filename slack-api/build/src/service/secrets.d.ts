declare const secrets: {
    retrieve: (secret: string) => Promise<string>;
};
export default secrets;
