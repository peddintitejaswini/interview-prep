import { useAuth } from "@clerk/clerk-react";
import Container from "./container";
import { cn } from "@/lib/utils";
import LogoContainer from "./logo-container";
import NavigationRoutes from "./navigation-routes";
import { useNavigate } from "react-router-dom";
import ProfileContainer from "./profile-container";
import ToggleContainer from "./toggle-container";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";

const Header = () => {
  const { userId } = useAuth();
  const navigate = useNavigate();

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
              "hidden md:flex items-center gap-6 absolute left-1/2 transform -translate-x-1/2",
            )}
          >
            <NavigationRoutes />
            {userId && (
              <Button
                onClick={() => navigate("/generate")}
                size="sm"
                className="h-9 px-4 bg-primary text-primary-foreground hover:bg-primary/90 gap-2 relative overflow-hidden group shadow-sm ml-4"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                <Sparkles className="w-4 h-4 relative z-10" />
                <span className="relative z-10 font-medium">
                  Take Interview
                </span>
              </Button>
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
