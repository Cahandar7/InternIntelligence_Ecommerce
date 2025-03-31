import React, { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    try {
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product) => {
    if (!wishlist.some((wishlistItem) => wishlistItem.id === product.id)) {
      setWishlist([...wishlist, product]);
    }
  };

  const removeFromWishlist = (product) => {
    setWishlist(wishlist.filter((item) => item.id !== product.id));
  };

  const isInWishlist = (product) => {
    return wishlist.some((item) => item.id === product.id);
  };

  const wishlistItems = wishlist;

  const wishlistItemsCount = wishlist.length;

  const wishlistIsEmpty = () => wishlist.length === 0;

  const clearWishlist = () => setWishlist([]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        wishlistItems,
        wishlistItemsCount,
        wishlistIsEmpty,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
