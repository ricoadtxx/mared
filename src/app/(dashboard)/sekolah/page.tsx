"use client";

import MapSekolah from "@/components/dashboard/sekolah/map/MapSekolah";
import React from "react";

const SekolahPage = () => {
	return (
		<div className="flex h-screen z-[9999]">
			<div className="w-screen h-full">
				<MapSekolah />
			</div>
		</div>
	);
};

export default SekolahPage;
