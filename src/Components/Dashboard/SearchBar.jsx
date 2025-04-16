import React from 'react';
import { Search } from 'lucide-react';

function SearchBar() {
  return (
    <div className="relative w-full max-w-md ml-8">
      <input
        type="text"
        placeholder="Search..."
        className="w-full pl-10 pr-4 py-2 h-13 rounded-lg border-2 border-white bg-accent dark:bg-[#0E0E0E] placeholder:text-black dark:placeholder:text-white text-[#1A202C] dark:text-white focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
      />
      <Search className="absolute left-3 top-3.5 text-black w-5 h-5 pointer-events-none" />
    </div>
  );
}

export default SearchBar;
