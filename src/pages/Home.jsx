import { useState, useEffect, useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";

import { Categories } from "../components/Categories";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";
import { Sort, sortList } from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filterSlice
  );

  const sortType = sort.sortProperty;

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => dispatch(setCurrentPage(number));

  const { searchValue } = useContext(SearchContext);

  // Если был первый рендер, то проверяем URl-параметры и сохраняем в редуксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find((obj) => obj.sortProperty === params.sortType);

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, [dispatch]);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      setIsLoading(true);
      const search = searchValue ? `search=${searchValue}` : "";

      axios
        .get(
          `https://65031248a0f2c1f3faeb617d.mockapi.io/items?page=${currentPage}&limit=4&${
            categoryId > 0 ? `category=${categoryId}` : ""
          }&${search}&sortBy=${sortType}&order=${
            sortType === "rating" ? "desc" : "asc"
          }`
        )
        .then((res) => setItems(res.data))
        .catch((error) => console.log(error.message))
        .finally(() => setIsLoading(false));
    }
    isSearch.current = false;
  }, [categoryId, currentPage, searchValue, sortType]);

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, currentPage, navigate, sortType]);

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
          onCategoryClick={(index) => onChangeCategory(index)}
          value={categoryId}
        />
        <Sort />
      </div>
      <h2 class="content__title">Все пиццы</h2>
      <div class="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
