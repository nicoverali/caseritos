/**
 * A JwtBlacklist can host JWT Tokens that need to be invalidated but
 * did not expired yet. All hosted tokens will remain at least until they expire.
 * Once a token expire it may or may not remain in the blacklist
 *
 * For a blacklist to accept a token, the token needs to contain a
 * *exp* attribute that defines its expiration date
 */
export default interface JwtBlacklist {
  put: (token: string) => void;
  has: (token: string) => Promise<boolean>;
}

export type ExpirableJwt = {
  exp?: number;
};
