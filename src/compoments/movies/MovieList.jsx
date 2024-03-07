import useSWR from 'swr';
import MovieCard from './MovieCard'
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react'
import { fetcher } from '../../config';
import { useState, useEffect } from 'react';

const MovieList = ({ type = "now_playing" }) => {
    const [movie, setMovie] = useState([]);
    const { data } = useSWR(
        `https://api.themoviedb.org/3/movie/${type}?api_key=1db13ab145a70ddd47d437769fce5bcd`,
        fetcher
    )
    useEffect(()=>{
        if(data)
            setMovie(data.results);
    }, [data])
 
    return (
        <div className="text-white movie-list">
            <Swiper grabCursor='true' spaceBetween={40} slidesPerView={"auto"}>
                {movie.length > 0 && movie.map((items)=>(
                    <SwiperSlide key={items.id}>
                        <MovieCard item={items}></MovieCard>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
MovieList.propTypes = {
    type: PropTypes.string.isRequired
}

export default MovieList;
