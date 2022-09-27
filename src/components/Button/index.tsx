import React, { ReactNode } from "react";
import classNames from "classnames";

export type ButtonProps = {
  icon?: ReactNode;
  children: ReactNode;
  primary?: boolean;
  hover?: boolean;
};

export const className = (primary: boolean, hover: boolean) =>
  classNames(
    "whitespace-nowrap p-4 rounded-full gap-[30px] min-w-[200px] font-semibold",
    {
      "bg-[#8692A6] text-white": primary,
      "hover:bg-[#8692A6] hover:text-white": primary && hover,
    }
  );

const Button: React.FC<ButtonProps> = ({ icon, children, primary, hover }) => {
  return (
    <button className={className(primary, hover)}>
      {icon}
      {children}
    </button>
  );
};

export default Button;
