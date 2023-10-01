export interface IGoogleAddress {
  address_components: IGoogleAddressComponent[];
  formatted_address?: string;
  geometry: IGoogleGeometry;
  place_id: string;
  plus_code: IGooglePlusCode;
  types: string[];
}

export interface IGoogleAddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export interface IGoogleGeometry {
  location: IGoogleLocation;
  location_type: string;
  viewport: Viewport;
}

export interface IGoogleLocation {
  lat: number;
  lng: number;
}

export interface Viewport {
  northeast: Northeast;
  southwest: Southwest;
}

export interface Northeast {
  lat: number;
  lng: number;
}

export interface Southwest {
  lat: number;
  lng: number;
}

export interface IGooglePlusCode {
  compound_code: string;
  global_code: string;
}
