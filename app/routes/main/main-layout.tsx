import type { Route } from "./+types/main-layout";
import { Outlet } from "react-router";

import { SidebarProvider, SidebarTrigger } from "~/components/shadcn/sidebar";
import AppSidebar from "./components/app-sidebar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Kandiction" },
    {
      name: "description",
      content: `Kandiction is a quick-reference resource for Kanji characters.`,
    },
  ];
}

export default function MainLayout() {
  return (
    <SidebarProvider className="flex">
      <AppSidebar />
      <main className="grow">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
