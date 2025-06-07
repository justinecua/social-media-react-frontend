import { useState } from "react";

const ProfileName = ({ item }) => {
  return (
    <div className="ml-[9.5rem] -mt-2 sm:ml-[11.5rem] md:ml-[12rem]">
      <h3
        className="scroll-m-20 font-extrabold text-balance
                         text-xl sm:text-2xl md:text-2xl lg:text-2xl"
      >
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
