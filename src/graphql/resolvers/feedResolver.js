import { last } from 'ramda';
import feedQuery from '../queries/feedQuery';
import transformDataForFeed from '../../services/feedActions';

const getFeed = (_, { username }) => {
  return feedQuery({ username })
    .then(({ data: { data } }) => {
      const { cursor } = last(data.user.following.edges);
      return {
        cursor,
        activity: transformDataForFeed(data),
      };
    })
    .catch(console.log);
};

export default {
  Query: {
    getFeed,
  },
};
