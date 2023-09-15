import { nanoid } from "nanoid";

export const Categories = ({ onCategoryClick, value }) => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div class="categories">
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
};
