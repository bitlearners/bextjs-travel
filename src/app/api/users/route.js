import dbConnect from "@/backend/config/dbConnect";
import User from "@/backend/models/user";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    try {
       await dbConnect();
       const body = await req.json();

       console.log("Received data:", body); // Log the received data

       const user = await User.create(body);

       return NextResponse.json({
            message: "User Created successfully!",
            user
       }, {
            status: 200
       });
    } catch (error) {
        console.error("Server error:", error); // Log the error for debugging
        return NextResponse.json(
            { message: "Server error, please try again!" },
            { status: 500 }
        );
    }
}

export async function GET() {
    let data=[]
   try{
    await dbConnect();
       data = await User.find();
   }
catch(error)
{
        data={success:false};
        console.error("Error fetching data:", error);
}
        return NextResponse.json({result:data,success:true});
   
}


