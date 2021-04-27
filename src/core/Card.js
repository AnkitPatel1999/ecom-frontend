import React, { useState , useEffect } from 'react';
import { addItemToCart, removeItemFromCart } from './helper/CartHelper';
import ImageHelper from './helper/ImageHelper';
import {Redirect} from 'react-router-dom';

const Card = ({ product, addToCard = true, removeFromCard = false,setReload = f => f, reload = undefined }) => {
    //fnctions(f){return f}
    const cardTitles = product ? product.name :  " A photo from pexels"
    const cardDescription = product ? product.description :  " Default description"
    const cardPrice = product ? product.price :  " Default "

    const [redirect, setRedirect] = useState(false);

    const addInCard = () => {
        addItemToCart(product, () => setRedirect(true))
    }

    const getRedirect = (redirect) => {
        if(redirect) {
            return <Redirect to="/cart" />
        }
    }

    const showAddToCard = (addToCard) => {
        return (
            addToCard && (
                <button onClick={ addInCard } className="btn form-control btn-outline-success mt-2 mb-2">
                    Add to Cart
                </button>
            )
        )
    }
    
    const showRemoveFromCard = (removeFromCard) => {
        return (
            removeFromCard && (
                <button onClick={ () => {
                    removeItemFromCart(product._id)
                    setReload(!reload)
                }} className="btn form-control btn-outline-danger mt-2 mb-2">
                    Remove from Cart
                </button>
            )
        )
    }


    return (
        <div className="card text-white bg-dark border border-info">
            <div className="card-header lead">{cardTitles}</div>
            <div className="card-body">
                { getRedirect(redirect) }
                <ImageHelper product={product} />
                <p className="lead bg-success font-weight-normal text-wrap">{ cardDescription}</p>
                <p className="btn btn-success rounded btn-sm px-4">$ {cardPrice }</p>
                <div className="row">
                    <div className="col-12">
                        { showAddToCard(addToCard) }
                    </div>
                    <div className="col-12">
                        { showRemoveFromCard(removeFromCard) }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;