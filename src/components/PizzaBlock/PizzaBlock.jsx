import { useState } from "react";
import { nanoid } from "nanoid";

export const PizzaBlock = ({ title, price, imageUrl, sizes, types }) => {
  const [pizzaCount, setPizzaCount] = useState(0);
  const [activeSizeIndex, setActiveSizeIndex] = useState(0);
  const [activeTypeIndex, setActiveTypeIndex] = useState(0);

  const typeNames = ["тонкое", "традиционное"];

  const addPizza = () => {
    setPizzaCount(pizzaCount + 1);
  };

  return (
    <div class="pizza-block-wrapper">
      <div class="pizza-block">
        <a href="/pizza/7">
          <img class="pizza-block__image" src={imageUrl} alt={title} />
          <h4 class="pizza-block__title">{title}</h4>
        </a>
        <div class="pizza-block__selector">
          <ul>
            {types.map((type) => (
              <li
                key={nanoid()}
                onClick={() => setActiveTypeIndex(type)}
                className={activeTypeIndex === type ? "active" : ""}
              >
                {typeNames[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
                key={nanoid()}
                onClick={() => setActiveSizeIndex(index)}
                className={activeSizeIndex === index ? "active" : ""}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div class="pizza-block__bottom">
          <div class="pizza-block__price">от {price} ₽</div>
          <button onClick={addPizza} class="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              ></path>
            </svg>
            <span>Добавить </span>
            <i>{pizzaCount}</i>
          </button>
        </div>
      </div>
    </div>
  );
};
