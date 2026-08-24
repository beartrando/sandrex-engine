import AccessToken from "../../domain/common/value-objects/access-token.vo";

export interface TokenService {
    verifyAccessToken(
        token: AccessToken,
    ): UserId;
}

export default TokenService;
