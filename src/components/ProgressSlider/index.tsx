import React from "react";

export type IProgressSliderProps = {
  percentage: number;
};

const ProgressSlider: React.FC<IProgressSliderProps> = ({ percentage }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-gray-600 h-2.5 rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressSlider;
