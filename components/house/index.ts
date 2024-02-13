import { HouseOwner } from "../house-owner";

// TODO: Change it to type from Prisma
type HouseAvailability = "available" | "unavailable" | "soon";

export type House = {
  id: string;
  title: string;
  city: string;
  district: string;
  price: number;
  available: HouseAvailability;
};

export type HouseDetails = {
  description: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  parking: boolean;
  balconies: number;
  floor: number;
  year: number;
};

export type HouseWithDetails = House & {
  details: HouseDetails;
  owner: HouseOwner["id"];
};
