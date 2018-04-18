// @flow
import { GraphQLObjectType, GraphQLString, GraphQLFloat } from 'graphql';

export type GeoIP = {|
  isoCountryCode: string,
  latitude: number,
  longitude: number,
|};

const GeoIPType = new GraphQLObjectType({
  name: 'GeoIP',
  fields: {
    isoCountryCode: {
      type: GraphQLString,
      description: 'ISO country code',
    },
    latitude: {
      type: GraphQLFloat,
      description: 'Latitude',
    },
    longitude: {
      type: GraphQLFloat,
      description: 'Longitude',
    },
  },
});

export default GeoIPType;
