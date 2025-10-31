import { Link, useLocation } from "react-router";
import { useMemo } from "react";

import { cn } from "~/lib/utils";

import SearchBar from "~/components/primitives/SearchBar";
import Badge from "~/components/primitives/Badge";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "~/components/shadcn/sidebar";

import KandictionLogo from "~/components/icons/kandiction_logo";

import {
  BookA,
  BookCopy,
  BookOpen,
  Home,
  Info,
  Settings,
  User2,
} from "lucide-react";

type MenuItem = {
  title: string;
  url: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  disabled?: boolean;
};

// Main Menu items.
const mainItems: MenuItem[] = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Kanji",
    url: "kanji",
    icon: BookOpen,
  },
  {
    title: "Vocabulary",
    url: "vocabulary",
    icon: BookA,
    disabled: true,
  },
  {
    title: "Library",
    url: "library",
    icon: BookCopy,
    disabled: true,
  },
  {
    title: "Profile",
    url: "profile",
    icon: User2,
    disabled: true,
  },
] as const;

const footerItems: MenuItem[] = [
  {
    title: "About",
    url: "about",
    icon: Info,
  },
  {
    title: "Settings",
    url: "settings",
    icon: Settings,
    disabled: true,
  },
] as const;

export default function AppSidebar() {
  const location = useLocation();

  const activeItem = useMemo(() => {
    const allItems = [...mainItems, ...footerItems];
    const match = allItems.find(
      (i) => location.pathname === `/${i.url.replace(/^\//, "")}`,
    );
    return match?.title;
  }, [location]);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b bg-card">
        <SidebarMenu>
          <SidebarMenuItem className="p-3">
            <div className="isolate overflow-hidden flex justify-between">
              <Link tabIndex={-1} to="/" className="shrink-0 flex gap-1">
                <KandictionLogo className="size-6 fill-primary" />
                <h1 className="truncate text-foreground text-xl font-bold h-6">
                  Kandiction
                </h1>
              </Link>
              <Badge variant={"default"} className="self-end">
                BETA
              </Badge>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-6 overflow-x-hidden">
        <SidebarGroup className="pt-0">
          <div className="sticky top-0 p-2 group-data-[collapsible=icon]:-mt-12.75 group-data-[collapsible=icon]:opacity-0 transition-all">
            <SearchBar className="bg-background" />
          </div>
          <SidebarSeparator />
          <SidebarGroupContent className="p-2 pb-0!">
            <SidebarMenu className="gap-1">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <MenuItem item={item} isActive={activeItem === item.title} />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="px-2">
          <SidebarGroupLabel className="h-auto">Recents</SidebarGroupLabel>
          <SidebarGroupContent className=""></SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <SidebarMenu className="gap-1">
          {footerItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <MenuItem item={item} isActive={activeItem === item.title} />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

function MenuItem({ item, isActive }: { item: MenuItem; isActive: boolean }) {
  const content = (
    <>
      <item.icon className="text-primary fill-current/15" />
      <span>{item.title}</span>
    </>
  );

  return (
    <SidebarMenuButton
      asChild
      tabIndex={item.disabled || isActive ? -1 : 0}
      className={cn(
        "gap-1.5 rounded",
        item.disabled
          ? `opacity-25 cursor-auto hover:bg-transparent active:bg-transparent hover:text-secondary-foreground active:text-secondary-foreground`
          : [
              `hover:text-foreground active:text-foreground hover:bg-card active:bg-card`,
              `focus-visible:ring-0`,
            ],
        isActive
          ? "bg-card"
          : "focus-visible:bg-card/25 focus-visible:ring-1 ring-disabled",
      )}
      onClick={(e) => {
        if (item.disabled) e.preventDefault();
      }}
    >
      {item.disabled ? (
        <span>{content}</span>
      ) : (
        <Link to={item.url}>{content}</Link>
      )}
    </SidebarMenuButton>
  );
}
