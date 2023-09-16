import { useState, useEffect, useContext } from "react";

import { Categories } from "../components/Categories";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";
import { Sort } from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pizzaCategory, setPizzaCategory] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sortProperty: "rating",
  });

  const { searchValue } = useContext(SearchContext);

  useEffect(() => {
    setIsLoading(true);
    const search = searchValue ? `search=${searchValue}` : "";

    fetch(
      `https://65031248a0f2c1f3faeb617d.mockapi.io/items?page=${currentPage}&limit=4&${
        pizzaCategory > 0 ? `category=${pizzaCategory}` : ""
      }&${search}&sortBy=${sortType.sortProperty}&order=${
        sortType.sortProperty === "rating" ? "desc" : "asc"
      }`
    )
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((error) => console.log(error.message))
      .finally(() => setIsLoading(false));
    window.scrollTo(0, 0);
  }, [pizzaCategory, sortType.sortProperty, searchValue, currentPage]);

  const pizzas = items
    //----------   Фильтр для статического поиска   ----------
    // .filter((item) =>
    //   item.title.toLowerCase().includes(searchValue.toLowerCase())
    // )
    .map((item) => <PizzaBlock key={item.id} {...item} />);
  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));

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
      <div class="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </>
  );
};

export default Home;
