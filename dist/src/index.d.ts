interface Config {
    token: string;
    apiUrl: string;
}
declare type UserConfig = Pick<Config, 'token'> & Partial<Omit<Config, 'token'>>;
export * from '../shared/is';
export { STATUS } from '../shared/constants';
export type { UserConfig as Config };
export default class MusicubeFingerprintingWeb {
    config: Config;
    constructor({ token, apiUrl, }: UserConfig);
    upload(file: File & {
        overwrite?: boolean;
    }, progress?: (uploaded: number, total: number) => void): Promise<string>;
    folders(): Promise<string[]>;
    files(folder: string): Promise<import("../shared/Audio").SomeExternalAudio[]>;
    file(file: string): Promise<import("../shared/Audio").SomeExternalAudio>;
    delete(file: string): Promise<void>;
    resubmit(file: string): Promise<void>;
    downloadLink(file: string): Promise<string>;
}
