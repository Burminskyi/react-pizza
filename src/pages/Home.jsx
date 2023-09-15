import React from "react";
import { useState, useEffect } from "react";

import { Categories } from "../components/Categories";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";
import { Sort } from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pizzaCategory, setPizzaCategory] = useState(0);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sortProperty: "rating",
  });

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://65031248a0f2c1f3faeb617d.mockapi.io/items?${
        pizzaCategory > 0 ? `category=${pizzaCategory}` : ""
      }&sortBy=${sortType.sortProperty}&order=${
        sortType.sortProperty === "rating" ? "desc" : "asc"
      }`
    )
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((error) => console.log(error.message))
      .finally(() => setIsLoading(false));
  }, [pizzaCategory, sortType.sortProperty]);
  return (
    <>
      <div class="content__top">
        <Categories
          onCategoryClick={(index) => setPizzaCategory(index)}
          value={pizzaCategory}
        />
        <Sort onSortTypeClick={(obj) => setSortType(obj)} value={sortType} />
      </div>
      <h2 class="content__title">Все пиццы</h2>
      <div class="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((item) => <PizzaBlock key={item.id} {...item} />)}
      </div>
      {/* <ul class="Pagination_root__LbWkV">
              <li class="previous disabled">
                <a
                  class=" "
                  tabindex="-1"
                  role="button"
                  aria-disabled="true"
                  aria-label="Previous page"
                  rel="prev"
                >
                  &lt;
                </a>
              </li>
              <li class="selected">
                <a
                  rel="canonical"
                  role="button"
                  tabindex="-1"
                  aria-label="Page 1 is your current page"
                  aria-current="page"
                >
                  1
                </a>
              </li>
              <li>
                <a rel="next" role="button" tabindex="0" aria-label="Page 2">
                  2
                </a>
              </li>
              <li>
                <a role="button" tabindex="0" aria-label="Page 3">
                  3
                </a>
              </li>
              <li class="next">
                <a
                  class=""
                  tabindex="0"
                  role="button"
                  aria-disabled="false"
                  aria-label="Next page"
                  rel="next"
                >
                  &gt;
                </a>
              </li>
            </ul> */}
    </>
  );
};

export default Home;
