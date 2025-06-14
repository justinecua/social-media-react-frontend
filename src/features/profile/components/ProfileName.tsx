import { useState } from "react";

const ProfileName = ({ item }) => {
  return (
    <div className="ml-32 sm:ml-[10.5rem] lg:ml-[12rem] md:ml-[10.5rem] -mt-2">
      <h3 className="font-bold text-balance text-xl sm:text-2xl md:text-2xl lg:text-2xl">
        {item?.firstname?.charAt(0).toUpperCase() + item?.firstname?.slice(1)}{" "}
        {item?.lastname?.charAt(0).toUpperCase() + item?.lastname?.slice(1)}
      </h3>
      <p className="text-xs sm:text-sm md:text-base text-[var(--color-subtitle)]">
        @{item?.username}
      </p>
    </div>
  );
};

export default ProfileName;
