import type { Product } from "../../../models/Product";
import type { UserProduct } from "../../../models/UserProduct";

interface UserProductFormProps {
    form: UserProduct;
    products: Product[];
    isEditing: boolean;
    onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onSubmit: () => void;
    onCancelEdit: () => void;
}

const UserProductForm: React.FC<UserProductFormProps> = ({
    form,
    products,
    isEditing,
    onFormChange,
    onSubmit,
    onCancelEdit,
}) => {
    return (
        <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
                <h5 className="card-title mb-0">{isEditing ? "Editar Producto" : "Agregar Nuevo Producto"}</h5>
            </div>
            <div className="card-body">
                <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
                    <div className="mb-3">
                        <label htmlFor="productSelect" className="form-label">Producto:</label>
                        <select
                            id="productSelect"
                            name="productId"
                            className="form-select"
                            value={form.productId}
                            onChange={onFormChange}
                            required
                            disabled={isEditing} // Deshabilita la selección de producto al editar
                        >
                            <option value={0}>-- Selecciona un producto --</option>
                            {products.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.name}
                                </option>
                            ))}
                        </select>
                        {isEditing && (
                            <div className="form-text text-muted">No puedes cambiar el producto de una entrada existente.</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="purchasePriceInput" className="form-label">Precio de compra:</label>
                        <input
                            type="number"
                            id="purchasePriceInput"
                            name="purchasePrice"
                            className="form-control"
                            value={form.purchasePrice}
                            onChange={onFormChange}
                            placeholder="Ej: 150000"
                            required
                            min="0"
                            step="1"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="statusSelect" className="form-label">Estado:</label>
                        <select
                            id="statusSelect"
                            name="status"
                            className="form-select"
                            value={form.status}
                            onChange={onFormChange}
                            required
                        >
                            <option value="pendiente">Pendiente</option>
                            <option value="comprado">Comprado</option>
                            <option value="utilizado">Utilizado</option>
                        </select>
                    </div>

                    <div className="d-grid gap-2 mt-4">
                        <button type="submit" className="btn btn-primary">
                            {isEditing ? "Actualizar Producto" : "Agregar Producto"}
                        </button>
                        {isEditing && (
                            <button type="button" className="btn btn-secondary" onClick={onCancelEdit}>
                                Cancelar Edición
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserProductForm;