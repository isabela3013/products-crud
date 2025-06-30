import { formatPrice } from "../../../helpers/formatPrice";
import type { Product } from "../../../models/Product";

interface ProductListProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (id: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onEdit, onDelete }) => {
    return (
        <div className="table-responsive"> 
            <table className="table table-striped table-hover table-bordered caption-top">
                {/* <caption>Lista de Productos</caption> */}
                <thead>
                    <tr className="table-dark">
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th className="text-end">Precio</th>
                        <th className="text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <tr key={p.id}>
                            <td>{p.name}</td>
                            <td>{p.description}</td>
                            <td className="text-end">{formatPrice(p.price)}</td>
                            <td className="text-center">
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