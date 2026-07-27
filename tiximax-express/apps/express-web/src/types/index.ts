// Domain types transcribed from docs §4 (Mô hình dữ liệu).
// TYPES ONLY — no business logic. Field names kept in English to match the API.

export type CountryIso = 'ID' | 'JP' | 'VN' | 'PH' | 'KR' | 'SG';
export type Currency = 'USD' | 'JPY' | 'IDR' | 'VND' | 'PHP';
export type DialCode = '+62' | '+81' | '+84' | '+63' | '+82' | '+65' | '+44' | '+1';

/** who a chat message is from (docs §4.6). */
export type MessageAuthor = 'agent' | 'me' | 'system';

/** Derived status label from the numeric stage (docs §4.7). */
export type OrderStatus =
  | 'Awaiting confirmation'
  | 'Confirmed'
  | 'Picked up'
  | 'In transit'
  | 'Delivered';

export interface Money {
  amount: number;
  currency: Currency;
}

/** pickup or delivery party — address + contact (docs §4.3). */
export interface Party {
  address: string;
  addressSub?: string;
  postal?: string;
  name: string;
  phone: string;
  dialCode: DialCode;
  note?: string;
  selected: boolean;
}

export interface Photo {
  url: string;
  name?: string;
}

/** a package/item within an order (docs §4.4). */
export interface Item {
  contents: string;
  estWeight?: number;
  actualWeight?: number;
  fragile: boolean;
  battery: boolean;
  photos: Photo[];
}

export interface QuoteLine {
  label: string;
  value: Money;
}

/** price estimate breakdown (docs §4.5). */
export interface Quote {
  baseFee: Money;
  ratePerKg: Money;
  chargeableWeight: number;
  fragileFee: Money;
  batteryFee: Money;
  lines: QuoteLine[];
  total: Money;
  isEstimate: boolean;
}

export interface Attachment {
  name: string;
  size: number;
  isImage: boolean;
  url: string;
  ext: string;
}

export interface Message {
  who: MessageAuthor;
  text: string;
  time: string;
  attachments?: Attachment[];
  orderCardId?: string;
}

export interface TrackingEvent {
  stage: number;
  label: string;
  at?: string;
  state: 'done' | 'current' | 'upcoming';
}

/** the central shipment entity (docs §4.2). */
export interface Order {
  id: string; // 12-digit tracking code, displayed TXM-4-4-4
  customerId?: string;
  originCountry: CountryIso;
  destCountry: CountryIso;
  pickup: Party;
  delivery: Party;
  items: Item[];
  quote: Quote;
  finalPrice?: Money;
  stage: number;
  status: OrderStatus;
  currency: Currency;
  bookedAt: string;
  createdAt?: string;
  updatedAt?: string;
}

/** reference data for a supported country (docs §4.8). */
export interface Country {
  iso: CountryIso;
  name: string;
  city: string;
  airportCode: string;
  dialCode: DialCode;
  currency: Currency;
}

/** customer profile — proposed, not in prototype (docs §4.9). */
export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  savedAddresses: Party[];
  defaultCurrency: Currency;
  locale: 'vi' | 'ja' | 'en';
}
