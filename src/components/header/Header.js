// components/Header.js
const Header = () => {
    return (
      <header className="bg-cover bg-center h-96 flex items-center justify-center text-indigo-600" style={{backgroundImage: "url('./banner.jpg')"}}>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
          <p className="text-lg">Explore our amazing services and products</p>
        </div>
      </header>
    );
  };
  
  export default Header;
  