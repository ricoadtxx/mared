"use client";

import MapZonasi from "@/components/dashboard/zonasi/MapZonasi";
import React from "react";

const ZonasiPage = () => {
	return (
		<div className="flex h-screen z-50">
			<div className="w-screen h-full">
				<MapZonasi />
			</div>
		</div>
	);
};

export default ZonasiPage;
