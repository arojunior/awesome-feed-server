import feedQuery from '../queries/feedQuery';
import transformDataForFeed from '../../services/feedActions';

const getFeed = (_, { username, cursor }) => {
  return feedQuery({ username, cursor })
    .then(({ data: { data } }) => {
      const { endCursor, hasNextPage  } = data.user.following.pageInfo;
      return {
        cursor: endCursor,
        hasNextPage,
        activity: transformDataForFeed(data),
      };
    })
    .catch(e => console.log(e));
};

export default {
  Query: {
    getFeed,
  },
};
