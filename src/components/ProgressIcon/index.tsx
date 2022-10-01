import React, { SVGProps } from "react";

export type IProgressIconProps = {
  title: string;
  value: string | number;
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
};

const ProgressIcon: React.FC<IProgressIconProps> = ({ title, value, Icon }) => {
  return (
    <div className="flex space-x-3 items-center">
      <div className="p-5 rounded-[15px] bg-white h-[70px] w-[70px] flex justify-center items-center shadow-md">
        <Icon width={32} height={32} />
      </div>
      <div className="flex flex-col">
        <h2 className="font-bold text-xl">{value}</h2>
        <p className="text-xs">{title}</p>
      </div>
    </div>
  );
};

export default ProgressIcon;
