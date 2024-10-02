// app/api/jakarta/route.ts
import supabase from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		const { data, error } = await supabase.from("sekolah").select("*");

		if (error) {
			throw new Error(error.message);
		}

		return NextResponse.json(data, { status: 200 });
	} catch (error: any) {
		console.error("Error fetching data from Sekolah:", error);
		return NextResponse.json(
			{ error: "Internal Server Error", details: error.message },
			{ status: 500 }
		);
	}
}
