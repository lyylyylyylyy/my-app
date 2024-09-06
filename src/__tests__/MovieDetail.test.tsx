import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { useRouter } from "next/router";

import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import MovieDetail from "../pages/movieDetail";
import { moviesList } from "../mock/movie";
import { setUserRating } from "../store/ratingSlice";
import { Dispatch, Store, UnknownAction } from '@reduxjs/toolkit';

const mockStore = configureStore([]);
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("MovieDetail Component", () => {
  let store: MockStoreEnhanced<unknown, {}> | Store<unknown, UnknownAction, unknown>;
  let mockDispatch: jest.Mock<any, any, any> | Dispatch<UnknownAction>;

  beforeEach(() => {
    store = mockStore({
      rating: {
        ratings: [{ id: 1, rating: 8 }],
      },
    });
    mockDispatch = jest.fn();
    store.dispatch = mockDispatch;
    (useRouter as jest.Mock).mockReturnValue({
      query: { id: "1" },
    });
  });

  it("renders movie details correctly", () => {
    render(
      <Provider store={store}>
        <MovieDetail />
      </Provider>
    );

    expect(screen.getByText("Movie Name: " + moviesList[0].title)).toBeInTheDocument();
    expect(screen.getByText("Movie Genre: " + moviesList[0].genre)).toBeInTheDocument();
    expect(screen.getByText("Release Date: " + moviesList[0].releaseDate)).toBeInTheDocument();
  });
});
