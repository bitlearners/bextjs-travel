"use client"
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function DeleteUser(props) {
  const router =useRouter();

  const deleteRecord = async () => {
    console.log(props);
    let response = await fetch(`/api/auth/register/${props.id}`, {
      method: "DELETE"
    });
    response = await response.json();

    if (response.success) {
    
      router.push("/admin/users");
      toast.success("User Deleted successful");
    }
  };

  return <button className="mx-2 btn btn-secondary btn-xs" onClick={deleteRecord}>Delete</button>;



};
