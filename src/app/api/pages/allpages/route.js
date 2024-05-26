// /pages/api/allpages.js
import dbConnect from "@/backend/config/dbConnect";
import Page from "@/backend/models/page";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    try {
        await dbConnect();
        const pages = await Page.find();
        return NextResponse.json({ success: true, result: pages }, { status: 200 });
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ success: false, message: "Server error, please try again!" }, { status: 500 });
    }
}
