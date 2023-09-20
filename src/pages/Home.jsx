import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import qs from "qs";

import { Categories } from "../components/Categories";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";
import { Sort, sortList } from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzasSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const sortType = sort.sortProperty;

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => dispatch(setCurrentPage(number));

  const getPizzas = async () => {
    const search = searchValue ? `search=${searchValue}` : "";

    dispatch(fetchPizzas({ search, sortType, categoryId, currentPage }));
    window.scrollTo(0, 0);
  };

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
    getPizzas();
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
    .map((item) => (
      <Link key={item.id} to={`/pizza/${item.id}`}>
        <PizzaBlock {...item} />
      </Link>
    ));
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
      {status === "error" ? (
        <div>Ошибка</div>
      ) : (
        <div class="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
