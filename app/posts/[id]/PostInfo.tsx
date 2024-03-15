"use client";

import { FavoritePostButton } from "@/components/post/FavoritePostButton";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useMediaQuery from "@/lib/hooks/use-media-query";
import { formatPostDate, getImageUrl } from "@/lib/utils";
import { Post } from "@prisma/client";
import Image from "next/image";
import { PostImages } from "./PostImages";
import { Separator } from "@/components/ui/separator";

interface PostInfoProps {
  post: Post;
}

export const MobileInfo: React.FC<PostInfoProps> = ({ post }) => {
  // We want to activate swipe only if there are more than one image
  // as well as show the previous and next buttons
  const hasOneImage = post.images.length <= 1;
  return (
    <>
      <div className="-m-4 mb-0">
        <Carousel
          opts={{
            active: !hasOneImage,
          }}
        >
          <CarouselContent>
            {post.images.map((image, index) => (
              <CarouselItem key={index}>
                <Image
                  alt={post.title}
                  src={getImageUrl(image)}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {!hasOneImage && (
            <>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </>
          )}
        </Carousel>
      </div>
      <div className="relative flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">{post.title}</h1>
          <FavoritePostButton postId={post.id} />
        </div>
        <p className="max-h-96 overflow-y-auto whitespace-pre-wrap">
          {post.description}
        </p>
        <div className="flex justify-between">
          <p className="text-lg font-bold">{post.price} zł</p>

          <p className="text-right text-sm">
            Added {formatPostDate(post.createdAt)}
          </p>
        </div>
        <Separator />
      </div>
    </>
  );
};

export const DesktopInfo: React.FC<PostInfoProps> = ({ post }) => {
  return (
    <div className="col-span-2">
      <Card>
        <CardContent className="pt-6">
          <PostImages post={post} />
          <div className="relative flex flex-col gap-y-4 pt-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold">{post.title}</h1>
              <FavoritePostButton postId={post.id} />
            </div>
            <p className="mt-4 max-h-96 overflow-y-auto whitespace-pre-wrap">
              {post.description}
            </p>
            <div className="flex justify-between pt-2">
              <p className="text-lg font-bold">{post.price} zł</p>

              <p className="text-right text-sm">
                Added {formatPostDate(post.createdAt)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const PostInfo: React.FC<PostInfoProps> = ({ post }) => {
  const { isMobile, width } = useMediaQuery();

  if (!width) return null;

  return isMobile ? <MobileInfo post={post} /> : <DesktopInfo post={post} />;
};
