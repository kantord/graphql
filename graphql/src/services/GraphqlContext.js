// @flow

import DataLoader from 'dataloader';
import IdentityDataloader from '../dataLoaders/Identity';
import createBookingLoader from '../dataLoaders/Booking';
import createAirlineLoader from '../dataLoaders/Airline';
import createRatesLoader from '../dataLoaders/Rates';
import BookingsLoader from '../dataLoaders/Bookings';
import LocationSuggestionsLoader from '../dataLoaders/LocationSuggestions';
import LocationLoader from '../dataLoaders/Location';
import FlightLoader from '../dataLoaders/Flight';
import OptionsStorage from './context/OptionsStorage';

import type { Booking } from '../types/Booking';
import type { Airline } from '../types/Flight';

export type GraphqlContextType = {|
  apiToken: ?string,
  dataLoader: {|
    airline: DataLoader<string, ?Airline | Error>,
    booking: DataLoader<number | string, Booking>,
    bookings: BookingsLoader,
    flight: FlightLoader,
    identity: IdentityDataloader,
    location: LocationLoader,
    locationSuggestions: LocationSuggestionsLoader,
    rates: DataLoader<string, ?number | Error>,
  |},
  options: OptionsStorage,
  opticsContext?: Object,
|};

export function createContext(token: ?string): GraphqlContextType {
  const bookings = new BookingsLoader(token);
  const locationSuggestions = new LocationSuggestionsLoader();
  const location = new LocationLoader(locationSuggestions);

  return {
    apiToken: token,
    dataLoader: {
      airline: createAirlineLoader(),
      booking: createBookingLoader(token, bookings),
      bookings: bookings,
      flight: new FlightLoader(location),
      identity: new IdentityDataloader(token),
      location: location,
      locationSuggestions: locationSuggestions,
      rates: createRatesLoader(),
    },
    options: new OptionsStorage(),
  };
}
