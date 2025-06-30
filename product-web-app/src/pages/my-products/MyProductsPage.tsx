import { useEffect, useState } from "react";
import type { Product } from "../../models/Product";
import type { CreateUserProductDto, UserProduct } from "../../models/UserProduct";
import { getProducts } from "../../services/productService";
import { toast } from "react-toastify";
import { createUserProduct, deleteUserProduct, getUserProducts, updateUserProduct } from "../../services/userProductService";
import UserProductTable from "./components/UserProductTable";
import UserProductForm from "./components/UserProductForm";

const MyProductsPage: React.FC = () => {

    //#region Declarations
    const [products, setProducts] = useState<Product[]>([]); // Productos disponibles para seleccionar
    const [myProducts, setMyProducts] = useState<UserProduct[]>([]); // Productos del usuario

    const emptyUserProd: UserProduct = {
        id: 0,
        userId: "",
        productId: 0,
        status: "pendiente",
        purchasePrice: 0,
        createdAt: new Date(),
    };

    const [form, setForm] = useState<UserProduct>(emptyUserProd); // Estado del formulario
    const [isEditing, setIsEditing] = useState(false); // Bandera para modo edición
    //#endregion

    // Carga inicial
    useEffect(() => {
        loadProducts();
        loadUserProducts();
    }, []);


    //#region Logica
    const loadProducts = async () => {
        try {
            const res = await getProducts();
            setProducts(res.data);
        } catch {
            toast.error("Error cargando productos disponibles.");
        }
    };

    const loadUserProducts = async () => {
        try {
            const res = await getUserProducts();
            setMyProducts(res.data);
        } catch {
            toast.error("Error cargando tus productos.");
        }
    };
    //#endregion

    //#region Diseño
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: name === 'productId' || name === 'purchasePrice' ? Number(value) : value
        }));
    };

    const handleSubmit = async () => {
        // Validaciones previas
        if (form.productId === 0) {
            toast.error("Por favor, selecciona un producto.");
            return;
        }
        if (form.purchasePrice <= 0) {
            toast.error("Por favor, ingresa un precio de compra válido.");
            return;
        }

        try {
            if (isEditing) {
                await updateUserProduct(form);
                toast.success("Producto actualizado correctamente.");
            } else {
                const userProd: CreateUserProductDto = {
                    productId: form.productId,
                    purchasePrice: form.purchasePrice,
                    status: form.status
                };
                const response = await createUserProduct(userProd);

                if (response.status !== 200 && response.status !== 201) {
                    toast.error("Ocurrió un error al agregar el producto.");
                    return;
                }
                toast.success("Producto agregado correctamente.");
            }
        } catch (error) {
            console.error("Error al procesar el producto:", error);
            toast.error("Error al procesar el producto. Intenta de nuevo.");
        } finally {
            loadUserProducts(); // Siempre recargar para ver los cambios
            setForm(emptyUserProd); // Limpiar formulario
            setIsEditing(false); // Salir de modo edición
        }
    };

    const handleEdit = (userProduct: UserProduct) => {
        setForm({
            ...userProduct,
            productId: userProduct.productId,
            status: userProduct.status,
            purchasePrice: userProduct.purchasePrice
        });
        setIsEditing(true); // Entrar en modo edición
    };

    const handleCancelEdit = () => {
        setForm(emptyUserProd);
        setIsEditing(false);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;

        try {
            await deleteUserProduct(id);
            toast.success("Producto eliminado correctamente.");
            loadUserProducts();
        } catch {
            toast.error("Error al eliminar producto.");
        }
    };
    //#endregion
    
    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Mis Productos Comprados</h2>

            <div className="row g-4">
                {/* Componente del formulario */}
                <div className="col-md-5">
                    <UserProductForm
                        form={form}
                        products={products}
                        isEditing={isEditing}
                        onFormChange={handleFormChange}
                        onSubmit={handleSubmit}
                        onCancelEdit={handleCancelEdit}
                    />
                </div>

                {/* Componente de la tabla */}
                <div className="col-md-7">
                    <UserProductTable
                        myProducts={myProducts}
                        products={products} // Se pasa para que la tabla pueda mostrar los nombres de los productos
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>
            </div>
        </div>
    )
}

export default MyProductsPage;