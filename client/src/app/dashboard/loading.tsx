"use client";

import Loading from "@/Loading.json";
import Lottie from "lottie-react";

export default function loading() {
  return (
    <div className="flex items-center justify-center h-full">
      <Lottie animationData={Loading} loop={true} className="w-1/2 h-1/2" />
    </div>
  );
}
