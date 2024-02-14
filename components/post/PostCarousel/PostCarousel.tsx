import { Post, PostCard } from "@/components/post/";
import { CarouselBase } from "../../shared/carousels/CarouselBase";

interface PostCarouselProps {
  endpoint: string;
}

const dummyPosts: Post[] = [
  {
    id: "123-asd",
    title: "House 1",
    description: "A beautiful house",
    price: 100000,
    createdAt: new Date(),
    updatedAt: new Date(),
    images: [],
    ownerId: "123",
  },
  {
    id: "987-qwe",
    title: "Car 1",
    description: "A beautiful car",
    price: 100000,
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
