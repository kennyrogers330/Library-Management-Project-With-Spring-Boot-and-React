export const oktaConfig = {
    clientId: '0oa9x2bz00KvGE2uJ5d7',
    issuer: 'https://dev-37780134.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true
}