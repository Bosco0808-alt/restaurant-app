import Link from "next/link";

interface TypeTemplateProps {
  id: string;
  name: string;
}

const TypeTemplate = ({ id, name }: TypeTemplateProps) => {
  return (
    <Link
      href={`/order/${id}`}
      style={{ color: "black", textDecoration: "none" }}
    >
      {name}
    </Link>
  );
};

export default TypeTemplate;
