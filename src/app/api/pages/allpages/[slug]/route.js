import dbConnect from "@/backend/config/dbConnect";
import Page from "@/backend/models/Page"; // Ensure this path is correct
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { slug } = params;

    try {
        // Connect to the database
        await dbConnect();

        // Find the page by slug
        const page = await Page.findOne({ slug });

        if (!page) {
            // If page not found, return an error response
            return NextResponse.json({ success: false, error: "Page not found" }, { status: 404 });
        }

        // If page found, return the page data
        return NextResponse.json({ result: page, success: true }, { status: 200 });
    } catch (error) {
        console.error("Error handling GET request:", error);

        // Return an error response in case of an exception
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
