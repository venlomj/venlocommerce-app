import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";
import { FunctionComponent, useEffect, useState } from "react";
import { StyledNavLink } from "./styledNavLink";
import { Link, useNavigate } from "react-router-dom";

const Navbar: FunctionComponent = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("jwt") !== null;
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    setUserName(storedUserName);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userName"); // Verwijder gebruikersnaam bij uitloggen
    navigate("/login");
  };

  return (
    <div className="w-full flex items-center bg-background shadow-md py-4 px-6">
      {/* Left: Logo */}
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold text-primary">
          🌍 VNLOCMRCE
        </Link>
      </div>

      {/* Center: Navigation items */}
      <div className="flex-1 flex justify-center">
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-6">
            <StyledNavLink to="/">Home</StyledNavLink>
            <StyledNavLink to="/products">Products</StyledNavLink>
            <StyledNavLink to="/orders">Orders</StyledNavLink>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Right: Auth buttons */}
      <div className="flex-1 flex justify-end items-center space-x-4">
        {isLoggedIn && userName && (
          <span className="text-sm font-medium text-gray-700">Welcome, {userName}!</span>
        )}

        <NavigationMenu>
          <NavigationMenuList className="flex space-x-4">
            {isLoggedIn ? (
              <StyledNavLink to="/" onClick={handleLogout}>Logout</StyledNavLink>
            ) : (
              <>
                <StyledNavLink to="/register">Register</StyledNavLink>
                <StyledNavLink to="/login">Login</StyledNavLink>
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default Navbar;
