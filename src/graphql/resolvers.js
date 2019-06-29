import { mergeResolvers } from 'merge-graphql-schemas';
import feedResolver from './resolvers/feedResolver';

export default mergeResolvers([feedResolver]);
