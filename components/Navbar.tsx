import { getTypes } from "@/actions";
import Link from "next/link";

const Navbar = async () => {
  const types = await getTypes();
  return (
    <nav className="navbar navbar-light bg-light">
      <span className="navbar-brand m-2">Types</span>
      {types.map((type) => (
        <Link
          href={`/order/${type.id}`}
          className="nav-item nav-link m-2"
          key={type.id}
        >
          {type.name}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
