"use client"
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function DeletePage(props) {
  const router =useRouter();

  const deleteRecord = async () => {
    console.log(props);
    let response = await fetch(`/api/pages/${props.slug}`, {
      method: "DELETE"
    });
    response = await response.json();

    if (response.success) {
    
      router.push("/admin/pages");
      toast.success("Page Deleted successful");
    }
  };

  return <button className="mx-2 btn btn-secondary btn-xs" onClick={deleteRecord}>Delete</button>;



};
