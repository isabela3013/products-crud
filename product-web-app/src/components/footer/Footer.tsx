import { Link } from "react-router-dom";

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-dark text-white py-4 mt-auto"> {/* bg-dark, text-white de Bootstrap, py-4 para padding vertical */}
            <div className="container"> {/* Usa container de Bootstrap para centrar */}
                <div className="row">
                    {/* Sección del Logo y Derechos de Autor */}
                    <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
                        <Link to="/" className="text-decoration-none text-info h4 fw-bold"> {/* text-info es un color de Bootstrap */}
                            Product Manager App
                        </Link>
                        <p className="small">
                            © {currentYear} Isabella Jaramillo
                        </p>
                        <p className="small">
                            Todos los derechos reservados.
                        </p>
                    </div>

                    {/* Sección de Contacto */}
                    <div className="col-md-4 text-center text-md-start">
                        <h5 className="fw-bold mb-3">Contacto</h5>
                        <ul className="list-unstyled text-muted small">
                            <li>
                                <a href="mailto:info@mail.com" className="text-decoration-none text-muted hover-link">
                                    Email: info@mail.com
                                </a>
                            </li>
                            <li>
                                <a href="tel:+574123456" className="text-decoration-none text-muted hover-link">
                                    Teléfono: +57 4 123 4567
                                </a>
                            </li>
                            <li>
                                Dirección: Calle Falsa 123.
                                Medellín, Colombia.
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="text-center mt-4 pt-3 border-top border-secondary">
                    <p className="small mb-0">
                        Esta es una aplicación prototipo para la creación de productos.
                    </p>
                    <div> Iconos diseñados por <a href="https://www.flaticon.es/autores/bharat-icons" title="Bharat Icons"> Bharat Icons </a> from <a href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es'</a></div>
                </div>
            </div>
            
            {/* Un estilo adicional para los links si deseas un hover effect */}
            <style>{`
                .hover-link {
                    color: #fff !important; /* Cambia a blanco en hover */
                }
                .hover-link:hover {
                    color:rgb(194, 185, 185) !important;
                }
            `}</style>
        </footer>
    )
}