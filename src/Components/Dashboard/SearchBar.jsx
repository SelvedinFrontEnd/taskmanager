import React from 'react';
import { Search } from 'lucide-react';

function SearchBar() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search..."
        className="w-full pl-10 pr-4 py-2 mb-16 rounded-lg border border-transparent bg-[#d1f8dd] dark:bg-[#0E0E0E] placeholder:text-[#555] dark:placeholder:text-[#aaa] text-[#1A202C] dark:text-white focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300"
      />
      <Search className="absolute left-3 top-2.5 text-accent w-5 h-5 pointer-events-none" />
    </div>
  );
}

export default SearchBar;
