// app/api/jakarta/route.ts
import supabase from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		// Fetch data dari tabel Jakarta
		const { data, error } = await supabase.from("jakarta").select("*"); // Ambil semua kolom

		if (error) {
			throw new Error(error.message);
		}

		// Return response JSON
		return NextResponse.json(data, { status: 200 });
	} catch (error: any) {
		console.error("Error fetching data from Jakarta:", error);
		return NextResponse.json(
			{ error: "Internal Server Error", details: error.message },
			{ status: 500 }
		);
	}
}
