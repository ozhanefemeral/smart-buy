import { HouseWithDetails } from "@/components/house";

export const getHouseById = async (id: string): Promise<HouseWithDetails> => {
  setTimeout(() => {}, 1000);
  const house: HouseWithDetails = {
    id: 1,
    title: "Beautiful house",
    city: "New York",
    district: "Manhattan",
    price: 1000000,
    available: "available",
    details: {
      description: "This is a beautiful house",
      area: 200,
      bedrooms: 3,
      bathrooms: 2,
      parking: true,
      balconies: 2,
      floor: 3,
      year: 2020,
    },
  };

  return house;
};