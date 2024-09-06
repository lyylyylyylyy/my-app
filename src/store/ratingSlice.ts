import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MovieRating {
  id: number;
  rating: number | null;
}

interface RatingState {
  ratings: MovieRating[];
}

const initialState: RatingState = {
  ratings: [],
};

const ratingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {
    setUserRating(state, action: PayloadAction<MovieRating>) {
      const { id, rating } = action.payload;
      const existingRating = state.ratings.find((r) => r.id === id);
      if (existingRating) {
        existingRating.rating = rating;
      } else {
        state.ratings.push({ id, rating });
      }
    },
  },
});

export const { setUserRating } = ratingSlice.actions;
export default ratingSlice.reducer;
