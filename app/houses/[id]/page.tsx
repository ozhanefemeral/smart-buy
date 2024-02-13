import { getHouseById } from "@/lib/queries/house";
import Image from "next/image";
import React, { Suspense } from "react";
import placeholder from "../../../public/placeholder.svg";
import { HouseDetailsCard } from "./HouseDetailsCard";
import { House } from "@/components/house";
import { HouseOwnerInfo } from "@/components/house-owner/HouseOwnerInfo";
import ShareHouseCard from "./ShareHouse";
import { incrementViewCount } from "@/lib/dynamodb";
import { HouseStats } from "@/components/house/HouseStats/HouseStats";

type Params = {
  id: House["id"];
};

export default async function HouseDetails({ params }: { params: Params }) {
  const { id } = params;
  const house = await getHouseById(id);
  const { details } = house;
  await incrementViewCount(id);

  return (
    <Suspense>
      <div className="flex flex-col items-stretch space-y-4 lg:flex-row lg:items-start lg:space-x-4 lg:space-y-0">
        <div className="flex flex-col space-y-4 xl:w-2/3">
          <div className=" rounded-lg border p-4">
            <div className="flex max-h-[500px] flex-col border-b pb-4 lg:flex-row lg:space-x-4">
              <div className="overflow-hidden rounded-lg lg:w-4/5">
                <Image src={placeholder} alt="house image" className="w-full" />
              </div>
              <div className="flex flex-row space-x-2 overflow-y-auto py-2 lg:w-1/5 lg:flex-col lg:space-x-0 lg:space-y-2 lg:p-0">
                <div className="w-1/4 shrink-0 overflow-hidden rounded-lg lg:w-full">
                  <Image src={placeholder} alt="house image" />
                </div>
                <div className="w-1/4 shrink-0 overflow-hidden rounded-lg lg:w-full">
                  <Image src={placeholder} alt="house image" />
                </div>
                <div className="w-1/4 shrink-0 overflow-hidden rounded-lg lg:w-full">
                  <Image src={placeholder} alt="house image" />
                </div>
                <div className="w-1/4 shrink-0 overflow-hidden rounded-lg lg:w-full">
                  <Image src={placeholder} alt="house image" />
                </div>
                <div className="w-1/4 shrink-0 overflow-hidden rounded-lg lg:w-full">
                  <Image src={placeholder} alt="house image" />
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-2 pt-4">
              <h1 className="text-2xl font-semibold">{house.title}</h1>
              <p className="max-h-96 overflow-y-auto whitespace-pre-wrap">
                {details!.description}
              </p>
            </div>
          </div>
        </div>
        <div className="flex h-fit flex-col space-y-4 xl:w-1/3">
          <HouseOwnerInfo id={house.owner} />
          <ShareHouseCard />
          <HouseStats houseId={id} />
          <HouseDetailsCard details={details} />
        </div>
      </div>
    </Suspense>
  );
}
