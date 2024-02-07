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
