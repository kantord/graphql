// @flow

import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import FAQArticle, { type FAQArticleType } from './FAQArticle';
import { globalIdField } from '../../../common/services/OpaqueIdentifier';

export type FAQCategoryType = {|
  id: number,
  title: string,
  subcategories: FAQCategoryType[],
  FAQs: FAQArticleType[],
|};

const FAQCategory = new GraphQLObjectType({
  name: 'FAQCategory',
  fields: () => ({
    id: globalIdField('FAQCategory', ({ id }: FAQCategoryType) => String(id)),
    title: {
      type: GraphQLString,
      description: 'Title of the FAQ category',
      resolve: ({ title }: FAQCategoryType) => title,
    },
    subcategories: {
      type: new GraphQLList(FAQCategory),
      description: 'List of subcategories',
      resolve: ({ subcategories }: FAQCategoryType) => subcategories,
    },
    FAQs: {
      type: new GraphQLList(FAQArticle),
      description: 'List of FAQ articles',
      resolve: ({ FAQs }: FAQCategoryType) => FAQs,
    },
  }),
});

export default FAQCategory;
