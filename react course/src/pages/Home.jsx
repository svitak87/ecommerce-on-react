import React from 'react'
import { getProducts } from '../data/products'
import ProductCard from '../components/ProductCard';

const Home = () => {
    const products = getProducts();

    return (
        <div className="page">
            <div className="home-hero">
                <h1 className="home-title">Welcome to ShopHub</h1>
                <p className="home-subtitle">Discover amzing products at great prices</p>
            </div>
            <div className="container">
                <h2 className="page-title">Our products</h2>
                <div className="product-grid">
                    {products && products.map((product) => (
                        <div className="product-card">
                            <ProductCard
                                product={product}
                                key={product.id}
                            />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}
export default Home;