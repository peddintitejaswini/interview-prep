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
      className={cn("w-full border-b duration-150 transition-all ease-in-out")}
    >
      <Container>
        <div className="flex items-center gap-4 w-full">
          {/*logo section */}
          <LogoContainer />
          {/*navigation section */}
          <nav className={cn("hidden md:flex items-center gap-3")}>
            <NavigationRoutes />
            {userId && (
              <NavLink
                to={"/generate"}
                className={({ isActive }) =>
                  cn(
                    "text-base text-neutral-600",
                    isActive && "text-neutral-900 font-semibold"
                  )
                }
              >
                Take an Interview
              </NavLink>
            )}
          </nav>

          <div className="ml-auto flex items-center gap-6">
            <ProfileContainer />
            <ToggleContainer />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
