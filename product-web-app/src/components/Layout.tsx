import { Outlet } from "react-router-dom"
import { Menu } from "./menu/Menu"
import { Footer } from "./footer/Footer"

export const Layout = () => {
    return (
        <div className="d-flex flex-column min-vh-100 bg-light"> {/* bg-light es un fondo claro de Bootstrap */}
            <Menu />

            <main
                className="h-full flex-grow-1 container mt-5 mb-4"
                style={{ minHeight: 'calc(100vh - 200px)' }}
            > {/* mt-5 para espacio debajo del navbar fijo */}
                <Outlet />
            </main>
            
            <Footer />
        </div>
    )
}
