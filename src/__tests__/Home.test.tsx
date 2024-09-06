import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';
import Home from "../pages/index";
import { moviesList } from "../mock/movie";
import { useRouter } from 'next/router';

// 模拟 useRouter
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mockRouter = {
  push: jest.fn(),
  prefetch: jest.fn(),
  route: '/',
  pathname: '',
  query: '',
  asPath: '',
};

(useRouter as jest.Mock).mockReturnValue(mockRouter);

const mockStore = configureStore([]);
const store = mockStore({
  rating: {
    ratings: [], // 确保这里有初始的 ratings 状态
  },
  // 其他初始 Redux store 状态
});

describe("Home Component", () => {
  test("renders SearchBar and MovieList", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    expect(screen.getByPlaceholderText("Search for movies...")).toBeInTheDocument();
    expect(screen.getByText(moviesList[0].title)).toBeInTheDocument();
  });

  test("clears search results", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    const searchInput = screen.getByPlaceholderText("Search for movies...") as any;
    fireEvent.change(searchInput, { target: { value: "k" } });
    const clearButton = screen.getByRole("button");
    fireEvent.click(clearButton);
    expect(searchInput.value).toBe("");
    expect(screen.getByText(moviesList[0].title)).toBeInTheDocument();
  });
});
