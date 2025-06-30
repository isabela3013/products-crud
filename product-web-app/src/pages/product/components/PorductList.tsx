import { useState } from "react";
import type { Product } from "../../../models/Product";

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    
    const handleDelete = async (id: number) => {
        // await deleteProduct(id);
        // loadProducts();
    };

    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th><th>Price</th><th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <tr key={p.id}>
                            <td>{p.name}</td>
                            <td>${p.price}</td>
                            <td>
                                <button 
                                    className="btn btn-sm btn-primary me-2"
                                    // onClick={() => onEdit(p)}
                                >
                                    Edit
                                </button>
                                <button 
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(p.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProductList;