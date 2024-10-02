// app/api/visitor/route.ts
import supabase from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const { latitude, longitude } = await req.json();

		// Buat point geometry untuk PostgreSQL
		const point = `POINT(${longitude} ${latitude})`;

		// Insert data ke tabel visitor
		const { data, error } = await supabase.from("visitor").insert([
			{
				koordinat_visitor: point,
			},
		]);

		if (error) {
			throw new Error(error.message);
		}

		return NextResponse.json(data, { status: 201 });
	} catch (error: any) {
		console.error("Error inserting data into visitor:", error);
		return NextResponse.json(
			{ error: "Internal Server Error", details: error.message },
			{ status: 500 }
		);
	}
}
