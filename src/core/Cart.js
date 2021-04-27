import React, { useState , useEffect } from 'react';
import "../styles.css";
import { API } from '../backend'
import Base from './Base';
import Card from './Card';
import { loadCart } from './helper/CartHelper';
import Payment from './Payment';

const Cart = () => {

    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false)

    useEffect(() => {
        setProducts(loadCart())
    }, [reload])

    const loadAllProducts = products => {
        return (
            <div className="">
                <h3 className="">This section to load products</h3>
                { products.map((product, index) => {
                    return (
                        <Card 
                            key={index}
                            product={product}
                            removeFromCard={true}
                            addToCard={false}
                            setReload={setReload}
                            reload={reload}
                        />
                    )
                })}
            </div>
        )
    }
    const loadCheckouts = () => {
        return (
            <div className="">
                <h3 className="text-white"> This section to load checkout</h3>
            </div>
        )
    }

    return (
        <Base title="Cart Page" description="Ready to checkout ">
            <div className="row text-center">
                <div className="col-6">
                { products.length > 0 ? (
                        loadAllProducts( products )
                    ) : ( 
                        <h3> No products in cart </h3>
                    )
                }
                </div>
                <div className="col-6"> 
                    <Payment products={products} setReload={ setReload } />
                </div>
            </div>
        </Base>
    )
}

export default Cart;