// @flow

import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';
import { toGlobalId } from '../services/OpaqueIdentifier';
import type { IdentityType } from '../Entities';

export default new GraphQLObjectType({
  name: 'Identity',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: ({ userId }: IdentityType): string =>
        toGlobalId('identity', userId),
    },

    databaseId: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ userId }: IdentityType): string => userId,
    },

    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Raw input by user, use "login" if you want normalized email.',
      resolve: ({ email }: IdentityType): string => email,
    },

    emailVerified: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: ({ emailVerified }: IdentityType): boolean => emailVerified,
    },

    firstName: {
      type: GraphQLString,
      resolve: ({ firstName }: IdentityType): string => firstName,
    },

    lastName: {
      type: GraphQLString,
      resolve: ({ lastName }: IdentityType): string => lastName,
    },

    login: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Use this in API calls. It is email but normalized.',
      resolve: ({ login }: IdentityType): string => login,
    },
  },
});
