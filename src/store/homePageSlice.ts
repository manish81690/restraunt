import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { getCookie, setCookie } from "typescript-cookie";

interface Restaurant {
  id: string;
  name: string;
}

interface HomePageState {
  userId: string;
  restaurants: Restaurant[];
  bookmarkedRestaurants: Restaurant[];
}

const initialState: HomePageState = {
  userId: "",
  restaurants: [],
  bookmarkedRestaurants: [],
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    addRestaurant: (state, action: PayloadAction<Restaurant>) => {
      console.log(state.userId);
      const existingRestaurant = state.restaurants.find(
        (r) => r.id === action.payload.id
      );
      if (!existingRestaurant && action.payload.name !== "") {
        state.restaurants.push(action.payload);
      }
    },
    removeRestaurant: (state, action: PayloadAction<string>) => {
      state.restaurants = state.restaurants.filter(
        (r) => r.id !== action.payload
      );
    },
    addToBookmark: (state, action: PayloadAction<string>) => {
      const restaurant = state.restaurants.find((r) => r.id === action.payload);
      if (restaurant) {
        state.bookmarkedRestaurants.push(restaurant);
        state.restaurants = state.restaurants.filter(
          (r) => r.id !== action.payload
        );
      }
    },
    removeFromBookmark: (state, action: PayloadAction<string>) => {
      const restaurant = state.bookmarkedRestaurants.find(
        (r) => r.id === action.payload
      );
      if (restaurant) {
        state.restaurants.push(restaurant);
        state.bookmarkedRestaurants = state.bookmarkedRestaurants.filter(
          (r) => r.id !== action.payload
        );
      }
    },
  },
});

export const {
  setUserId,
  addRestaurant,
  removeRestaurant,
  addToBookmark,
  removeFromBookmark,
} = homePageSlice.actions;

export const store = configureStore({
  reducer: {
    homePage: homePageSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
