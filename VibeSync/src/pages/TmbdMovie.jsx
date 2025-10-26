import React, { useEffect, useState } from "react";

const TmbdMovie = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch new release movies (2025) from OMDb
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "https://www.omdbapi.com/?s=2025&type=movie&apikey=e129e57c"
        );
        const data = await response.json();
        if (data.Search) {
          setMovies(data.Search.slice(0, 10)); // top 10 movies
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">🎬 New Releases (2025)</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading movies...</p>
      ) : movies.length === 0 ? (
        <p className="text-center text-gray-500">No movies found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.imdbID}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300?text=No+Image"}
                alt={movie.Title}
                className="w-full h-64 object-cover"
              />
              <div className="p-3">
                <h2 className="font-semibold text-sm">{movie.Title}</h2>
                <p className="text-gray-500 text-xs">{movie.Year}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TmbdMovie;
