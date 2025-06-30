import { Outlet } from "react-router-dom"
import { Menu } from "./menu/Menu"
import { Footer } from "./footer/Footer"

export const Layout = () => {
    return (
        <div className="d-flex flex-column min-vh-100 bg-light"> {/* bg-light es un fondo claro de Bootstrap */}
            <Menu />

            {/* Contenido principal: Ocupa el espacio restante (flex-grow-1)
                Usamos mt-5 (margin-top) para crear espacio debajo del menú fijo.
                El container de Bootstrap centra el contenido y le da un padding. */}
            <main className="flex-grow-1 container mt-5 mb-4 h-vh"> {/* mt-5 para espacio debajo del navbar fijo */}
                <Outlet />
            </main>
            
            <Footer />
        </div>
    )
}
