import { createBrowserRouter, Outlet, useLoaderData } from "react-router";

function RootLayout() {
    const { title } = useLoaderData();

    return (
        <div>
            <header>{title}</header>
            <Outlet />
        </div>
    );
}

const rootLayout = async () => {
    return { title: 'Aula 3' }
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        // Component: RootLayout
        loader: rootLayout
    },
]);

export default router;