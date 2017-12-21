// @flow
// Generated by https://transform.now.sh/json-to-flow-types/

export type Block = {|
  max_occupancy: number,
  photos: string,
  block_id: string,
  block_text: string,
  refundable: number,
  rack_rate: RackRate,
  refundable_until: string,
  room_id: string,
  incremental_price: RackRate[],
  breakfast_included: number,
  deposit_required: number,
  min_price: RackRate,
  name: string,
|};

export type RackRate = {|
  currency: string,
  price: string,
|};

export type RootInterface = {|
  arrival_date: string,
  hotel_text: string,
  departure_date: string,
  direct_payment: number,
  hotel_id: string,
  block: Block[],
|};