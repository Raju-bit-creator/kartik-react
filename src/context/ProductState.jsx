// import React, { useState } from "react";
// import productContext from "./porductContext";

// const ProductState = (props) => {
//   let products = [
//     {
//       id: 1,
//       title: "apple",
//       description: "apple from mustang",
//       price: 100,
//       instock: 5,
//     },
//     {
//       id: 2,
//       title: "mango",
//       description: "mango from kalaiya",
//       price: 50,
//       instock: 4,
//     },
//     {
//       id: 3,
//       title: "orange",
//       description: "orange from gorkha",
//       price: 100,
//       instock: 5,
//     },
//   ];

//   const [product, setProduct] = useState(products);

//   const [articles, setArticles] = useState([]);

//   const fetchData = async () => {
//     try {
//       const response = await fetch(
//         "https://newsapi.org/v2/top-headlines?country=us&apiKey=d125d26fbc6d49728775e0b977bddc5a"
//       );
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       const data = await response.json();
//       setArticles(data.articles);
//       console.log("Fetched data:", data.articles);
//     } catch (error) {
//       console.error("Fetching error:", error);
//     }
//   };

//   return (
//     <productContext.Provider value={{ product, articles, fetchData }}>
//       {props.children}
//     </productContext.Provider>
//   );
// };

// export default ProductState;

import React, { useReducer, useState } from "react";
import productContext from "./porductContext";
import { cartReducer } from "./Reducer";

const ProductState = (props) => {
  let products = [
    {
      id: 1,
      title: "apple",
      description: "apple from mustang sadwfsdafsadfsadfsaddsf",
      price: 100,
      instock: 5,
    },
    {
      id: 2,
      title: "mango",
      description: "mango from kalaiya",
      price: 50,
      instock: 4,
    },
    {
      id: 3,
      title: "orange",
      description: "orange from gorkha",
      price: 100,
      instock: 5,
    },
    {
      id: 4,
      title: "orange",
      description: "orange from gorkha",
      price: 100,
      instock: 6,
    },
  ];

  const [product, setProduct] = useState([]);
  const [homeProduct, setHomeProduct] = useState([]);
  const [state, dispatch] = useReducer(cartReducer, {
    products: product,
    cart: [],
  });

  const allProduct = async () => {
    const response = await fetch(
      "http://localhost:5000/api/product/getallproduct",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    let data = await response.json();
    console.log(data);
    setProduct(data);
  };
  const allHomeProduct = async () => {
    const response = await fetch(
      "http://localhost:5000/api/product/gethomeproduct",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    let data = await response.json();
    console.log(data);
    setHomeProduct(data);
  };

  const editProduct = async (selectedProduct, updateData) => {
    console.log("editing product ", selectedProduct);
    const { title, description, price, instock } = updateData;
    try {
      const response = await fetch(
        `http://localhost:5000/api/product/updateproduct/${selectedProduct}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ title, description, instock, price }),
        }
      );
      if (!response.ok) {
        throw new Error("fail to update");
      }
      const json = await response.json();
      console.log(json);
      allProduct();
    } catch (error) {
      throw new Error("fail to update");
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/product/deleteproduct/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      if (response.ok) {
        console.log("product deleted successfully");
      } else {
        console.error("failed to delete the product");
      }
      allProduct();
    } catch (error) {
      console.error("failed to delete the product");
    }
  };
  return (
    <productContext.Provider
      value={{
        product,
        allProduct,
        editProduct,
        deleteProduct,
        homeProduct,
        allHomeProduct,
        state,
        dispatch,
      }}
    >
      {props.children}
    </productContext.Provider>
  );
};

export default ProductState;
