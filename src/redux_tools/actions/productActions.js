import supabase from "../../supabase/supabaseClient";

export const get_products = (products) => {
  return {
    type: "GET_PRODUCTS",
    payload: products,
  };
};

export const add_product = async (product) => {
  const { data, error } = await supabase.from("products").insert(product);
  if (error) {
    console.log(error);
  }
  window.location.reload();
};

export const edit_product = async (productId, uptatedProduct) => {
  const { data, error } = await supabase
    .from("products")
    .update(uptatedProduct)
    .eq("id", productId);
  if (error) {
    console.log(error);
  }
  window.location.reload();
};

export const delete_product = async (productId) => {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);

  if (error) {
    console.log(error);
    return;
  }

  const { data, error2 } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: true });

  if (error2) {
    console.log(error2);
    return;
  }

  for (let i = 0; i < data.length; i++) {
    await supabase
      .from("products")
      .update({ id: i + 1 })
      .eq("id", data[i].id);
  }

  window.location.reload();
};
