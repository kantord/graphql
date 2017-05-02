// @flow

/**
 * With these types you can work in GraphQL resolvers.
 */

export type AirportType = {
  code: string,
  name: string,
};

type TimeVariantsType = {
  utc: Date, // UTC +0
  local: Date, // UTC != 0
};

export type DepartureType = {
  when: null | TimeVariantsType, // null if doesn't exist
  where: AirportType,
};

export type ArrivalType = {
  when: null | TimeVariantsType, // null if doesn't exist
  where: AirportType,
};

export type FlightType = {
  id: string,
  arrival: ArrivalType,
  departure: DepartureType,
  legs: Array<LegType>,
};

export type BookingType = {
  id: number,
  arrival: ArrivalType,
  departure: DepartureType,
  legs: Array<LegType>,
};

export type LegType = {
  id: string,
  recheckRequired: boolean,
  flightNo: number,
  departure: DepartureType,
  arrival: ArrivalType,
  airline: string, // type
};

export type LocationType = {
  latitude: number,
  longitude: number,
};

export type PlaceType = {
  id: string,
  location: LocationType,
  numberOfAirports: number,
  population: null | number,
  name: string,
};
