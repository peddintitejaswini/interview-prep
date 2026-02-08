import { Outlet, Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { MessageSquare, FileText, Map, Briefcase } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { UserButton } from "@clerk/clerk-react";

// Define navigation items
const navItems = [
  {
    title: "Mock Interview Generator",
    url: "/generate",
    icon: MessageSquare,
    description: "Create and practice AI mock interviews",
  },
  {
    title: "Skill Gap Analysis",
    url: "/generate/skill-gap",
    icon: FileText,
    description: "Job description and Resume skill gap",
  },
  {
    title: "Learning Roadmap",
    url: "/generate/roadmap",
    icon: Map,
    description: "Skill gaining roadmap",
  },
  {
    title: "Job Role Eligibility",
    url: "/generate/job-roles",
    icon: Briefcase,
    description: "Find eligible job roles based on your resume",
  },
];

const DashboardLayout = () => {
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar collapsible="icon" className="border-r">
          <SidebarHeader className="border-b px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Interview Prep</span>
                <span className="text-xs text-muted-foreground">Dashboard</span>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-2">
            <SidebarGroup>
              <SidebarGroupLabel className="px-2 text-xs font-semibold text-muted-foreground">
                Features
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="gap-1">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.url;
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          tooltip={item.description}
                          className="h-10"
                        >
                          <Link
                            to={item.url}
                            className="flex items-center gap-3"
                          >
                            <item.icon className="h-4 w-4" />
                            <span className="text-sm">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="flex flex-col flex-1 overflow-hidden">
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-6" />
            <div className="flex flex-1 items-center justify-between gap-4">
              <div className="flex flex-col">
                <h1 className="text-lg font-semibold">
                  {navItems.find((item) => item.url === location.pathname)
                    ?.title || "Dashboard"}
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto bg-muted/20">
            <div className="container mx-auto p-6 max-w-7xl">
              <Outlet />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
