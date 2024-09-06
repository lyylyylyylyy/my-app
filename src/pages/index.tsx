"use client";

import React from 'react';
import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import { moviesList } from "../mock/movie";

interface Movie {
  id: number;
  title: string;
  thumbnail: string;
  rating: number;
}

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  useEffect(() => {
    // 模拟获取电影数据
    const fetchMovies = async () => {
      setMovies(moviesList);
      setFilteredMovies(moviesList);
    };

    fetchMovies();
  }, []);

  const handleSearch = (query: string) => {
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    console.log(filtered);
    setFilteredMovies([...filtered]);
  };

  const handleClear = () => {
    setFilteredMovies([...moviesList]);
  };

  return (
    <div style={{ width: "100%" }}>
      <SearchBar onSearch={handleSearch} onClear={handleClear} />
      <MovieList movies={filteredMovies} />
    </div>
  );
};

export default Home;
