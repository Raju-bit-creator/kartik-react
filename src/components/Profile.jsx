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

import { BsThreeDots } from "react-icons/bs";
import EditProductModal from "./EditProductModal";

const Profile = () => {
  const context = useContext(productContext);
  const {
    state: { cart },
    product,
    allProduct,
    allHomeProduct,
    homeProduct,
    dispatch,
    editProduct,
    deleteProduct,
  } = context;
  console.log("this is porducts1111", product);
  console.log("this is home product", homeProduct);
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
    editProduct(selectedProduct._id, updateData);
  };
  const handleDelete = async (id) => {
    console.log("deleting product");

    await deleteProduct(id);
  };
  useEffect(() => {
    // fetchData();
    allProduct();
    allHomeProduct();
  }, []);

  return (
    <div className="container mt-4">
      <h5 className="text-centre">This is my Products</h5>
      <div className="row">
        {product &&
          product.map((item) => {
            return (
              <div className="col-md-3 mb-4" key={item._id}>
                <div className="card">
                  <img
                    // src={`http://localhost:5000/uploads/${item.images[0]}`}
                    src={`http://localhost:5000/uploads/${item.images}`}
                    className="card-img-top"
                    alt="news images"
                  />
                  <div className="card-body">
                    <div className="three-dots">
                      <h5 className="card-title">{item.title}</h5>
                      <BsThreeDots onClick={() => toggleMenu(item._id)} />
                      {menuVisible[item._id] && (
                        <div className="menu-options">
                          <button onClick={() => openEditModal(item)}>
                            Edit
                          </button>
                          <button onClick={() => handleDelete(item._id)}>
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                    <p className="card-text">{item.description}</p>
                    <p className="card-text">Rs. {item.price}</p>
                    {cart && cart.some((p) => p._id === item._id) ? (
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
                  selectedProduct._id === item._id && (
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

// 1. Create collection
// -db.createCollection('comments')
// 2. delete database
// -db.comment.drop()
// 3. mongo db commands for one rows
// -db.comment.insert({
// 'name':'harry',
// 'lang':'java',
// 'member-since': 5
// })
// 4. db for many rows
// -db.comment.insertMany([{
// 'name':'harry',
// 'lang':'java',
// 'member-since': 5
// },
// {
// 'name':'raj',
// 'lang':'php',
// 'member-since': 2
// },
// {
// 'name':'manjes',
// 'lang':'python',
// 'member-since': 3
// }])
// 5. to find the fields (to see all rows in the collections)
// -db.comment.find().pretty()
// 6.insert date
// -db.comment.insert({
// 'name':'harry',
// 'lang':'java',
// 'member-since': 5,
// 'date':new Date()
// })
// 7. search in database
// -db.comment.find({name: 'manjes',lang:'python'})
// 8.db.comment.find().sort({menber-since:1}).pretty() #acending if -1 then it works descending order
// 9.find the first row matching the object
// -db.comment.findOne({name:'manjes'})
// 10. to update a row
// -db.comment.update({name:'raj'},
// {'name':'raj',
// 'lang':'php',
// 'member-since': 21})
// 11. db rename
// -db.comment.update({name:'harry'},
// {$rename:{member-since:'member'}})
// 12. delete row
// -db.comment.remove({name:'raj'})

// //mailjet secret key :-e444567ab3aa402e8e9f42678247da60

// 2xx: Success
// 200 OK: The request succeeded (e.g., data fetched successfully).
// 201 Created: Used when a resource is successfully created (e.g., a new product or user).
// 204 No Content: The request succeeded but there is no content to send in the response (e.g., after a successful delete operation).
// 3xx: Redirection
// Rarely used in API-based MERN apps. You may encounter:
// 301 Moved Permanently: If a resource URL changes.
// 307 Temporary Redirect: If a resource is temporarily located elsewhere.
// 4xx: Client Errors
// 400 Bad Request: The request is invalid (e.g., missing required fields in the request body).
// 401 Unauthorized: Authentication is required or invalid (e.g., token missing or expired).
// 403 Forbidden: The client does not have permission to access the resource (e.g., trying to delete someone else's data).
// 404 Not Found: The requested resource does not exist (e.g., invalid product ID).
// 422 Unprocessable Entity: Validation error on input data.
// 5xx: Server Errors
// 500 Internal Server Error: A generic error indicating something went wrong on the server.
// 503 Service Unavailable: The server is temporarily unable to handle the request (e.g., maintenance mode).
