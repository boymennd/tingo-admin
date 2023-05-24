export const env: any = {
  backEnd: {
    url: process.env.REACT_APP_KEYCLOAK_URL,
    timeout: process.env.REACT_APP_KEYCLOAK_TIME_OUT,
  },
  keycloak: {
    url: {
      authentication: process.env.REACT_APP_KEYCLOAK_AUTHENTICATION_URL,
    },
    timeout: process.env.REACT_APP_KEYCLOAK_TIME_OUT,
  },
};
