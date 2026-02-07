import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Sparkles } from "lucide-react";
import NavigationRoutes from "./navigation-routes";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { Button } from "./ui/button";

const ToggleContainer = () => {
  const { userId } = useAuth();
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger className="block md:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle />
        </SheetHeader>
        <nav className="gap-6 flex flex-col items-start">
          <NavigationRoutes isMobile />
          {userId && (
            <Button
              onClick={() => navigate("/generate")}
              size="sm"
              className="w-full h-10 px-4 bg-primary text-primary-foreground hover:bg-primary/90 gap-2 relative overflow-hidden group shadow-sm mt-2"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              <Sparkles className="w-4 h-4 relative z-10" />
              <span className="relative z-10 font-medium">Take Interview</span>
            </Button>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default ToggleContainer;
