import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "../store";

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

export type SearchPizzaParams = {
  search: string;
  sortType: string;
  categoryId: number;
  currentPage: string;
};

export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzasStatus",
  async (params: SearchPizzaParams) => {
    const { search, sortType, categoryId, currentPage } = params;

    const { data } = await axios.get<Pizza[]>(
      `https://65031248a0f2c1f3faeb617d.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ""
      }&${search}&sortBy=${sortType}&order=${
        sortType === "rating" ? "desc" : "asc"
      }`
    );
    return data;
  }
);

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Pizza[]>) => {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const selectPizzaData = (state: RootState) => state.pizzasSlice;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
