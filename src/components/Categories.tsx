import React from "react";
import { nanoid } from "nanoid";

type CategoriesProps = {
  onCategoryClick: (idx: number) => void;
  value: number;
};

const categories = [
  "All",
  "Meat",
  "Vegan",
  "Grill",
  "Spicy",
  "Closed",
];

export const Categories: React.FC<CategoriesProps> = React.memo(
  ({ onCategoryClick, value }) => {
    return (
      <div className="categories">
        <ul>
          {categories.map((category, index) => (
            <li
              key={nanoid()}
              onClick={() => onCategoryClick(index)}
              className={value === index ? "active" : ""}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
