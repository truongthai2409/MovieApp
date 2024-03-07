import { Fragment, useEffect, useState } from "react";
import Main from "../layout/Main";
import useSWR from "swr";
import { APIKEY, fetcher } from "../../config";
import MovieCard from "../movies/MovieCard";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import ReactPaginate from 'react-paginate';

const itemsPerPage = 5;

const MoviePage = () => {

  const [query, setQuery] = useState("");
  const [movie, setMovie] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [url, setUrl] = useState(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&page=${currentPage}`);

  const { data } = useSWR(url, fetcher)
  // thay doi giao dien
  useEffect(() => {
    if (data !== null && data !== undefined) {
      setMovie(data.results);
      setUrl(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&page=${currentPage}`)
    }
  }, [data, currentPage])
  
  // thay doi khi nhan phan trang
  useEffect(() => {
    if (!data || !data.total_results) return;
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data, itemOffset]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleGetData()
    }
  }

  const getData = async () => {
    try {
      const axiosInstance = axios.create({
        baseURL: 'https://api.themoviedb.org',
      })
      const response = await axiosInstance.get(`/3/search/movie?query=${query}&api_key=${APIKEY}&page=${currentPage}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  const handleGetData = () => {
    getData().then((response) => {
      setMovie(response.data.results)
    })
  }
  console.log(data)
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;
    //tinh toan vi tri moi cua phan tu dau tien
    setItemOffset(newOffset);
    setCurrentPage(event.selected + 1);
  };
  console.log(url)
  return (
    <Fragment>
      <Main></Main>
      <div className="flex text-white page-container">
        <div className="flex-1 mb-10">
          <input type="text" className="w-full p-4 outline-none bg-slate-800"
            placeholder="Searching..."
            onChange={handleChange}
            onKeyDown={handleKeyPress}
          />
        </div>
        <button className="h-full p-5 m-0 text-white bg-primary" onClick={handleGetData}><FaSearch /></button>
      </div>
      <div className="py-10 text-white page-container">
        <div className="grid grid-cols-4 gap-10">
          {movie.length > 0 && movie.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
        </div>
      </div>

      <div className="mt-10 text-white">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="pagination"
        />
      </div>
    </Fragment>
  );
};

export default MoviePage;