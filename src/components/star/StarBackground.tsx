"use client";

import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";

const StarBackground = (props: any) => {
	const ref: any = useRef();
	const [sphere] = useState(() =>
		random.inSphere(new Float32Array(5000), { radius: 1.2 })
	);
	const { mouse } = useThree(); // Get mouse position from useThree

	useFrame((state, delta) => {
		ref.current.rotation.x -= delta / 10;
		ref.current.rotation.y -= delta / 10;

		ref.current.rotation.x += mouse.x * delta * 0.5;
		ref.current.rotation.y += mouse.y * delta * 0.5;
	});

	return (
		<group rotation={[0, 0, Math.PI / 4]}>
			<Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
				<PointMaterial
					transparent
					color="#fff"
					size={0.002}
					sizeAttenuation={true}
					depthWrite={false}
				/>
			</Points>
		</group>
	);
};

const StarsCanvas = () => (
	<div className="w-full h-auto fixed inset-0 z-[20]">
		<Canvas camera={{ position: [0, 0, 1] }}>
			<Suspense fallback={null}>
				<StarBackground />
			</Suspense>
		</Canvas>
	</div>
);

export default StarsCanvas;
