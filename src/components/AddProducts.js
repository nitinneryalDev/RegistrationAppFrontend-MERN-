import React, { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error , setError] = useState("")


  const addProduct = async () => {
    if (!name || !price || !category || !company) {

      setError(true)  
      return false; // Stops the execution of the code after this
    }

    // console.log(name , price , category , company)
    const userId = JSON.parse(localStorage.getItem("user"))._id;

    // PUSHING THE DATA TO THE URL Using the POST METHOD
    let result = await fetch("http://localhost:5000/add-product", {
      // now getting the api adress form the postman
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json",
         authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    });
    // console.warn(userId._id);   Tried finding the value of the id

    result = await result.json();
    console.log(result, "result");
  };

  return (
    <div className="product">
      <h1> Add Product</h1>
      <input
        type="text"
        placeholder="Enter Product name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        className="inputBox"
      />
      { error &&  !name  && <span className="inavlid-input" > Enter Valid Name</span>}
      <input
        type="text"
        placeholder="Enter Product price"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        className="inputBox"
      />
      { error &&  !price  && <span className="inavlid-input" > Enter Valid price</span>}
      <input
        type="text"
        placeholder="Enter Product Category"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        className="inputBox"
      />
      { error &&  !category  && <span className="inavlid-input" > Enter Valid category</span>}
      <input
        type="text"
        placeholder="Enter Product company"
        value={company}
        onChange={(e) => {
          setCompany(e.target.value);
        }}
        className="inputBox"
      />
      { error &&  !company  && <span className="inavlid-input" > Enter Valid company</span>}
      <button onClick={addProduct} className="appButton">
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
