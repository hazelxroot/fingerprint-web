import { STATUS } from './constants';
export interface Created {
    id: string;
    username: string;
    status: STATUS.CREATED;
    created: number;
}
export interface Uploaded extends Omit<Created, 'status'> {
    status: STATUS.UPLOADED;
    uploaded: number;
}
export interface Submitted extends Omit<Uploaded, 'status'> {
    status: STATUS.SUBMITTED;
    submitted: number;
}
export interface Resolved extends Omit<Submitted, 'status'> {
    status: STATUS.RESOLVED;
    resolved: number;
    isrc: string;
}
export interface NotFound extends Omit<Submitted, 'status'> {
    status: STATUS.NOT_FOUND;
    notFound: number;
}
export interface Found extends Omit<Resolved, 'status'> {
    status: STATUS.FOUND;
    found: number;
    tags: Record<string, string[]>;
}
export interface Done extends Omit<Found, 'status'> {
    status: STATUS.DONE;
    done: number;
}
export interface Error extends Partial<Omit<Done, keyof Created>>, Omit<Created, 'status'> {
    status: STATUS.ERROR;
    error: number;
    reason: string;
}
export interface Deleted extends Partial<Omit<Error, keyof Created>>, Omit<Created, 'status'> {
    status: STATUS.DELETED;
    deleted: number;
}
export declare type SomeAudio = Created | Uploaded | Submitted | Resolved | NotFound | Found | Done | Error | Deleted;
export declare type External<Audio extends SomeAudio> = Omit<Audio, 'id' | 'username'> & {
    name: string;
};
export declare type SomeExternalAudio = External<SomeAudio>;
export interface FolderList {
    folders: string[];
}
export interface File {
    file: SomeExternalAudio;
}
export interface FileList {
    files: SomeExternalAudio[];
}
export declare function id(username: string, file: string): string;
export declare function toExternal({ id, username, ...rest }: SomeAudio): SomeExternalAudio;
export declare function get(id: string): Promise<SomeAudio | undefined>;
export declare function getFolder(username: string, folder: string): Promise<SomeAudio[]>;
export declare function createJob({ id, uploaded }: Uploaded | Submitted): {
    callback: string;
    download: string;
};
export declare function now(): number;
export declare function isCreated(audio: SomeAudio): audio is Created;
export declare function create(username: string, file: string, write?: boolean): Promise<Created>;
export declare function isUploaded(audio: SomeAudio): audio is Uploaded;
export declare function setUploaded(entry: Created): Promise<Uploaded>;
export declare function isSubmitted(audio: SomeAudio): audio is Submitted;
export declare function setSubmitted(entry: Uploaded | Submitted): Promise<Submitted>;
export declare function isResolved(audio: SomeAudio): audio is Resolved;
export declare function resolve(entry: Submitted, isrc: string): Promise<Resolved>;
export declare function isNotFound(audio: SomeAudio): audio is NotFound;
export declare function setNotFound(entry: Submitted): Promise<NotFound>;
export declare function isFound(audio: SomeAudio): audio is Found;
export declare function setFound(entry: Resolved, tags: Record<string, string[]>, writeTags: (file: string, tags: Record<string, string[]>) => Promise<void>): Promise<Found>;
export declare function isDone(audio: SomeAudio): audio is Done;
export declare function setDone(entry: Found): Promise<Done>;
export declare function path(audio: SomeAudio): string;
export declare function isDeleted(audio: SomeAudio): audio is Deleted;
export declare function deleteAudio(entry: SomeAudio): Promise<Deleted>;
export declare function isError(audio: SomeAudio): audio is Error;
export declare function error(entry: SomeAudio, reason: string): Promise<Error>;
