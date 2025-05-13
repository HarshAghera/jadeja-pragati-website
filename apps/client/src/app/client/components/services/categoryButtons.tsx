"use client";

import React from "react";

interface CategoryButtonsProps {
  categories: string[];
}

const CategoryButtons: React.FC<CategoryButtonsProps> = ({ categories }) => {
  const [activeCategory, setActiveCategory] = React.useState<string>(
    categories[0]
  );

  return (
    <div className="flex justify-center flex-wrap gap-4 mb-12">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActiveCategory(cat)}
          className={`px-4 py-2 rounded-full border font-semibold text-sm transition 
            ${
              activeCategory === cat
                ? "bg-[#0f2557] text-white"
                : "border-[#0f2557] text-[#0f2557] hover:bg-[#0f2557] hover:text-white"
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryButtons;
