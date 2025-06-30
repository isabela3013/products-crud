import { useEffect, useState } from "react";
import type { Product } from "../../models/Product";
import type { CreateUserProductDto, UserProduct } from "../../models/UserProduct";
import { getProducts } from "../../services/productService";
import { toast } from "react-toastify";
import { createUserProduct, deleteUserProduct, getUserProducts, updateUserProduct } from "../../services/userProductService";

const MyProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [myProducts, setMyProducts] = useState<UserProduct[]>([]);

    const emptyUserProd : UserProduct = {
        id: 0,
        userId: "",
        productId: 0,
        status: "pendiente",
        purchasePrice: 0,
        createdAt: new Date,
    }
    const [form, setForm] = useState<UserProduct>(emptyUserProd);

    const loadProducts = async () => {
        try {
            const res = await getProducts();
            setProducts(res.data);
        } catch {
            toast.error("Error cargando productos disponibles");
        }
    };

    const loadUserProducts = async () => {
        try {
            const res = await getUserProducts();
            setMyProducts(res.data);
        } catch {
            toast.error("Error cargando productos del usuario");
        }
    };

    const handleSubmit = async () => {
        if (form.productId === 0 || form.purchasePrice <= 0) {
            toast.error("Selecciona un producto y un precio válido");
            return;
        }

        try {
            if (form.id && form.id !== 0) {
                // Editar
                await updateUserProduct(form);
                toast.success("Producto actualizado");
            } else {
                // Crear
                const userProd: CreateUserProductDto = {
                    productId: form.productId,
                    purchasePrice: form.purchasePrice,
                    status: form.status
                }
                console.log(userProd)
                const response = await createUserProduct(userProd);
                console.log(response)

                if(response.status !== 200) {
                    toast.error("Ocurrió un error al agregar el producto.");
                    return;
                }
                toast.success("Producto agregado");
            }
        } catch {
            toast.error("Error al agregar el producto");
        }
        finally {
            loadUserProducts();
            setForm(emptyUserProd);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;

        try {
            await deleteUserProduct(id);
            toast.success("Producto eliminado");
            loadUserProducts();
        } catch {
            toast.error("Error al eliminar producto");
        }
    };

    useEffect(() => {
        loadProducts();
        loadUserProducts();
    }, []);

    return (
        <div className="container mt-4">
            <h2>Mis Productos</h2>

            <div className="row">
                <div className="col-md-6">
                    <h5>Agregar Producto</h5>

                    <div className="mb-3">
                        <label>Producto:</label>
                        <select
                            className="form-select"
                            value={form.productId}
                            onChange={(e) =>
                                setForm({ ...form, productId: Number(e.target.value) })
                            }
                        >
                            <option value={0}>-- Selecciona un producto --</option>
                            {products.map((p) => (
                                <option
                                    key={p.id}
                                    value={p.id}
                                >
                                    {p.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label>Precio de compra:</label>
                        <input
                            type="number"
                            className="form-control"
                            value={form.purchasePrice}
                            onChange={(e) =>
                                setForm({ ...form, purchasePrice: Number(e.target.value) })
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <label>Estado:</label>
                        <select
                            className="form-select"
                            value={form.status}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    status: e.target.value as UserProduct["status"],
                                })
                            }
                        >
                            <option value="pendiente">Pendiente</option>
                            <option value="comprado">Comprado</option>
                            <option value="utilizado">Utilizado</option>
                        </select>
                    </div>

                    <button className="btn btn-primary" onClick={handleSubmit}>
                        Agregar
                    </button>
                </div>

                <div className="col-md-6">
                    <h5>Listado</h5>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Precio Compra</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myProducts.length === 0 && (
                                <tr>
                                    <td colSpan={3}>Sin productos</td>
                                </tr>
                            )}
                            {myProducts.map((up) => (
                                <tr key={up.id}>
                                    
                                    {/* Information */}
                                    <td>{up.product?.name || `#${up.productId}`}</td>
                                    <td>${up.purchasePrice}</td>
                                    <td>{up.status}</td>

                                    {/* Actions */}
                                    <td>
                                        <button
                                            className="btn btn-sm btn-primary me-2"
                                            onClick={() =>
                                                setForm({
                                                    ...emptyUserProd,
                                                    ...up,
                                                    productId: up.productId ?? 0,
                                                    status: up.status ?? "pendiente",
                                                })
                                            }
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDelete(up.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default MyProductsPage;