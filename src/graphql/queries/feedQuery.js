import axios from 'axios';
import { GITHUB_GRAPHQL, GITHUB_TOKEN } from '../../constants';

const getTimelineQuery = ({ username, cursor = null }) => `query {
  user(login: "${username}") {
    following(last: 10, after: ${cursor}) {
      edges {
        cursor
      }
      nodes {
        login
        name
        avatarUrl
        watching(last: 2) {
          nodes {
            description
            url
            nameWithOwner
            createdAt
          }
        }          
        issueComments(last: 3) {
          nodes {
            repository {
              name
              nameWithOwner
              url
            }
            issue {
              number
              title
            }
            bodyHTML
            url
            createdAt
          }
        }
        pullRequests(last: 3) {
          nodes {
            repository {
              name
              nameWithOwner
              url
            }
            bodyHTML
            title
            url
            number
            createdAt
          }
        }
        commitComments(last: 3) {
          nodes {
            repository {
              name
              nameWithOwner
              url
            }
            bodyHTML
            url
            createdAt
          }
        }
        starredRepositories(last: 3) {
          nodes {
            nameWithOwner
            createdAt
            url
            description
            stargazers {
              totalCount
            }            
            languages(first: 5) {
              nodes {
                name
              }
            }
          }
        }
      }
    }
  }
}`;

export default ({ username, cursor }) => {
  return axios({
    method: `POST`,
    url: GITHUB_GRAPHQL,
    data: { query: getTimelineQuery({ username, cursor }) },
    headers: {
      authorization: `Bearer ${GITHUB_TOKEN}`,
    },
  });
};
