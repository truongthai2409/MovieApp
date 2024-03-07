import { useParams } from "react-router-dom";
import useSWR from "swr";
import { APIKEY, fetcher } from "../../config";
import { Fragment, useEffect, useState } from "react";
import Heade from "../layout/Heade";

const MovieDetail = () => {
    const [movie, setMovie] = useState({});
    const { movieId } = useParams();
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${APIKEY}`
    const { data } = useSWR(
        url,
        fetcher
    )
    useEffect(() => {
        if (data)
            setMovie(data);
    }, [data])
    if(!movie) return null;
    const { backdrop_path, title, genres, overview } = movie;

    return (
        <Fragment>
            <Heade></Heade>
            <div className="object-cover w-full h-[600px] relative">
                <div className="absolute inset-0 bg-black bg-opacity-70"></div>
                <div
                    className="w-full h-full bg-no-repeat bg-cover"
                    style={{
                        backgroundImage: `url(https://media.themoviedb.org/t/p/original/${backdrop_path})`
                    }}>
                </div>
            </div>
            <div className="w-full h-[400px] max-w-[800px] relative -mt-[300px] z-10 pb-10 mx-auto">
                <img
                    src={`https://media.themoviedb.org/t/p/original/${backdrop_path}`}
                    className='object-cover w-full h-full rounded-xl'
                    alt=""
                />
            </div>
            {genres && (
                <Fragment>
                    <h1 className="mb-10 text-3xl font-bold text-center text-white">{title}</h1>
                    <div className="relative flex items-center justify-center mb-5 text-center text-white gap-x-5" >
                        {genres.length > 0 && genres.map((item) => (
                            <span key={item.id}
                                className="px-3 py-2 border rounded border-primary text-primary "
                            >
                                {item.name}
                            </span>
                        ))}
                    </div>
                </Fragment>
            )}
            <div className="py-10">
                <div className="text-center text-white leading-relaxed max-w-[600px] mx-auto">{overview}</div>
            </div>
            <MovieCredits></MovieCredits>
            <MovieVideo></MovieVideo>
        </Fragment>
    );
};

function MovieCredits() {
    const { movieId } = useParams();
    const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${APIKEY}`
    const { data } = useSWR(
        url, fetcher
    )
    if (!data) return null;
    const { cast } = data;
    if (!cast || cast.length <= 0) return null;

    return (
        <Fragment>
            <h2 className="mb-10 text-2xl text-center text-white page-container">Casts</h2>
            <div className="grid grid-cols-4 gap-5 mb-10 ">
                {cast.slice(0,4).map((item) => (
                    !item.profile_path ? null :
                        <div className="w-full cast-items" key={item.id}>
                            <img
                                src={`https://media.themoviedb.org/t/p/original/${item.profile_path}`}
                                alt=""
                                className="w-fulll h-[350px] object-cover rounded-lg mx-auto"
                            />
                        </div>
                ))}

            </div>
        </Fragment>
    )
}

function MovieVideo() {
    const { movieId } = useParams();
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${APIKEY}`
    const { data } = useSWR(
        url, fetcher
    )
    if(! data) return null
    const { results } = data
    if(! results) return null
    return(
        <Fragment>
            <iframe width="695" height="391" src={`https://www.youtube.com/embed/${results[0].key}`} 
                title="Just Say Hello - Melo-D |Yuriko Piano Cover"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="mt-4 mb-10 page-container"
            >
            </iframe>
        </Fragment>
    )
    
}


export default MovieDetail;