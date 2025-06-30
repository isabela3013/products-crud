import { useEffect, useState } from "react";
import type { Product } from "../../../models/Product";

interface ProductEditModalProps {
    show: boolean;
    product: Product | null; // si es null, es para crear
    onClose: () => void;
    onSave: (product: Product, isEdit: boolean) => void;
}

const ProductEditModal: React.FC<ProductEditModalProps> = ({ show, product, onClose, onSave }) => {
    const emptyProduct: Product = { id: 0, name: "", price: 0, description: "", createdAt: new Date };
    const [form, setForm] = useState<Product>(emptyProduct);

    useEffect(() => {
        if (product) {
            setForm(product);
        } else {
            setForm(emptyProduct);
        }
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: name === "price" ? parseFloat(value) : value });
    };

    const handleSubmit = () => {
        const isEdit = product !== null;
        onSave(form, isEdit);
        clear();
        onClose();
    };

    const handleClose = () => {
        clear();
        onClose();
    };

    const clear = () => {
        setForm(emptyProduct);
    }

    if (!show) return null;

    return (
        <div className="modal fade show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered modal-md">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title" id="productModalLabel">
                            {product ? "Editar Producto" : "Nuevo Producto"}
                        </h5>
                        <button onClick={handleClose} className="btn-close"></button>
                    </div>

                    <div className="modal-body">
                        <form>
                            <div className="mb-3"> {/* Margen inferior para cada grupo de formulario */}
                                <label htmlFor="productName" className="form-label">Nombre del Producto</label>
                                <input
                                    type="text" // Tipo de texto para el nombre
                                    name="name"
                                    id="productName" // ID para conectar con la etiqueta
                                    className="form-control" // Eliminamos mb-2 de aquí ya que el div mb-3 lo maneja
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Nombre del producto"
                                    required // Campo requerido
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="productPrice" className="form-label">Precio</label>
                                <input
                                    type="number"
                                    name="price"
                                    id="productPrice"
                                    className="form-control"
                                    value={form.price}
                                    onChange={handleChange}
                                    placeholder="Precio del producto"
                                    required
                                    min="0" // Valor mínimo para el precio
                                    step="0.01" // Permite valores decimales para el precio
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="productDescription" className="form-label">Descripción</label>
                                <textarea // Usamos textarea para descripciones más largas
                                    name="description"
                                    id="productDescription"
                                    className="form-control"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Descripción del producto"
                                    rows={3}
                                    required
                                ></textarea>
                            </div>
                        </form>
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button" // Tipo button para evitar envío accidental del formulario
                            onClick={handleClose} // Usa handleClose para consistencia
                            className="btn btn-secondary"
                            data-bs-dismiss="modal" // Cierra el modal con data-bs-dismiss
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit" // Tipo submit para el botón principal de acción
                            onClick={handleSubmit}
                            className="btn btn-success"
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductEditModal;