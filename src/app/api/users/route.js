import dbConnect from "@/backend/config/dbConnect";
import User from "@/backend/models/user";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    try {
        await dbConnect();
        const { name, email, password, avatar } = await req.json();

        // Input validation
        if (!name || !email || !password || !avatar) {
            return NextResponse.json(
                { message: "All fields are required." },
                { status: 400 }
            );
        }

        // Check for existing user
        const userExists = await User.findOne({ email });
        if (userExists) {
            return NextResponse.json(
                { message: "Email already exists." },
                { status: 400 }
            );
        }

        const user = await User.create({ name, email, password, avatar });

        return NextResponse.json(
            {
                message: "User created successfully!",
                user
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Server error:", error); // Log the error for debugging
        return NextResponse.json(
            { message: "Server error, please try again!" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await dbConnect();
        const users = await User.find();  
        return NextResponse.json({ result: users, success: true });
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json(
            { result: [], success: false, message: "Error fetching data" },
            { status: 500 }
        );
    }
}
