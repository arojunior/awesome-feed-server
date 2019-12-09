import axios from 'axios';
import { GITHUB_GRAPHQL, GITHUB_TOKEN } from '../../constants';

const getProfileQuery = username => `query {
  user(login: "${username}") {
      avatarUrl
      login
      followers {
        totalCount
      }
      following {
        totalCount
      }
      starredRepositories {
        totalCount
      }
  }
}`;

export default username => {
  return axios({
    method: `POST`,
    url: GITHUB_GRAPHQL,
    data: { query: getProfileQuery(username) },
    headers: {
      authorization: `Bearer ${GITHUB_TOKEN}`,
    },
  });
};
