import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import qs from "qs";

import {
  Categories,
  PizzaBlock,
  Sort,
  sortList,
  Skeleton,
  Pagination,
} from "../components";

import { useAppDispatch } from "../redux/store";
import { selectFilter } from "../redux/Filter/selectors";
import { selectPizzaData } from "../redux/Pizza/selectors";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/Filter/slice";
import { fetchPizzas } from "../redux/Pizza/slice";
import { SearchPizzaParams } from "../redux/Pizza/types";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const sortType = sort.sortProperty;

  const onChangeCategory = useCallback(
    (idx: number) => {
      dispatch(setCategoryId(idx));
    },
    [dispatch]
  );

  const onChangePage = (page: number) => dispatch(setCurrentPage(page));

  const getPizzas = async () => {
    const search = searchValue ? `search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        search,
        sortType,
        categoryId,
        currentPage: String(currentPage),
      })
    );

    window.scrollTo(0, 0);
  };

  // Если был первый рендер, то проверяем URl-параметры и сохраняем в редуксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as SearchPizzaParams;
      const sort = sortList.find((obj) => obj.sortProperty === params.sortType);

      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: params.categoryId,
          currentPage: Number(params.currentPage),
          sort: sort ? sort : sortList[0],
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
      navigate(`/?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, currentPage, navigate, sortType]);

  const pizzas = items
    //----------   Фильтр для статического поиска   ----------
    // .filter((item) =>
    //   item.title.toLowerCase().includes(searchValue.toLowerCase())
    // )
    .map((item: any) => <PizzaBlock key={item.id} {...item} />);
  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <>
      <div className="content__top">
        <Categories onCategoryClick={onChangeCategory} value={categoryId} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">All pizzas</h2>
      {status === "error" ? (
        <div>Error</div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
