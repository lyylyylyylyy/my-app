import React from 'react';
import { Image } from "@nextui-org/react";
import { useRouter } from "next/router";
import styles from "./style/MovieList.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface Movie {
  id: number;
  title: string;
  thumbnail: string;
  rating: number;
}

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  const router = useRouter();
  const ratings = useSelector((state: RootState) => state.rating.ratings);

  const handleClick = (movieId: number) => {
    router.push({
      pathname: "/movieDetail",
      query: { id: movieId },
    });
  };

  return (
    <>
      {movies.map((movie) => {
        const movieRating = ratings.find(r => r.id === movie.id)?.rating ?? movie.rating;
        return (
          <div key={movie.id} className={styles.listBox}>
            <Image
              src={movie.thumbnail}
              alt={movie.title}
              style={{ height: "15rem", objectFit: "cover" }}
            />
            <div className={styles.contentBox}>
              <div style={{ fontSize: "1.125rem", fontWeight: "600" }}>
                {movie.title}
              </div>
              <p>{`Rating: ${movieRating}`}</p>
              <div
                style={{ color: "blue" }}
                onClick={() => handleClick(movie.id)}
              >
                View Details
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MovieList;
