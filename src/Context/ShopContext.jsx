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

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  // 🔥 ALERT STATE
  const [alert, setAlert] = useState({
    message: "",
    type: "",
    visible: false,
  });

  // 🔥 ALERT FUNCTION
  const showAlert = (message, type = "error") => {
    setAlert({ message, type, visible: true });

    setTimeout(() => {
      setAlert({ message: "", type: "", visible: false });
    }, 3000);
  };

  useEffect(() => {
    fetch("http://localhost:4001/allproducts")
      .then((response) => response.json())
      .then((data) => setAll_Product(data));
  }, []);

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

    fetch("http://localhost:4001/addtocart", {
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

    fetch("http://localhost:4001/removefromcart", {
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

      {/* 🔥 TOAST ALERT */}
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