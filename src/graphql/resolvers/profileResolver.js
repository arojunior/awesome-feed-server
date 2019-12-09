import profileQuery from '../queries/profileQuery';

const getProfile = (_, { username }) => {
  return profileQuery(username)
    .then(({ data: { data } }) => ({
      avatarUrl: data.user.avatarUrl,
      login: data.user.login,
      followers: data.user.followers.totalCount,
      following: data.user.following.totalCount,
      starredRepositories: data.user.starredRepositories.totalCount,
    }))
    .catch(console.log);
};

export default {
  Query: {
    getProfile,
  },
};
