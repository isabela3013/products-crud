import type { Product } from "../../../models/Product";
import type { UserProduct } from "../../../models/UserProduct";

interface UserProductTableProps {
    myProducts: UserProduct[];
    products: Product[]; // Se necesita para mostrar el nombre del producto
    onEdit: (product: UserProduct) => void;
    onDelete: (id: number) => void;
}

const UserProductTable: React.FC<UserProductTableProps> = ({
    myProducts,
    products,
    onEdit,
    onDelete,
}) => {
    // Función para formatear el precio (copia del padre o mover a un util)
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="card shadow-sm">
            <div className="card-header bg-info text-white">
                <h5 className="card-title mb-0">Mis Productos</h5>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-striped table-hover table-bordered caption-top">
                        <caption>Listado de mis productos comprados/deseados</caption>
                        <thead className="table-dark">
                            <tr>
                                <th>Producto</th>
                                <th className="text-end">Precio Compra</th>
                                <th>Estado</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myProducts.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="text-center text-muted py-3">
                                        Aún no tienes productos agregados.
                                    </td>
                                </tr>
                            ) : (
                                myProducts.map((up) => (
                                    <tr key={up.id}>
                                        <td>{products.find(p => p.id === up.productId)?.name || `#${up.productId} (Desconocido)`}</td>
                                        <td className="text-end">{formatPrice(up.purchasePrice)}</td>
                                        <td>
                                            <span className={`badge ${up.status === 'comprado' ? 'bg-success' : up.status === 'utilizado' ? 'bg-info' : 'bg-warning text-dark'}`}>
                                                {up.status.charAt(0).toUpperCase() + up.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <button
                                                className="btn btn-sm btn-primary me-2"
                                                onClick={() => onEdit(up)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => onDelete(up.id)}
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserProductTable;