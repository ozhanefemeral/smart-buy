import { HouseDetails } from "@/components/house";
import React from "react";

const DetailInfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number | boolean;
}) => {
  if (label === "description") return null;
  return (
    <div className="flex items-center space-x-2">
      <div className="w-1/2 capitalize text-gray-500">{label}</div>
      <div className="">{value}</div>
    </div>
  );
};

type HouseDetailsCardProps = {
  details: HouseDetails | null;
};

export const HouseDetailsCard: React.FC<HouseDetailsCardProps> = ({
  details,
}) => {
  if (!details) return null;
  return (
    <div className="flex flex-col space-y-4 rounded-lg border p-4">
      <h1 className="text-2xl font-semibold">Details</h1>
      {Object.entries(details).map(([key, value]) => (
        <DetailInfoRow key={key} label={key} value={value} />
      ))}
    </div>
  );
};
