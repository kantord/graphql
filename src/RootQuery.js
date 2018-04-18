// @flow

import { GraphQLObjectType } from 'graphql';

import AllBookings from './booking/queries/AllBookings';
import AllFlights from './flight/queries/AllFlights';
import GeoIP from './geoip/queries/geoIP';
import AllAvailableHotels from './hotel/queries/AllAvailableHotels';
import AvailableHotel from './hotel/queries/AvailableHotel';
import AllLocations from './location/queries/AllLocations';
import Location from './location/queries/Location';
import AllSubLocations from './location/queries/AllSubLocations';
import Booking from './booking/queries/Booking';
import CurrentUser from './identity/queries/CurrentUser';
import Hotel from './hotel/queries/Hotel';
import HotelCities from './hotel/queries/HotelCities';
import AllFAQs from './FAQ/queries/AllFAQs';
import AllFAQCategories from './FAQ/queries/AllFAQCategories';
import FAQCategory from './FAQ/queries/FAQCategory';
import FAQArticle from './FAQ/queries/FAQArticle';

export default new GraphQLObjectType({
  name: 'RootQuery',
  description: 'Root Query',
  fields: {
    allBookings: AllBookings,
    allFlights: AllFlights,
    geoIP: GeoIP,
    allAvailableHotels: AllAvailableHotels,
    availableHotel: AvailableHotel,
    allLocations: AllLocations,
    location: Location,
    allSubLocations: AllSubLocations,
    booking: Booking,
    currentUser: CurrentUser,
    hotel: Hotel,
    hotelCities: HotelCities,
    allFAQs: AllFAQs,
    allFAQCategories: AllFAQCategories,
    FAQCategory: FAQCategory,
    FAQArticle: FAQArticle,
  },
});
