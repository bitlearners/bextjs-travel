import dbConnect from "@/backend/config/dbConnect";
import Page from "@/backend/models/Page";

import { NextResponse } from "next/server";

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


export async function GET(req, { params }) {
    const { slug } = params;

    try {
        const page = await fetchPageBySlug(slug);
        if (!page) {
            return NextResponse.json({ success: false, error: "Page not found" });
        }

        if (page.status === 'Draft') {
            return NextResponse.json({ success: false, error: "Page is not found " });
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
        await dbConnect(); 
        result = await Page.deleteOne(recordSlug);
    } catch (error) {
        console.error("Error deleting Page:", error);
        return NextResponse.json({ success: false });
    }
    return NextResponse.json({ result, success: true });
}


export async function PUT(req, { params }) {
    const { slug } = params;
    const updateData = await req.json();
  
    try {
      await dbConnect();
      const result = await Page.findOneAndUpdate({ slug: slug }, updateData, {
        new: true,
        runValidators: true,
      });
  
      if (!result) {
        return NextResponse.json({ success: false, message: "Page not found" }, { status: 404 });
      }
  
      return NextResponse.json({ result, success: true });
    } catch (error) {
      console.error("Error updating Page:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }