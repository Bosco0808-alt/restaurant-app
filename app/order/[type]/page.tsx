import { getProducts, addOrder } from "@/actions";
import Product from "@/components/ProductTemplate";
import styles from "@/app/order/order.module.css";
import SubmitOrderButton from "@/components/SubmitOrderButton";

const type = async ({ params }: { params: { type: string } }) => {
  const products = await getProducts(params.type);
  return (
    <>
      <div className={styles.flexContainer}>
        {products.map((product) => (
          <Product
            prodId={product.id}
            prodName={product.name}
            prodPrice={Number(product.price)}
            key={product.id}
          />
        ))}
      </div>
      <SubmitOrderButton addOrder={addOrder} />
    </>
  );
};

export default type;
