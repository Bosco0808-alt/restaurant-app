import { getTypes } from "@/actions";
import TypeTemplate from "@/components/TypeTemplate";
import styles from "./order.module.css";

const order = async () => {
  const types = await getTypes();
  return (
    <>
      <div className={styles.flexContainer}>
        {types.map((type) => (
          <TypeTemplate key={type.id} id={type.id} name={type.name} />
        ))}
      </div>
    </>
  );
};

export default order;
