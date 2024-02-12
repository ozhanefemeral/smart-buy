// TODO: Change it to type from Prisma
type HouseAvailability = "available" | "unavailable" | "soon";

export type House = {
  id: number;
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
};
