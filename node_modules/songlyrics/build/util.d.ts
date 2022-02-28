export declare function request(url: string): Promise<string>;
export declare function getTimestamps(): number;
export declare function saveDumpFile(name: string, raw: string): void;
export declare function spacingLyrics(lyrics: string): string;
export declare function chunkArray<T>(arr: T[], size: number): T[][];
export declare function searchDuckduckgo(query: string): Promise<string>;
export declare const randomUserAgent: string;
