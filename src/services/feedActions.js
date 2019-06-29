import { pipe, map, flatten, sort, descend, prop, path } from 'ramda';

const mergeProfileWithActivities = ({ profile, activities, type }) => {
  return activities.map(activity => ({
    ...profile,
    ...activity,
    type,
    stargazers: path([`stargazers`, `totalCount`], activity),
    languages: path([`languages`, `nodes`], activity),
  }));
};

const mergeAllUsersActivities = ({
  login,
  name,
  avatarUrl,
  commitComments,
  issueComments,
  pullRequests,
  starredRepositories,
}) => {
  const profile = {
    login,
    name,
    avatarUrl,
  };

  return [
    mergeProfileWithActivities({ profile, activities: commitComments.nodes, type: `PushEvent` }),
    mergeProfileWithActivities({ profile, activities: issueComments.nodes, type: `IssueComment` }),
    mergeProfileWithActivities({ profile, activities: pullRequests.nodes, type: `PullRequest` }),
    mergeProfileWithActivities({
      profile,
      activities: starredRepositories.nodes,
      type: `Repository`,
    }),
  ];
};

const getUsersWithActivities = pipe(
  map(mergeAllUsersActivities),
  flatten,
);

const sortByLast = pipe(sort(descend(prop(`createdAt`))));

const getFollowingList = activity => path([`user`, `following`, `nodes`], activity) || [];

export default pipe(
  getFollowingList,
  getUsersWithActivities,
  sortByLast,
);
