import { Outlet } from 'react-router-dom';

import { Header } from "@/components/Header";

interface LayoutProps {}

export function Layout({ }: LayoutProps) {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
