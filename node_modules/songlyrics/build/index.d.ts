import { Lyrics } from './types';
declare function songlyrics(title: string): Promise<Lyrics>;
export { Lyrics };
export default songlyrics;
