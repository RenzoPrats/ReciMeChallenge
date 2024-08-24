import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  try {
    const filePath = path.join(
      process.cwd(),
      "src",
      "app",
      "trendingRecipes.json"
    );
    const fileContents = fs.readFileSync(filePath, "utf8");
    const trendingRecipes = JSON.parse(fileContents);
    return NextResponse.json(trendingRecipes, { status: 200 });
  } catch (error) {
    return NextResponse.json({}, { status: 500 });
  }
}
