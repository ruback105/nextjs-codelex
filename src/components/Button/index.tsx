import React, { ReactNode } from "react";
import classNames from "classnames";

export type ButtonProps = {
  icon?: ReactNode;
  children: ReactNode;
  primary?: boolean;
  hover?: boolean;
};

export const buttonClassName = (primary?: boolean, hover?: boolean) =>
  classNames("whitespace-nowrap p-4 rounded-full min-w-[200px] font-semibold", {
    "bg-[#8692A6] text-white": primary,
    "hover:bg-[#8692A6] hover:text-white": hover,
  });

const Button: React.FC<ButtonProps> = ({ icon, children, primary, hover }) => {
  return (
    <button
      className={classNames(
        buttonClassName(primary, hover),
        "gap-x-3 items-center flex justify-center"
      )}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;
