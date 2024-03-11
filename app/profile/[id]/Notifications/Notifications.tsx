import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { UserWithPosts } from "@/lib/queries/user";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { RocketIcon } from "lucide-react";
import { AddPhoneForm } from "./AddPhoneForm";
import { VerifyPhoneForm } from "./VerifyPhoneForm";
import { CreatePostButton } from "@/components/cta/create-post";

interface NotificationsProps {
  user: UserWithPosts;
}

export const Notifications = async ({ user }: NotificationsProps) => {
  const showPhoneAlert = !user.phone || !user.phoneVerified;
  const showNoPostsAlert = user.owns.length === 0 && !showPhoneAlert;

  const noNotifications = !showPhoneAlert && !showNoPostsAlert;

  if (noNotifications) {
    return (
      <div className="rounded-lg bg-gradient-to-b from-white to-blue-100 p-8 text-center">
        <RocketIcon className="mx-auto h-20 w-20" />
        <h2 className="mt-4 text-xl font-bold">No notifications</h2>
        <p className="mt-2 text-gray-500">
          You are all set! Why not post your first ad?
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Notifications</h1>
      <Separator />
      <div className="mt-4 flex flex-col gap-y-4">
        {showPhoneAlert && (
          <Alert>
            <ExclamationTriangleIcon className="mr-2 h-5 w-5" />
            <AlertTitle>No phone number added</AlertTitle>
            <AlertDescription>
              You can&apos;t post ads without a phone number. Add one now to get
              started.
            </AlertDescription>
            <Accordion collapsible type="single">
              {!user.phone && (
                <AccordionItem value="addPhone">
                  <AccordionTrigger>Add your phone number</AccordionTrigger>
                  <AccordionContent>
                    <AddPhoneForm user={user} />
                  </AccordionContent>
                </AccordionItem>
              )}
              {!user.phoneVerified && (
                <AccordionItem value="verify" disabled={!user.phone}>
                  <AccordionTrigger>Verify by SMS</AccordionTrigger>
                  <AccordionContent>
                    <VerifyPhoneForm user={user} />
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </Alert>
        )}
        {showNoPostsAlert && (
          <Alert>
            <ExclamationTriangleIcon className="mr-2 h-5 w-5" />
            <AlertTitle>No posts</AlertTitle>
            <AlertDescription>
              You haven&apos;t posted any ads yet. Why not post your first ad
              now?
            </AlertDescription>
            <div className="mt-2 flex justify-end">
              <CreatePostButton />
            </div>
          </Alert>
        )}
      </div>
    </div>
  );
};
