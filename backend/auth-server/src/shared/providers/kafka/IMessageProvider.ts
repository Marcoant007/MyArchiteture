export default interface IMessageProvider {
    setServer(server: string);
    setPort(port: number);
    connect();
    createProducer();
    createConsumer(topics, options);

    addSessionRequest(key: string, session: IMesageRequest);
    getSessionRequest(key: string): IMesageRequest;
    removeSessionRequest(key: string): void;
}

export interface IMesageRequest {
    resolve(data: any);
    reject(data: any);
}