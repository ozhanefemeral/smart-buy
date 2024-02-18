import { Post, PostCard } from "@/components/post/";
import { CarouselBase } from "@/components/shared/carousels/CarouselBase";

interface PostCarouselProps {
  endpoint: string;
}

const dummyPosts: Post[] = [
  {
    id: "123-asd",
    title: "House 1",
    thumbnail:
      "https://smart-buy-bucket.s3.eu-central-1.amazonaws.com/seed-home-thumbnail.webp",
    description: "A beautiful house",
    price: 250000,
    createdAt: new Date(),
    updatedAt: new Date(),
    images: [],
    ownerId: "123",
  },
  {
    id: "987-qwe",
    title: "Car 1",
    thumbnail:
      "https://smart-buy-bucket.s3.eu-central-1.amazonaws.com/seed-car-thumbnail.webp",
    description: "A beautiful car",
    price: 50000,
    createdAt: new Date(),
    updatedAt: new Date(),
    images: [],
    ownerId: "123",
  },
  {
    id: "456-zxc",
    title: "Phone 1",
    thumbnail:
      "https://smart-buy-bucket.s3.eu-central-1.amazonaws.com/seed-phone-thumbnail.webp",
    description: "A beautiful phone",
    price: 1000,
    createdAt: new Date(),
    updatedAt: new Date(),
    images: [],
    ownerId: "123",
  },
];

export const PostCarousel: React.FC<PostCarouselProps> = ({ endpoint }) => {
  // TODO: Fetch houses from the endpoint
  // use react-query to fetch the data
  // add a loading state and error state

  const formattedPosts = dummyPosts.map((p) => ({
    post: p,
  }));

  return (
    <CarouselBase
      items={formattedPosts}
      title="Posts"
      slideItem={PostCard}
      slidesPerView={4}
    />
  );
};
