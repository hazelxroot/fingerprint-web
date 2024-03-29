import type { Created as CreatedInt, Uploaded as UploadedInt, Submitted as SubmittedInt, Resolved as ResolvedInt, NotFound as NotFoundInt, Found as FoundInt, Done as DoneInt, Error as ErrorInt, External, SomeExternalAudio } from './Audio';
export declare type Created = External<CreatedInt>;
export declare type Uploaded = External<UploadedInt>;
export declare type Submitted = External<SubmittedInt>;
export declare type Resolved = External<ResolvedInt>;
export declare type NotFound = External<NotFoundInt>;
export declare type Found = External<FoundInt>;
export declare type Done = External<DoneInt>;
export declare type Error = External<ErrorInt>;
export declare type File = SomeExternalAudio;
export declare function isCreated(file: File): file is Created;
export declare function isCreated(file: File, exact: false): file is Created | Uploaded | Submitted | NotFound | Resolved | Found | Done;
export declare function isUploaded(file: File): file is Uploaded;
export declare function isUploaded(file: File, exact: false): file is Uploaded | Submitted | NotFound | Resolved | Found | Done;
export declare function isSubmitted(file: File): file is Submitted;
export declare function isSubmitted(file: File, exact: false): file is Submitted | NotFound | Resolved | Found | Done;
export declare function isResolved(file: File): file is Resolved;
export declare function isResolved(file: File, exact: false): file is Resolved | Found | Done;
export declare function isNotFound(file: File): file is NotFound;
export declare function isFound(file: File): file is Found;
export declare function isFound(file: File, exact: false): file is Found | Done;
export declare function isDone(file: File): file is Done;
export declare function isError(file: File): file is Error;
