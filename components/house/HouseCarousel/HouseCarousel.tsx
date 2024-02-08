import { House } from "@/components/house";
import { HouseCard } from "@/components/house/HouseCard";
import { CarouselBase } from "../../shared/carousels/CarouselBase";

interface HouseCarouselProps {
  endpoint: string;
}

const dummy_houses: House[] = [
  {
    id: 1,
    title: "Beautiful House",
    city: "Warsaw",
    district: "Mokotów",
    price: 100000,
    available: "available",
  },
  {
    id: 2,
    title: "Beautiful House",
    city: "Poznań",
    district: "Jeżyce",
    price: 100000,
    available: "soon",
  },
  {
    id: 3,
    title: "Beautiful House",
    city: "Kraków",
    district: "Kazimierz",
    price: 100000,
    available: "unavailable",
  },
  {
    id: 4,
    title: "Beautiful House",
    city: "Gdańsk",
    district: "Wrzeszcz",
    price: 100000,
    available: "available",
  },
  {
    id: 5,
    title: "Beautiful House",
    city: "Wrocław",
    district: "Stare Miasto",
    price: 100000,
    available: "available",
  },
  {
    id: 6,
    title: "Beautiful House",
    city: "Kraków",
    district: "Kazimierz",
    price: 100000,
    available: "unavailable",
  },
  {
    id: 7,
    title: "Beautiful House",
    city: "Gdańsk",
    district: "Wrzeszcz",
    price: 100000,
    available: "available",
  },
  {
    id: 8,
    title: "Beautiful House",
    city: "Wrocław",
    district: "Stare Miasto",
    price: 100000,
    available: "available",
  },
  {
    id: 9,
    title: "Beautiful House",
    city: "Kraków",
    district: "Kazimierz",
    price: 100000,
    available: "unavailable",
  },
  {
    id: 10,
    title: "Beautiful House",
    city: "Gdańsk",
    district: "Wrzeszcz",
    price: 100000,
    available: "available",
  },
  {
    id: 11,
    title: "Beautiful House",
    city: "Wrocław",
    district: "Stare Miasto",
    price: 100000,
    available: "available",
  },
  {
    id: 12,
    title: "Beautiful House",
    city: "Kraków",
    district: "Kazimierz",
    price: 100000,
    available: "unavailable",
  },
  {
    id: 13,
    title: "Beautiful House",
    city: "Gdańsk",
    district: "Wrzeszcz",
    price: 100000,
    available: "available",
  },
];

export const HouseCarousel: React.FC<HouseCarouselProps> = ({ endpoint }) => {
  // TODO: Fetch houses from the endpoint
  // use react-query to fetch the data
  // add a loading state and error state

  const formattedHouses = dummy_houses.map((house) => ({ house }));

  return (
    <CarouselBase
      items={formattedHouses}
      title="Houses"
      slideItem={HouseCard}
      slidesPerView={4}
    />
  );
};
