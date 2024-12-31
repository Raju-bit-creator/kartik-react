// import React, { useContext, useEffect } from "react";
// import productContext from "../context/porductContext";

// const Profile = () => {
//   const context = useContext(productContext);
//   const { product ,fetchData, articles} = context;
//   console.log("this is articels", product);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div className="container mt-4">
//       <h5 className="text-centre">This is my News</h5>
//       <div className="row">
//         {articles.map((item) => {
//           return (
//             <div className="col-md-3 mb-4" key={item.url}>
//               <div className="card">
//                 <img
//                   src={item.urlToImage}
//                   className="card-img-top"
//                   alt="news images"
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">{item.title.slice(0, 80)}</h5>
//                   <p className="card-text">{item.description}</p>
//                   <a
//                     href={item.url}
//                     target="_blank"
//                     className="btn btn-primary"
//                   >
//                     Read news
//                   </a>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useContext, useEffect, useState } from "react";
import productContext from "../context/porductContext";
import Apple from "../assets/apple.jpeg";
import { BsThreeDots } from "react-icons/bs";
import EditProductModal from "./EditProductModal";

const Profile = () => {
  const context = useContext(productContext);
  const {
    state: { cart },
    product,
    allProduct,
    dispatch,
    editProduct,
    deleteProduct,
  } = context;
  console.log("this is porducts1111", product);
  // console.log("this is state", state);
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const toggleMenu = (id) => {
    setMenuVisible((prvState) => ({
      ...prvState,
      [id]: !prvState[id],
    }));
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeEditModal = () => {
    setModalVisible(false);
    selectedProduct(null);
  };
  const saveEdit = (updateData) => {
    editProduct(selectedProduct.id, updateData);
  };
  const handleDelete = async (id) => {
    console.log("deleting product");

    await deleteProduct(id);
  };
  useEffect(() => {
    // fetchData();
    allProduct();
  }, []);

  return (
    <div className="container mt-4">
      <h5 className="text-centre">This is my Products</h5>
      <div className="row">
        {product.map((item) => {
          return (
            <div className="col-md-3 mb-4" key={item.id}>
              <div className="card">
                <img src={Apple} className="card-img-top" alt="news images" />
                <div className="card-body">
                  <div className="three-dots">
                    <h5 className="card-title">{item.title}</h5>
                    <BsThreeDots onClick={() => toggleMenu(item.id)} />
                    {menuVisible[item.id] && (
                      <div className="menu-options">
                        <button onClick={() => openEditModal(item)}>
                          Edit
                        </button>
                        <button onClick={() => handleDelete(item.id)}>
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="card-text">{item.description}</p>
                  <p className="card-text">Rs. {item.price}</p>
                  {cart && cart.some((p) => p.id === item.id) ? (
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: item,
                        });
                      }}
                    >
                      Remove form cart
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        dispatch({
                          type: "ADD_TO_CART",
                          payload: item,
                        });
                      }}
                    >
                      Add to cart
                    </button>
                  )}
                </div>
              </div>
              {modalVisible &&
                selectedProduct &&
                selectedProduct.id === item.id && (
                  <EditProductModal
                    product={selectedProduct}
                    onClose={closeEditModal}
                    onSave={saveEdit}
                  />
                )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
