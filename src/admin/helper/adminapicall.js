import { API } from "../../backend";

//CREATE CATEGORY CALL

export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "applocation/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body : JSON.stringify(category)
    })
    .then( response => {
        return response.json();
    })
    .catch(err => console.log("creat cat err "+err+" "+userId+" "+token+" "+category.name));
}

//get all category

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: 'GET',
    })
    .then( response => {
        return response.json();
    })
    .catch(err => console.log(err)); 
    
}

// PRODUCTS CALL

export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: "applocation/json",
            Authorization: `Bearer ${token}`
        },
        body : product
    })
    .then( response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

//get all products

export const getProducts = () => {
    return fetch(`${API}/products`, {
        method: 'GET',
    })
    .then( response => {
        return response.json();
    })
    .catch(err => console.log(err));   
}

// delete a product

export const deleteProduct = (productId,userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: "applocation/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then( response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

// delete category
export const deleteCategory = (categoryId,userId, token) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: "applocation/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then( response => {
        return response.json();
    })
    .catch(err => console.log(err));
}


// get a product

export const getProduct = productId => {
    return fetch(`${API}/product/${productId}`, {
        method: 'GET',
    })
    .then( response => {
        console.log("response", response);
        return response.json();
    })
    .catch(err => console.log(err)); 
}

export const getCategory = categoryId => {
    return fetch(`${API}/category/${categoryId}`, {
        method: 'GET',
    })
    .then( response => {
        console.log("response", response);
        return response.json();
    })
    .catch(err => console.log(err)); 
}

// update a product

export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: "applocation/json",
            Authorization: `Bearer ${token}`
        },
        body : product
    })
    .then( response => {
        return response.json();
    })
    .catch(err => console.log(err));
}


//update category

export const updateThisCategory = (categoryId, userId, token, category) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: "applocation/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body : JSON.stringify(category)
    })
    .then( response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

