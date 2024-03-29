"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createPostAction } from "./actions";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import webShoppingSvg from "@/public/web-shopping.svg";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

const initialState = {
  email: "",
  title: "",
  description: "",
  price: 0,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Publishing..." : "Publish"}
    </Button>
  );
}

export const CreatePostForm: React.FC = () => {
  const session = useSession();
  const [state, formAction] = useFormState(createPostAction, initialState);
  const hasErrors = !!state.errors;
  const [images, setImages] = useState<File[]>([]);
  const [thumbnailIndex, setThumbnailIndex] = useState<number | undefined>(
    undefined,
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setImages(files);
    setThumbnailIndex(0);
  };

  return (
    <form action={formAction}>
      {hasErrors && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Whooops! 😔</AlertTitle>
          <AlertDescription>
            There was a problem with your submission:
            <ul>
              {Object.entries(state.errors).map(([key, value]) => (
                <li key={key}>
                  <strong className="capitalize">{key}</strong>: {String(value)}
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
      <input
        type="hidden"
        name="email"
        value={session?.data?.user?.email || undefined}
      />
      <input type="hidden" name="thumbnailIndex" value={thumbnailIndex} />
      <Card>
        <CardHeader>
          <CardTitle>Provide a catchy title for your advertisement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4 lg:grid-cols-3">
            <div className="col-span-2 flex flex-col space-y-2">
              <Label htmlFor="name">Title</Label>
              <Input
                id="name"
                placeholder="e.g. iPhone 15 Pro 256GB"
                name="title"
              />
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="e.g. Brand new, never used, still in the box with all accessories"
                name="description"
              />
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                placeholder="e.g. 1500"
                name="price"
                type="number"
              />
              <Label htmlFor="images">Images</Label>
              <Input
                name="images"
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
              />
              {images.length > 0 && (
                <>
                  <Label>Thumbnail</Label>
                  <div className="flex gap-2 overflow-x-auto">
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className={`border-4 ${
                          thumbnailIndex === index
                            ? "border-blue-500"
                            : "border-transparent"
                        }`}
                        onClick={() => setThumbnailIndex(index)}
                      >
                        <Image
                          src={URL.createObjectURL(image)}
                          alt="Image"
                          width={100}
                          height={100}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
              <Label htmlFor="isPublished">Publish immediately</Label>
              <Switch name="isPublished" id="isPublished" />
            </div>
            <div className="hidden justify-center lg:flex">
              <Image src={webShoppingSvg} alt="Web shopping" width={250} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <SubmitButton />
        </CardFooter>
      </Card>
    </form>
  );
};
