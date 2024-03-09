import { PostOwnerInfo } from "@/components/post-owner";
import { User } from "@prisma/client";
import { Suspense } from "react";

export default async function ProfilePage({
  params,
}: {
  params: { id: User["id"] };
}) {
  const { id } = params;

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <PostOwnerInfo id={id} />
      </Suspense>
    </div>
  );
}
