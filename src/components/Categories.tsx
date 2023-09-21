import { nanoid } from "nanoid";
import React from "react";

type CategoriesProps = {
  onCategoryClick: (idx: number) => void;
  value: number;
};

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
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
