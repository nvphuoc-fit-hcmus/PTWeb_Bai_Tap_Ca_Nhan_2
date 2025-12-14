import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function SearchPage() {
  const [params] = useSearchParams();
  const [results, setResults] = useState([]);
  const query = params.get('q') || '';

  useEffect(() => {
    // TODO: Ket noi API that, tam thoi fake data
    if (!query) {
      setResults([]);
      return;
    }
    setResults([
      { id: 1, title: `Ket qua cho: ${query}`, rated: 'PG-13', length: '120m' },
      { id: 2, title: `${query} (2020)`, rated: 'R', length: '95m' },
    ]);
  }, [query]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Search Results</h1>
      {!query && (
        <p className="text-gray-600 dark:text-gray-400">Nhap tu khoa o thanh search de tim phim.</p>
      )}
      {query && results.length === 0 && (
        <p className="text-gray-600 dark:text-gray-400">Khong co ket qua cho "{query}"</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((item) => (
          <div key={item.id} className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow">
            <h3 className="font-semibold text-gray-800 dark:text-white">{item.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Rated: {item.rated} • Length: {item.length}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
