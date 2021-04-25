import React from 'react';
import ImageHelper from './helper/ImageHelper';

const Card = ({
    product,
    addToCard = true,
    removeFromCard = false,
}) => {
    const cardTitles = product ? product.name :  " A photo from pexels"
    const cardDescription = product ? product.description :  " Default description"
    const cardPrice = product ? product.price :  " Default "

    const showAddToCard = (addToCard) => {
        return (
            addToCard && (
                <button onClick={ () => {} } className="btn form-control btn-outline-success mt-2 mb-2">
                    Add to Cart
                </button>
            )
        )
    }
    
    const showRemoveFromCard = (removeFromCard) => {
        return (
            removeFromCard && (
                <button onClick={ () => {}} className="btn form-control btn-outline-danger mt-2 mb-2">
                    Remove from Cart
                </button>
            )
        )
    }


    return (
        <div className="card text-white bg-dark border border-info">
            <div className="card-header lead">{cardTitles}</div>
            <div className="card-body">
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