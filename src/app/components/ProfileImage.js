import React from "react";
import Image from 'next/image';

const ProfileImage = ({ size = 128 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      position: "relative",
      overflow: "hidden", // Ensure the image stays within the circle
    }}
  >
    <Image
      src="../ProfileImageCircle.png" // Make sure this path is correct relative to your public folder
      alt="Portrait photo of me"
      height={size}
      width={size}
      style={{ borderRadius: "50%", objectFit: "cover", width: "100%", height: "100%" }}
    />
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: "50%",
      }}
    />
  </div>
);

export default ProfileImage;
