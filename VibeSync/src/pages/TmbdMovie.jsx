import React, { useEffect, useState } from "react";
import { Music, Star } from "lucide-react";
import { fetchMovies } from "../apis/api";


const TmbdMovie = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchMovies();
      setMovies(data);
      setLoading(false);
    };
    getMovies();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <div
        className="rounded-2xl shadow-xl p-6 w-full max-w-3xl"
        style={{ background: "linear-gradient(135deg, #e9e8ff 0%, #f6f5ff 50%, #dbd2fa 100%)" }}
      >
        <h2 className="text-xl font-bold text-purple-600 mb-4 flex items-center gap-2">
          <Music className="w-5 h-5" />
          🎬 Recommended Movies
        </h2>

        {loading ? (
          <p className="text-gray-500 text-center">Loading movies...</p>
        ) : movies.length === 0 ? (
          <p className="text-gray-500 text-center">No movies found.</p>
        ) : (
          <div className="space-y-3">
            {movies.map((m, idx) => (
              <div
                key={idx}
                className="bg-blue-50 p-3 rounded-lg border-2 border-blue-200 hover:shadow-md transition"
              >
                <p className="font-bold text-sm text-gray-800">{m.title}</p>
                <p className="text-xs text-gray-600">{m.genre}</p>
                <p className="text-lg font-bold text-purple-600 mt-1 flex items-center gap-1">
                  <Star className="w-4 h-4" /> {m.rating}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TmbdMovie;
