import { HouseOwner } from "@/components/house-owner";
import { Session } from "next-auth";

export const getHouseOwnerById = async (
  id: HouseOwner["id"],
  session: Session | null,
) => {
  let houseOwner: HouseOwner = {
    id: 1,
    name: "Özhan Efe Meral",
    phone: "5414636693",
    email: "me@ozhanefemeral.com",
    avatar: "/avatar.png",
    memberSince: "2021-01-01",
    lastOnline: "2024-02-12",
  };

  if (!session) {
    houseOwner = {
      ...houseOwner,
      phone: "***-***-****",
      email: "****@****.com",
    };
  }

  return houseOwner;
};
