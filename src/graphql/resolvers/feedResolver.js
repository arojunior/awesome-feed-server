import { last } from 'ramda';
import feedQuery from '../queries/feedQuery';
import transformDataForFeed from '../../services/feedActions';

const getFeed = (_, { username, cursor }) => {
  return feedQuery({ username, cursor })
    .then(({ data: { data } }) => {
      const { cursor: lastCursor } = last(data.user.following.edges);
      return {
        cursor: lastCursor,
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
