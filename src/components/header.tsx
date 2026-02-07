import { useAuth } from "@clerk/clerk-react";
import Container from "./container";
import { cn } from "@/lib/utils";
import LogoContainer from "./logo-container";
import NavigationRoutes from "./navigation-routes";
import { NavLink } from "react-router-dom";
import ProfileContainer from "./profile-container";
import ToggleContainer from "./toggle-container";

const Header = () => {
  const { userId } = useAuth();

  return (
    <header
      className={cn(
        "w-full border-b duration-150 transition-all ease-in-out bg-white/80 backdrop-blur-sm sticky top-0 z-50",
      )}
    >
      <Container>
        <div className="flex items-center justify-between w-full py-2">
          {/* Logo section - Left */}
          <div className="flex-shrink-0">
            <LogoContainer />
          </div>

          {/* Navigation section - Center */}
          <nav
            className={cn(
              "hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2",
            )}
          >
            <NavigationRoutes />
            {userId && (
              <NavLink
                to={"/generate"}
                className={({ isActive }) =>
                  cn(
                    "text-sm text-neutral-600 hover:text-neutral-900 transition-colors",
                    isActive && "text-neutral-900 font-semibold",
                  )
                }
              >
                Take an Interview
              </NavLink>
            )}
          </nav>

          {/* Profile and Mobile Toggle - Right */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <ProfileContainer />
            </div>
            <ToggleContainer />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
