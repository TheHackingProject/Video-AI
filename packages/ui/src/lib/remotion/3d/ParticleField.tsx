import type React from "react";
import { useMemo } from "react";
import { random, useCurrentFrame } from "remotion";
import { defaultTheme, type Theme } from "../theme";

interface Particle {
	id: string;
	x: number;
	y: number;
	size: number;
	speed: number;
	phase: number;
	color: string;
}

interface ParticleFieldProps {
	width?: number;
	height?: number;
	count?: number;
	colors?: string[];
	speed?: number;
	theme?: Theme;
	style?: React.CSSProperties;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
	width = 1920,
	height = 1080,
	count = 50,
	colors,
	speed = 0.5,
	theme = defaultTheme,
	style,
}) => {
	const frame = useCurrentFrame();

	const particles = useMemo<Particle[]>(() => {
		const palette = colors ?? [
			theme.colors.primary,
			theme.colors.secondary,
			theme.colors.accent,
		];
		return Array.from({ length: count }).map((_, i) => ({
			id: `particle-${i}`,
			x: random(`x-${i}`) * width,
			y: random(`y-${i}`) * height,
			size: 2 + random(`size-${i}`) * 4,
			speed: 0.5 + random(`speed-${i}`) * 1.5,
			phase: random(`phase-${i}`) * Math.PI * 2,
			color:
				palette[Math.floor(random(`color-${i}`) * palette.length)] ??
				theme.colors.primary,
		}));
	}, [
		count,
		width,
		height,
		colors,
		theme.colors.primary,
		theme.colors.secondary,
		theme.colors.accent,
	]);

	return (
		<div
			style={{
				position: "absolute",
				width,
				height,
				overflow: "hidden",
				...style,
			}}
		>
			{particles.map((particle) => {
				const y = (particle.y + frame * particle.speed * speed) % height;
				const x = particle.x + Math.sin(frame * 0.02 + particle.phase) * 20;
				const opacity = 0.3 + Math.sin(frame * 0.05 + particle.phase) * 0.3;

				return (
					<div
						key={particle.id}
						style={{
							position: "absolute",
							left: x,
							top: y,
							width: particle.size,
							height: particle.size,
							backgroundColor: particle.color,
							borderRadius: "50%",
							opacity,
							boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
						}}
					/>
				);
			})}
		</div>
	);
};
