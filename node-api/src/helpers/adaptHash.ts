/**
 * Receives a bcrypt hash and adapts it to the bcrypt library.
 * This involves replacing '2y' and '2x' prefix for a '2b' prefix.
 *
 * @param hash Original hash
 * @returns Hash adapted to bcrypt library
 */
export default function adaptHash(hash: string): string {
  return hash.replace(/^\$2[yx]\$/, '$2b$');
}
