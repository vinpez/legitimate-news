import { Outlet, useParams } from 'react-router-dom';

import { Header } from "@/components/Header";

export function Layout() {
    const { category } = useParams<{ category: string }>();
    const categoryName = category?.charAt(0).toUpperCase() + category?.slice(1);
    return (
        <div>
            <Header category={categoryName} />
            <Outlet />
        </div>
    );
}
