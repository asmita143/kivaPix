export interface Location {
    name: string;  // change from '' to string
    coordinates: {
      lat: number;
      lng: number;
    };
  }


export interface FormData {
    name: string;
    date: string;
    time:string;
    participants:number;
    contractType:string;
    description: string;
    location: Location;
    coverPhoto: File | null;
    hostFirstName: string;
    hostLastName: string;
    hostEmail: string;
    hostPhone: string;
    hostCountry: string;
    hostStreetAddress: string;
    hostCity: string;
    hostPostalCode: string;
  }