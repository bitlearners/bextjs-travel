import dbConnect from "@/backend/config/dbConnect";
import Page from "@/backend/models/Page"; // Ensure this path is correct
import { NextResponse } from "next/server";

// POST request handler

export async function POST(req) {
    try {
      await dbConnect();
      const body = await req.json();
  
      console.log("Received data:", body);
  
      const { pageName, slug, imageUrl } = body;
      if (!pageName || !slug || !imageUrl) {
        console.error("Missing required fields:", { pageName, slug, imageUrl });
        return NextResponse.json(
          { message: "Missing required fields: pageName, slug, and imageUrl" ,status: 400 },
         
        );
      }
  
      // Check for existing page with the same slug
      const existingPage = await Page.findOne({ slug });
      if (existingPage) {
        console.error("Duplicate slug error:", { slug });
        return NextResponse.json(
          { message: `A page with the slug '${slug}' already exists.`,status: 409  },
          
        );
      }
  
      const page = await Page.create(body);
  
      return NextResponse.json(
        {
          message: "Page created successfully!",
          page,
        },
        {
          status: 200,
        }
      );
    } catch (error) {
      console.error("Server error:", error);
      return NextResponse.json(
        { message: "Server error, please try again!", error: error.message },
        { status: 500 }
      );
    }
  }

// Function to fetch page by slug
async function fetchPageBySlug(slug) {
    try {
        await dbConnect();
        const page = await Page.findOne({ slug });
        return page;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Database query failed");
    }
}

// GET request handler
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const slug = searchParams.get('slug');
        if (!slug) {
            return NextResponse.json({ success: false, error: "Slug is required" }, { status: 400 });
        }

        const page = await fetchPageBySlug(slug);
        if (!page) {
            return NextResponse.json({ success: false, error: "Page not found" }, { status: 404 });
        }

        return NextResponse.json({ result: page, success: true }, { status: 200 });
    } catch (error) {
        console.error("GET handler error:", error);
        return NextResponse.json({ result: "error", success: false }, { status: 500 });
    }
}
