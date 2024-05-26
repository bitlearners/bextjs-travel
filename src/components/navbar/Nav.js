import Link from "next/link";

// components/Navbar.js
const Navbar = () => {
    return (
      <nav className="bg-indigo-600 bg-opacity-0 p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="text-white font-semibold">Logo</div>
            <div className="flex space-x-4">
              <Link href="#" className="text-white hover:text-gray-300">Home</Link>
              <Link href="#" className="text-white hover:text-gray-300">About</Link>
              <Link href="#" className="text-white hover:text-gray-300">Services</Link>
              <Link href="#" className="text-white hover:text-gray-300">Contact</Link>
            </div>
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  