import { mergeResolvers } from 'merge-graphql-schemas';
import feedResolver from './resolvers/feedResolver';
import profileResolver from './resolvers/profileResolver';

export default mergeResolvers([feedResolver, profileResolver]);
