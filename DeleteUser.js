"use client"

import { useRouter } from "next/navigation";

export default function DeleteProduct(props) {
  const router =useRouter();

  

  const deleteRecord = async () => {
    let response = await fetch(`/api/product/${props.id}`, {
      method: "DELETE"
    });
    response = await response.json();

    if (response.success) {
      alert("Product deleted");
      router.push("/product");
    }
  };

  return <button onClick={deleteRecord}>Delete</button>;
};
