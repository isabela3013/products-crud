import type { Product } from "../../../models/Product";

interface ProductListProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (id: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onEdit, onDelete }) => {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-CO', { 
            style: 'currency', 
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="table-responsive"> 
            <table className="table table-striped table-hover table-bordered caption-top"> {/* Añadidas clases */}
                <caption>Lista de Productos</caption> {/* Un título para la tabla */}
                <thead>
                    <tr className="table-dark"> {/* Encabezado oscuro */}
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th className="text-end">Precio</th> {/* Alineado a la derecha */}
                        <th className="text-center">Acciones</th> {/* Centrado */}
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <tr key={p.id}>
                            <td>{p.name}</td>
                            <td>{p.description}</td>
                            <td className="text-end">{formatPrice(p.price)}</td> {/* Aplicado el formato y alineado */}
                            <td className="text-center"> {/* Centrado */}
                                <button 
                                    className="btn btn-sm btn-primary me-2"
                                    onClick={() => onEdit(p)}
                                >
                                    Editar
                                </button>
                                <button 
                                    className="btn btn-sm btn-danger"
                                    onClick={() => onDelete(p.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                    {products.length === 0 && (
                        <tr>
                            <td colSpan={4} className="text-center text-muted py-3">
                                No hay productos para mostrar.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ProductList;