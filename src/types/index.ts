export interface VehicleInfo {
  registrationNumber: string;
  make?: string;
  model?: string;
  year?: number;
  engineSize?: number;
  fuelType?: string;
  coverStart: string;
  coverEnd: string;
}

export interface Address {
  line1: string;
  line2: string;
  town: string;
  postCode: string;
}

export interface DriverDetails {
  fullName: string;
  dateOfBirth: string;
  address: Address;
  phoneNumber: string;
}

export interface AccountInformation {
  emailAddress: string;
  password: string;
  confirmPassword: string;
}

export interface QuoteSummary {
  coverStart: string;
  coverEnd: string;
  price: string;
  vehicleDetails?: {
    make?: string;
    model?: string;
    year?: number;
  };
}

export interface InsuranceData {
  vehicleInformation: VehicleInfo;
  driverDetails: DriverDetails;
  accountInformation: AccountInformation;
  quoteSummary: QuoteSummary;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  phoneNumber?: string;
}

export type FormStep = 
  | 'vehicle-lookup'
  | 'quote'
  | 'driver-details'
  | 'account'
  | 'payment'
  | 'confirmation';