import dbConnect from "@/backend/config/dbConnect";
import User from "@/backend/models/user";
import { NextResponse } from "next/server";


export async function DELETE(req, content) {
    const userId = content.params.userid;
    const recordId = { _id: userId };
    let result = {};
    try {
        await dbConnect(); // Connect to the database
        result = await User.deleteOne(recordId); // Delete the product
    } catch (error) {
        console.error("Error deleting User:", error);
        return NextResponse.json({ success: false });
    }
    return NextResponse.json({ result, success: true });
}

export async function PUT(req, content) {
    const userId = content.params.userid;
    const filter = { _id: userId };
    const payload = await req.json();
    let result = {};
    try {
        await dbConnect(); // Connect to the database
        result = await User.findByIdAndUpdate(filter, payload); // Update the product
    } catch (error) {
        console.error("Error updating User:", error);
        return NextResponse.json({ success: false });
    }
    return NextResponse.json({ result, success: true });
}

export async function GET(req, content) {
    const userId = content.params.userid;
    const recordId = { _id: userId };
    let result = {};
    try {
        await dbConnect(); // Connect to the database
        result = await User.findById(recordId); // Find the product by ID
    } catch (error) {
        console.error("Error fetching User:", error);
        return NextResponse.json({ success: false });
    }
    return NextResponse.json({ result, success: true });
}



