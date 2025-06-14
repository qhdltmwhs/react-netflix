import axios from "../api/axios";
import React, { useEffect, useState } from "react";
import "./Row.css";
import MovieModal from "./MovieModal";

export default function Row({ id, title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await axios.get(fetchUrl);
        console.log("Results:", response.data.results); // results 확인
        console.log("Fetched data:", response);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovieData();
  }, []); // ✅ 의존성 배열을 비워서 "처음 한 번만 실행"

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };

  return (
    <section className="row">
      <h2>{title}</h2>
      <div className="slider">
        {/* 왼쪽 슬라이드 버튼 */}
        <div className="slider__arrow-left">
          <span
            className="arrow"
            onClick={() => {
              document.getElementById(id).scrollLeft -= window.innerWidth - 80;
            }}
          >
            {"<"}
          </span>
        </div>
        {/* 영화 썸네일 카드 목록 */}
        <div id={id} className="row__posters">
          {movies.map((movie) => (
            <img
              key={movie.id}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`https://image.tmdb.org/t/p/original/${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name || movie.title}
              onClick={() => handleClick(movie)}
            />
          ))}
          ;
        </div>
        {/* 오른쪽 슬라이드 버튼 */}
        <div className="slider__arrow-right">
          <span
            className="arrow"
            onClick={() => {
              document.getElementById(id).scrollLeft += window.innerWidth - 80;
            }}
          >
            {">"}
          </span>
        </div>
      </div>
      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
    </section>
  );
}
