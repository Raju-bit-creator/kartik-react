import React, { useContext } from "react";
import productContext from "../context/porductContext";
import Apple from "../assets/apple.jpeg";

const CartItems = () => {
  const context = useContext(productContext);
  const {
    state: { cart },
    dispatch,
  } = context;
  const Total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  return (
    <div className="container mt-4 cart-page">
      <div className="productContianer-cart col-md-9">
        <ul className="list-group">
          {cart &&
            cart.map((item) => {
              return (
                <li className="list-group-item" key={item._id}>
                  <div className="row">
                    <div className="col-md-2">
                      <img
                        src={`http://localhost:5000/uploads/${item.images}`}
                        height={50}
                        width={50}
                        alt="product"
                      />
                    </div>
                    <div className="col-md-2">
                      <h4>{item.title}</h4>
                    </div>
                    <div className="col-md-2">
                      <h4>{item.price}</h4>
                    </div>
                    <div className="col-md-2">
                      <select
                        value={item.qty}
                        onChange={(e) =>
                          dispatch({
                            type: "CHANGE_CART_QTY",
                            payload: {
                              _id: item._id,
                              qty: e.target.value,
                            },
                          })
                        }
                        className="form-control"
                      >
                        {[...Array(item.instock).keys()].map((x) => (
                          <option key={x + 1}>{x + 1}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
      <div className="filter-summary">
        <div className="title">Total cart items:{cart.length}</div>
        <h4>Total: {Total}</h4>
        <button className="btn btn-primary ">proceed to checkout</button>
      </div>
    </div>
  );
};

export default CartItems;
