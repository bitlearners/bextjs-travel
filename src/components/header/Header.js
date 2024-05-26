"use client"
import { usePathname } from "next/navigation";
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Header = () => {
  const currentPath = usePathname();
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/pages/allpages/");
        const data = await response.json();
        if (data.success) {
          setPages(data.result);
        } else {
          console.error("Failed to fetch pages:", data.error);
        }
      } catch (error) {
        console.error("Error fetching pages:", error);
      }
    };

    fetchData();
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="text-gray-600 bg-white body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="#" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">Travel CMS</span>
        </Link>
        <nav className={`md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center ${isOpen ? 'hidden md:flex' : 'flex'}`}>
          {pages
            .filter(page => page.status === 'Published') // Filter only published pages
            .map(page => (
              <Link href={`/${page.slug}`} key={page._id} className="mr-5 hover:text-gray-900">
                

                <p
  className={
    currentPath === `/${page.slug}`
      ? "text-[#8576FF] font-semibold flex items-center p-2  underline"
      : "flex items-center p-2  text-gray-800 hover:text-[#8576FF] hover:underline"
  }
>
<span className="ms-3">{page.pageName.charAt(0).toUpperCase() + page.pageName.slice(1)}</span>

</p>

              </Link>
            ))
          }
        </nav>
        <button onClick={toggleMenu} className="md:hidden inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
          Menu
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
