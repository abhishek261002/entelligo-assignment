// ─── User Entity Types ──────────────────────────────────────────────────────

export interface UserAddress {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface UserBank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

export interface UserCompany {
  department: string;
  name: string;
  title: string;
  address: UserAddress;
}

export interface UserCrypto {
  coin: string;
  wallet: string;
  network: string;
}

export interface UserHair {
  color: string;
  type: string;
}

// Primary DummyJSON user shape
export interface DummyUser {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: UserHair;
  ip: string;
  address: UserAddress;
  macAddress: string;
  university: string;
  bank: UserBank;
  company: UserCompany;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: UserCrypto;
  role: string;
}

// JSONPlaceholder fallback shape (simpler)
export interface PlaceholderUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: { lat: string; lng: string };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

// Normalised shape used throughout the UI
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  username: string;
  avatar: string;
  role: string;
  company: string;
  department: string;
  jobTitle: string;
  city: string;
  address: string;
  postalCode: string;
  country: string;
  age?: number;
  birthDate?: string;
  bloodGroup?: string;
  // crypto / bank metadata (optional, DummyJSON only)
  crypto?: UserCrypto;
  bank?: UserBank;
  ein?: string;
  ssn?: string;
}

// ─── View & Query Types ──────────────────────────────────────────────────────

export type ViewMode = "grid" | "table";

export type SortKey = "firstName" | "lastName" | "company";
export type SortOrder = "asc" | "desc";

export interface SortConfig {
  key: SortKey;
  order: SortOrder;
}

export interface DirectoryFilters {
  search: string;
  sort: SortConfig;
  page: number;
  pageSize: number;
}

// ─── API Response Types ───────────────────────────────────────────────────────

export interface DummyJSONResponse {
  users: DummyUser[];
  total: number;
  skip: number;
  limit: number;
}

export type APISource = "dummyjson" | "jsonplaceholder";
