import { nanoid } from "nanoid";

type CategoriesProps = {
  onCategoryClick: any;
  value: number;
};

export const Categories: React.FC<CategoriesProps> = ({
  onCategoryClick,
  value,
}) => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

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
};
