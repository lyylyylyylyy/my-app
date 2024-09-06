import React from 'react';
import { useState, useEffect } from "react";
import { Image, Spacer } from "@nextui-org/react";
import { Rating } from "@mui/material";
import { moviesList } from "../mock/movie";
import styles from "./styles/movieDetail.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setUserRating } from "../store/ratingSlice";

interface Movie {
  id: number;
  title: string;
  genre: string;
  releaseDate: string;
  rating: number;
  posterUrl: string;
}

const MovieDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [movie, setMovie] = useState<Movie | null>(null);
  const dispatch = useDispatch();
  const userRating = useSelector(
    (state: RootState) =>
      state.rating.ratings.find((r) => r.id === Number(id))?.rating
  );

  useEffect(() => {
    const fetchMovie = async (id: number) => {
      setMovie(moviesList[id - 1]);
    };

    if (id) {
      fetchMovie(Number(id));
    }
  }, [id]);

  const handleRatingChange = (
    event: React.ChangeEvent<{}>,
    newValue: number | null
  ) => {
    dispatch(setUserRating({ id: Number(id), rating: newValue }));

    // send new ratings to backend service
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className={styles.containerBox}>
      <Image
        src={movie.posterUrl}
        alt={movie.title}
        width="100%"
        height="auto"
        className={styles.imgBox}
      />
      <Spacer y={1} />
      <div className={styles.descBox}>
        <div>Movie Name: {movie.title}</div>
        <div>Movie Genre: {movie.genre}</div>
        <div>Release Date: {movie.releaseDate}</div>
        <div style={{display: 'flex'}}>
          <div>Average Rating:</div>
          <Rating
            name="user-rating"
            precision={0.5}
            value={userRating ?? movie.rating}
            onChange={handleRatingChange}
            max={10}
            data-testid="user-rating"
          />
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
