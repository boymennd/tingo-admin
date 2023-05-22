export const env: any = {
  keycloak: {
    url: {
      authentication: process.env.REACT_APP_KEYCLOAK_AUTHENTICATION_URL,
    },
    timeout: process.env.REACT_APP_KEYCLOAK_TIME_OUT,
  },
};
