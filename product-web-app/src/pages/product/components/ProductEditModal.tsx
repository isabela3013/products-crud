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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <div className="modal show d-block" tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">
                            {product ? "Editar Producto" : "Nuevo Producto"}
                        </h5>
                        <button onClick={handleClose} className="btn-close"></button>
                    </div>

                    <div className="modal-body">
                        <input name="name" className="form-control mb-2" value={form.name} onChange={handleChange} placeholder="Nombre" />
                        <input name="price" type="number" className="form-control mb-2" value={form.price} onChange={handleChange} placeholder="Precio" />
                        <input name="description" className="form-control mb-2" value={form.description} onChange={handleChange} placeholder="Descripción" />
                    </div>

                    <div className="modal-footer">
                        <button 
                            onClick={handleSubmit}
                            className="btn btn-success"
                        >
                            Guardar
                        </button>

                        <button 
                            onClick={onClose}
                            className="btn btn-secondary"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductEditModal;