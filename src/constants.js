export const HTTP_STATUS = {
  NOT_AUTHORIZED: 401,
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CREATED: 201,
};

export const isProduction = process.env.NODE_ENV === `production`;
export const SERVER_PORT = process.env.PORT || 3001;
export const GITHUB_GRAPHQL = `https://api.github.com/graphql`;
export const GITHUB_TOKEN = `378a922ba0f54c541a4281e8519020084373d0b1`;
