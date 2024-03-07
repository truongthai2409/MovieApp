// import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../../config';
import { Swiper, SwiperSlide } from 'swiper/react'
import PropTypes from 'prop-types';

const Banner = () => {

    const { data } = useSWR(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=1db13ab145a70ddd47d437769fce5bcd`,
        fetcher
    )
    const movie = data?.results || [];

    return (
        <section className="banner h-[500px] page-container rounded-lg pb-20 overflow-hidden">
            <Swiper grabCursor="true" slidesPerView={"auto"}>
                {movie.length > 0 && movie.map(item => (
                    <SwiperSlide key={item.id}>
                        <BannerItem item={item}></BannerItem>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );

};

function BannerItem({ item }) {
    const {
        title,
        backdrop_path
    } = item

    return (
        <div className="relative w-full h-full bg-white rounded-lg">
            <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg "></div>
            <img src={`https://media.themoviedb.org/t/p/original/${backdrop_path}`} alt=""
                className='object-top w-full h-full rounded-lg'
            />

            <div className='absolute w-full text-white bottom-5 left-5'>
                <h2 className='mb-5 text-3xl font-bold'>{title}</h2>
                <div className="flex items-center mb-8 gap-x-3">
                    <span className='px-4 py-2 border border-white rounded-md'>Avdenture</span>
                    <span className='px-4 py-2 border border-white rounded-md'>Avdenture</span>
                    <span className='px-4 py-2 border border-white rounded-md'>Avdenture</span>
                </div>
                <button className='px-6 py-3 font-medium text-white rounded-lg bg-primary'>Watch Now</button>
            </div>
        </div>
    )

}
BannerItem.propTypes = {
    item: PropTypes.shape({
        title: PropTypes.string.isRequired,
        backdrop_path: PropTypes.string.isRequired
    }).isRequired
};
export default Banner;