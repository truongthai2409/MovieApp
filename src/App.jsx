import 'swiper/scss';
import './index.scss'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './compoments/pages/HomePage';
import MoviePage from './compoments/pages/MoviePage';
import MovieDetail from './compoments/pages/MovieDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/MovieApp" element={<HomePage />} />
        <Route path="/MovieApp/movie" element={<MoviePage />} />
        <Route path="/MovieApp/movie/:movieId" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
}

export default App;