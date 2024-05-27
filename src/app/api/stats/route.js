// pages/api/stats.js

import dbConnect from "@/backend/config/dbConnect";
import User from "@/backend/models/user";
import Page from "@/backend/models/page";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    await dbConnect();

    // Fetch total users count
    const totalUsers = await User.countDocuments();

    // Fetch published and draft pages count
    const publishedPagesCount = await Page.countDocuments({ status: 'Published' });
    const draftPagesCount = await Page.countDocuments({ status: 'Draft' });

    return NextResponse.json({
      totalUsers,
      publishedPagesCount,
      draftPagesCount,
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { message: "Error fetching stats" },
      { status: 500 }
    );
  }
}
