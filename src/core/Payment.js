import React, { useState , useEffect } from 'react';
import { cartEmpty, loadCart } from './helper/CartHelper';
import { Link } from 'react-router-dom';
import { getmeToken, processPayment } from './helper/paymentHelper';
import { createOrder } from './helper/OrderHelper';
import { isAuthenticated } from '../auth/helper';
import DropIn from 'braintree-web-drop-in-react';

const Payment = (products, setReload = f => f, reload = undefined) => {
    
    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {}
    });

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = (userId, token) => {
        getmeToken(userId, token).then( info => {
            if (info.error) {
                setInfo({...info, error : info.error});
            } else {
                const clientToken = info.clientToken;
                setInfo({clientToken});
            }
        })
    }

    const showbtdropIn = () => {
        return (
            <div>
                {info.clientToken }
                { info.clientToken !== null && products.products.length > 0 ? (
                    <div>
                        <DropIn
                        options={{ authorization: info.clientToken }}
                        onInstance={instance => (info.instance = instance)}
                        />
                        <button className="btn btn-success form-control" onClick={ onPurchase }>Buy</button>
                    </div>
                ) : (
                    <h3>Please Login</h3>
                )}
            </div>
        )
    }


    const onPurchase = () => {
        alert("payment success");

        setInfo({loading: true})
        let nonce;
        console.log("info.instance ",info.instance);
        let getNonce = info.instance.requestPaymentMethod().then(data => {
                nonce = data.nonce;
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getAmount()
                };
                processPayment(userId, token, paymentData)
                    .then(response => {
                        setInfo({...info, success: response.success, loading: false});
                        console.log("payment success");
                    })
                    .catch( error => {
                        setInfo({loading:false, success: false})
                        console.log("payment failed");
                    })
            })
    }

    const getAmount = () => {
        let amount = 0;
        products.products.map( p =>{
            amount = amount + p.price
        })
        return amount;
    }

    useEffect(() => {
        getToken(userId, token);
        console.log(info)
    }, [])


    return (
        <div>
            <h3>Your bill is { getAmount() }</h3>
            <h3>{showbtdropIn()}</h3>
        </div>
    )
}

export default Payment;