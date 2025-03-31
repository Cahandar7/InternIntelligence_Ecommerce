import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import slugify from "slugify";
import Swal from "sweetalert2";
import CartTopBanner from "../components/CartTopBanner";
import supabase from "../supabase/supabaseClient";

const CartPage = () => {
  const [inputPromo, setInputPromo] = useState("");
  const [promocodes, setPromocodes] = useState(["UNEC777", "TRY6C"]);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  const navigate = useNavigate();
  const {
    isEmpty,
    items,
    updateItemQuantity,
    removeItem,
    cartTotal,
    emptyCart,
  } = useCart();

  const applyPromoCode = (e) => {
    e.preventDefault();

    if (promocodes.includes(inputPromo)) {
      Swal.fire({
        title: "Promo Code Applied!",
        text: "Your discount has been successfully applied.",
        icon: "success",
      });

      setDiscountApplied(true);
      setDiscountAmount(cartTotal * 0.1);
    } else {
      Swal.fire({
        title: "Invalid Promo Code",
        text: "The promo code you entered is incorrect or expired. Please try again.",
        icon: "error",
      });
    }
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="page">
      <CartTopBanner />
      <Container>
        {isEmpty ? (
          <div className="empty-cart-wishlist-div">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path d="M23.76 4.248c-0.096-0.096-0.24-0.24-0.504-0.24h-18.48l-0.48-2.4c-0.024-0.288-0.384-0.528-0.624-0.528h-2.952c-0.384 0-0.624 0.264-0.624 0.624s0.264 0.648 0.624 0.648h2.424l2.328 11.832c0.312 1.608 1.848 2.856 3.48 2.856h11.28c0.384 0 0.624-0.264 0.624-0.624s-0.264-0.624-0.624-0.624h-11.16c-0.696 0-1.344-0.312-1.704-0.816l14.064-1.92c0.264 0 0.528-0.24 0.528-0.528l1.968-7.824v-0.024c-0.024-0.048-0.024-0.288-0.168-0.432zM22.392 5.184l-1.608 6.696-14.064 1.824-1.704-8.52h17.376zM8.568 17.736c-1.464 0-2.592 1.128-2.592 2.592s1.128 2.592 2.592 2.592c1.464 0 2.592-1.128 2.592-2.592s-1.128-2.592-2.592-2.592zM9.888 20.328c0 0.696-0.624 1.32-1.32 1.32s-1.32-0.624-1.32-1.32 0.624-1.32 1.32-1.32 1.32 0.624 1.32 1.32zM18.36 17.736c-1.464 0-2.592 1.128-2.592 2.592s1.128 2.592 2.592 2.592c1.464 0 2.592-1.128 2.592-2.592s-1.128-2.592-2.592-2.592zM19.704 20.328c0 0.696-0.624 1.32-1.32 1.32s-1.344-0.6-1.344-1.32 0.624-1.32 1.32-1.32 1.344 0.624 1.344 1.32z"></path>
            </svg>
            <h1 className="empty-cart-wishlist-h1">
              YOUR SHOPPING CART IS EMPTY
            </h1>
            <p className="empty-cart-wishlist-p">
              We invite you to get acquainted with an assortment of our shop.
              Surely you can find something for yourself!
            </p>
            <Link to={"/shop"} className="empty-cart-wishlis-btn">
              RETURN TO SHOP
            </Link>
          </div>
        ) : (
          <Row className="mt-2 mb-5 mx-4">
            <Col sm={12} md={7} lg={8} className="cart-div">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">PRODUCT</th>
                    <th scope="col"></th>
                    <th scope="col">PRICE</th>
                    <th scope="col">SKU</th>
                    <th scope="col">QUANTITY</th>
                    <th scope="col">SUBTOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td style={{ width: "5em" }}>
                        <img
                          src={item.image}
                          alt={item.title}
                          width="80"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            navigate(`/shop/${slugify(item.title)}`)
                          }
                        />
                      </td>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            flexDirection: "column",
                          }}
                        >
                          {item.title}
                          <button
                            className="delete-btn"
                            onClick={() => {
                              removeItem(item.id);
                              window.location.reload();
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                      <td>${item.price}</td>
                      <td style={{ opacity: "0.5" }}>0{item.sku}</td>
                      <td>
                        <div className="quantity-box">
                          <button
                            className="quantity-btn"
                            onClick={() =>
                              updateItemQuantity(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                          <span className="quantity-count">
                            {item.quantity}
                          </span>
                          <button
                            className="quantity-btn"
                            onClick={() => {
                              if (item.quantity > 1) {
                                updateItemQuantity(item.id, item.quantity - 1);
                              } else {
                                removeItem(item.id);
                                window.location.reload();
                              }
                            }}
                          >
                            -
                          </button>
                        </div>
                      </td>
                      <td>${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="promocode-clear-box">
                <form onSubmit={applyPromoCode}>
                  <div className="promocode">
                    <input
                      type="text"
                      placeholder="Enter promocode"
                      value={inputPromo}
                      onChange={(e) => setInputPromo(e.target.value)}
                      disabled={discountApplied}
                    />
                    <button type="submit" disabled={discountApplied}>
                      {discountApplied ? "Applied" : "Ok"}
                    </button>
                  </div>
                </form>

                <button
                  className="clear-cart-btn"
                  onClick={() => {
                    emptyCart();
                    setInputPromo("");
                    setDiscountApplied(false);
                    setDiscountAmount(0);
                    window.location.reload();
                  }}
                >
                  <FontAwesomeIcon icon={faTrashAlt} className="trash-icon" />
                  Clear shopping cart
                </button>
              </div>
            </Col>
            <Col sm={12} md={5} lg={4} className="cart-totals">
              <h2>Cart totals</h2>
              <hr />
              <div className="subtotal">
                <p>Subtotal </p>
                <span>
                  $
                  {new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(cartTotal)}
                </span>
              </div>
              <div className="shipping">
                <p>Shipping </p>
                <span>Flat Rate: $5.00</span>
              </div>
              <div className="total">
                <p>total </p>
                {discountApplied ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <span className="line-through-p">
                      $
                      {new Intl.NumberFormat("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(cartTotal + 5)}
                    </span>
                    <span>
                      $
                      {new Intl.NumberFormat("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(cartTotal + 5 - discountAmount)}
                    </span>
                  </div>
                ) : (
                  <span>
                    $
                    {new Intl.NumberFormat("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(cartTotal + 5)}
                  </span>
                )}
              </div>
              <button
                onClick={() => {
                  if (user) {
                    navigate("/cart/checkout", {
                      state: { totalSum: cartTotal + 5 - discountAmount },
                    });
                  } else {
                    Swal.fire({
                      title: "Warning!",
                      text: "Login First",
                      icon: "warning",
                      confirmButtonText: "Login",
                    }).then((res) => {
                      if (res.isConfirmed) {
                        navigate("/account/login");
                      }
                    });
                  }
                }}
                className="to-checkout"
              >
                Proceed to checkout
              </button>
              <Link to={"/shop"} className="to-shopping">
                Continue shopping
              </Link>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default CartPage;
