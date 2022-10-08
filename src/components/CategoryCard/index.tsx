import Link from "next/link";
import React from "react";

export type CategoryCardProps = {
  title: string;
  href: string;
};

const CategoryCard: React.FC<CategoryCardProps> = ({ title, href }) => {
  return (
    <Link href={href}>
      <a
        type="button"
        className="bg-gray-300 rounded-[30px] flex items-end m-h-[160px]"
      >
        <p className="p-4">{title}</p>
      </a>
    </Link>
  );
};

export default CategoryCard;
