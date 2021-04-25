import React, { useState , useEffect }from 'react';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { Link } from 'react-router-dom'
import { getCategory, updateThisCategory } from './helper/adminapicall';


const UpdateCategory = ({match}) => {

    const { user, token } = isAuthenticated();

    const [values, setValues] = useState("");
    const [updatedCategory, setUpdatedCategory] = useState("");

    const preload = (categoryId) => {
        getCategory(categoryId).then( data => {
            console.log(data)
            if(data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({
                    ...values,
                    name: data.name,
                });
            }
        })
    }


    useEffect(() => {
        preload(match.params.categoryId);
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: "", loading: true})
       let name = values.name;
       console.log("name = " + name);
        let item = {name}
        updateThisCategory(match.params.categoryId, user._id, token, item)
        .then(data => {
            console.log(data)
            if(data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({
                    ...values,
                    name: "",
                })
                setUpdatedCategory(name)
            }
        })
    }

    const warningMessage = () => (
        <div className="alert alert-danger mt-3">
            
        </div>
    ) 
    const successMessage = () => (
        <div className="alert alert-success mt-3"
            style={{ display: updatedCategory ? "": "none"}}
        >
            <h4>{ updatedCategory } Updated successfully</h4>
        </div>
    )
    const handleChange = ( event) => {
        setValues({name: event.target.value});
    }


    const myCategoryFrom = () => (
        <form>
            <div className="form-group">
                <p className="lead">Enter the category</p>
                <input 
                    type="text" 
                    className="form-control my-3" 
                    autoFocus
                    required
                    placeholder="For Ex. Summer"
                    onChange={ handleChange }
                    value={ values.name }
                />
                <button onClick={ onSubmit } className="btn btn-outline-info">Update Category</button>
            </div>
        </form>
    )

    return (
        <Base
            title="Add a Category here!"
            description="Welcome to update category section"
            className="container bg-info p-4"
        >
            <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">Admin Home</Link>
            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2">
                    { successMessage() }
                    {myCategoryFrom()}
                </div>
            </div>
        </Base>
    )
}

export default UpdateCategory;