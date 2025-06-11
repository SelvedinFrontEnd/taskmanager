import { Menu } from 'lucide-react';
import MobileSidebar from '../../Sidebar/MobileSidebar';
import { useState } from 'react';

function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-[#0E0E0E] border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-colors duration-200"
        title="Menu"
      >
        <Menu className="w-5 h-5 text-black dark:text-white" />
      </button>

      {isOpen && <MobileSidebar setIsOpen={setIsOpen} />}
    </>
  );
}

export default HamburgerMenu;