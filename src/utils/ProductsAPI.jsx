import { useEffect, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { get_products } from "../redux_tools/actions/productActions";
import supabase from "../supabase/supabaseClient";
import { LanguageContext } from "../contexts/LanguageContext";

const ProductsAPI = () => {
  const { language } = useContext(LanguageContext);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndTranslateProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("id", { ascending: true });

        if (error) throw new Error(error.message);

        const translatedProducts = data.map((product) => ({
          ...product,
          title: product.title[language] || product.title["en"],
          description:
            product.description[language] || product.description["en"],
          category: product.category[language] || product.category["en"],
          gender: product.gender[language] || product.gender["en"],
          washcare: product.washcare[language] || product.washcare["en"],
          composition:
            product.composition[language] || product.composition["en"],
        }));

        dispatch(get_products(translatedProducts));
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndTranslateProducts();
  }, [language, dispatch]);

  return loading ? <p>Loading products...</p> : null;
};

export default ProductsAPI;
