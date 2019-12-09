import profileQuery from '../queries/profileQuery';

const getProfile = (_, { username }) => {
  return profileQuery(username)
    .then(({ data: { data } }) => data)
    .catch(console.log);
};

export default {
  Query: {
    getProfile,
  },
};
