import React, { createContext, useEffect, useState } from "react";
import "./ShopContext.css";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 301; index++) {
    cart[index] = 0;
  }
  return cart;
};

// ✅ CORRECT ENV FOR CRA
const API_URL = process.env.REACT_APP_API_URL;

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  const [alert, setAlert] = useState({
    message: "",
    type: "",
    visible: false,
  });

  const showAlert = (message, type = "error") => {
    setAlert({ message, type, visible: true });

    setTimeout(() => {
      setAlert({ message: "", type: "", visible: false });
    }, 3000);
  };

  // ✅ GET ALL PRODUCTS
  useEffect(() => {
    fetch(`${API_URL}/allproducts`)
      .then((response) => response.json())
      .then((data) => {
        console.log("PRODUCTS:", data);
        setAll_Product(data);
      })
      .catch((err) => {
        console.error("ERROR FETCHING PRODUCTS:", err);
      });
  }, []);

  // ✅ ADD TO CART
  const addToCart = (itemId) => {
    const token = localStorage.getItem("auth-token");

    if (!token) {
      showAlert("Logohuni per te vazhduar", "error");
      return;
    }

    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    fetch(`${API_URL}/addtocart`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "auth-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId }),
    });

    showAlert("Produkti i shtuar ne karte", "success");
  };

  // ✅ REMOVE FROM CART
  const removeFromCart = (itemId) => {
    const token = localStorage.getItem("auth-token");

    if (!token) {
      showAlert("Logohuni per te vazhduar", "error");
      return;
    }

    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }));

    fetch(`${API_URL}/removefromcart`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "auth-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId }),
    });

    showAlert("Produkti i hequr nga karta", "success");
  };

  // ✅ TOTAL AMOUNT
  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );

        if (itemInfo) {
          totalAmount += cartItems[item] * itemInfo.new_price;
        }
      }
    }

    return totalAmount;
  };

  // ✅ TOTAL ITEMS
  const getTotalCartItems = () => {
    let totalItem = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }

    return totalItem;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}

      {alert.visible && (
        <div className={`toast ${alert.type}`}>
          <span className="toast-message">{alert.message}</span>

          <button
            className="toast-close"
            onClick={() =>
              setAlert({ ...alert, visible: false })
            }
          >
            ✖
          </button>
        </div>
      )}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;