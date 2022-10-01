import React from "react";

export type ICategoryCardProps = { onClick: () => void; title: string };

const CategoryCard: React.FC<ICategoryCardProps> = ({ onClick, title }) => {
  return (
    <button
      type="button"
      className="bg-gray-300 rounded-[30px] flex items-end"
      onClick={onClick}
    >
      <p className="p-4">{title}</p>
    </button>
  );
};

export default CategoryCard;
