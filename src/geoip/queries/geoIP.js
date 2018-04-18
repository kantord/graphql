// @flow
import { GraphQLNonNull, GraphQLString } from 'graphql';

import GeoIPType from '../types/outputs/GeoIPType';
import getGeoIP from '../apis/geoip';

const geoIPQuery = {
  type: GeoIPType,
  description: 'Geography info by an IP address',
  args: {
    ip: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: (_: *, { ip }: *) => getGeoIP(ip),
};

export default geoIPQuery;
