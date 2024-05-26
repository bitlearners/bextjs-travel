import dbConnect from "@/backend/config/dbConnect";
import Page from "@/backend/models/page";
import { NextResponse } from "next/server";

// Function to fetch page by slug
async function fetchPageBySlug(slug) {
    try {
        await dbConnect();
        const page = await Pages.findOne({ slug });
        return page;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Database query failed");
    }
}

// API GET handler for dynamic slug
export async function GET(req, { params }) {
    const { slug } = params;

    try {
        const page = await fetchPageBySlug(slug);
        if (!page) {
            return NextResponse.json({ success: false, error: "Page not found" });
        }
        return NextResponse.json({ result: page, success: true });
    } catch (error) {
        console.error("Error handling GET request:", error);
        return NextResponse.json({ result: "error", success: false });
    }
}


export async function DELETE(req, content) {
    const PageSlug = content.params.slug;
    const recordSlug = { slug: PageSlug };
    let result = {};
    try {
        await dbConnect(); // Connect to the database
        result = await Page.deleteOne(recordSlug); // Delete the Page
    } catch (error) {
        console.error("Error deleting Page:", error);
        return NextResponse.json({ success: false });
    }
    return NextResponse.json({ result, success: true });
}
