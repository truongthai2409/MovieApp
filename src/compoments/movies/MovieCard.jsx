import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ item }) => {
    const {
        title,
        vote_average,
        release_date,
        poster_path,
        id
    } = item
    const navigate = useNavigate();
    return (
        <div className="flex flex-col h-full p-3 rounded-lg movie-card bg-slate-800 selection:none">
            <img
                src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${poster_path}`} alt=""
                className='object-cover rounded-lg w-full h-[250px] mb-5'
            />
            <div className="flex flex-col flex-1">
                <h3 className='mb-3 text-xl font-bold'>{title}</h3>
                <div className="flex justify-between mt-2 mb-10 text-sm opacity-50 item-center">
                    <span>{new Date(release_date).getFullYear()}</span>
                    <span>{vote_average}</span>
                </div>
                <button onClick={() => navigate(`/MovieApp/movie/${id}`)} className="w-full px-6 py-3 mt-auto capitalize rounded-lg bg-primary">
                    Watch Now
                </button>
            </div>
        </div>
    );
};

MovieCard.propTypes = {
    item: PropTypes.shape({
        title: PropTypes.string.isRequired,
        vote_average: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
        release_date: PropTypes.string.isRequired,
        poster_path: PropTypes.string.isRequired
    }).isRequired
};

export default MovieCard;