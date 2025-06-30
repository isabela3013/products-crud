import { useEffect, useState } from "react";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../../services/productService";
import ProductList from "./components/PorductList";
import type { Product } from "../../models/Product";
import ProductEditModal from "./components/ProductEditModal";
import { toast } from "react-toastify";

const ProductPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showModal, setShowModal] = useState(false);
        
    useEffect(() => {
        loadProducts();
    }, []);
    
    const loadProducts = async () => {
        try {
            const res = await getProducts();
            setProducts(res.data);
        } catch {
            toast.error("Error al cargar productos");
        }
    };

    const handleDelete = async (id: number) => {
        try {
            if (confirm(`¿Seguro que deseas eliminar ${products.find(x => x.id === id)?.name}?`)) {
                await deleteProduct(id);
                toast.success("Producto eliminado");
            }
            loadProducts();
        } catch {
            toast.error('Error al eliminar el producto');
        }
    };

    const handleSave = async (product: Product, isEdit: boolean) => {
        try {
            if(!validations(product)) return;

            if (isEdit) {
                await updateProduct(product.id, product);
                toast.success("Producto actualizado");
            } else {
                
                product.createdAt = new Date;
                console.log(product)
                await createProduct(product);
                toast.success("Producto creado");
            }
            loadProducts();
        } catch {
            toast.error("Error al guardar producto");
        }
        finally {
            setSelectedProduct(null);
        }
    };

    const validations = (product: Product) : boolean => {
        if (!product.name || product.name.trim() === '') {
            toast.warning("El nombre del producto es requerido");
            return false;
        }

        if (product.price === undefined || product.price <= 0) {
            toast.warning("El precio debe ser mayor a 0");
            return false;
        }

        return true;
    }

    const openModal = (product: Product | null = null) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
    };

    return (
        <div>
            <h1 className="m-4">Productos</h1>

            <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-success" onClick={() => openModal()}>
                    Nuevo Producto
                </button>
            </div>
            
            <ProductList
                products={products}
                onEdit={openModal}
                onDelete={handleDelete}
            />
            
            <ProductEditModal
                show={showModal}
                product={selectedProduct}
                onSave={handleSave}
                onClose={closeModal}
            />
        </div>
    )
}

export default ProductPage;