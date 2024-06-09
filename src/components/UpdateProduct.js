import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams("");
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(params);
    getProductSDetails();
  }, []);

  const getProductSDetails = async () => {
    console.warn(params);
    let result = await fetch(`http://localhost:5000/product/${params.id}` , { headers:{
      authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
     } } )  
    
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  const updateProduct = async () => {
    console.log(name, price, company, category);
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "Put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        
      },
    });
    result = await result.json();
    console.log(result);
    navigate("/");
  };

  return (
    <div className="product">
      <h1> Update Product</h1>
      <input
        type="text"
        placeholder="Enter Product name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        className="inputBox"
      />
      <input
        type="text"
        placeholder="Enter Product price"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        className="inputBox"
      />
      <input
        type="text"
        placeholder="Enter Product Category"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        className="inputBox"
      />
      <input
        type="text"
        placeholder="Enter Product company"
        value={company}
        onChange={(e) => {
          setCompany(e.target.value);
        }}
        className="inputBox"
      />
      <button onClick={updateProduct} className="appButton">
        Add Product
      </button>
    </div>
  );
};

export default UpdateProduct;
