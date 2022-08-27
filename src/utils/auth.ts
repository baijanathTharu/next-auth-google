const GOOGLE_AUTHORIZATION_URL =
  'https://accounts.google.com/o/oauth2/v2/auth?' +
  new URLSearchParams({
    prompt: 'consent',
    access_type: 'offline',
    response_type: 'code',
  });

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
export async function refreshAccessToken({
  token,
  clientCred,
}: {
  token: {
    refreshToken?: string;
  };
  clientCred: {
    clientId: string;
    clientSecret: string;
  };
}) {
  try {
    const { clientId, clientSecret } = clientCred;
    const { refreshToken } = token;

    const url =
      'https://oauth2.googleapis.com/token?' +
      new URLSearchParams({
        clientId,
        clientSecret,
        grant_type: 'refresh_token',
        refresh_token: refreshToken || '',
      });

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_at * 1000,
      refreshToken: refreshedTokens.refresh_token ?? refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}
