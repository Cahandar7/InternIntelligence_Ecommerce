const product_reducer = (state = [], action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return action.payload;
    default:
      return state;
  }
};

export default product_reducer;
