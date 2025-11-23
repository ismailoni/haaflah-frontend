const { fontFamily } = require("tailwindcss/defaultTheme")
const plugin = require("tailwindcss/plugin")

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		container: {
			center: true,
			padding: "1rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			fontFamily: {
				sans: ["var(--font-nunito)", ...fontFamily.sans],
			},
			colors: {
				border: "hsl(var(--color-border) / <alpha-value>)",
				background: "hsl(var(--color-background) / <alpha-value>)",
				foreground: "hsl(var(--color-foreground) / <alpha-value>)",
				card: "hsl(var(--color-card) / <alpha-value>)",
				"card-foreground": "hsl(var(--color-card-foreground) / <alpha-value>)",
				popover: "hsl(var(--color-popover) / <alpha-value>)",
				"popover-foreground": "hsl(var(--color-popover-foreground) / <alpha-value>)",
				primary: "hsl(var(--color-primary) / <alpha-value>)",
				"primary-foreground": "hsl(var(--color-primary-foreground) / <alpha-value>)",
				secondary: "hsl(var(--color-secondary) / <alpha-value>)",
				"secondary-foreground": "hsl(var(--color-secondary-foreground) / <alpha-value>)",
				muted: "hsl(var(--color-muted) / <alpha-value>)",
				"muted-foreground": "hsl(var(--color-muted-foreground) / <alpha-value>)",
				accent: "hsl(var(--color-accent) / <alpha-value>)",
				"accent-foreground": "hsl(var(--color-accent-foreground) / <alpha-value>)",
				destructive: "hsl(var(--color-destructive) / <alpha-value>)",
				input: "hsl(var(--color-input) / <alpha-value>)",
				ring: "hsl(var(--color-ring) / <alpha-value>)",
				"chart-1": "hsl(var(--color-chart-1) / <alpha-value>)",
				"chart-2": "hsl(var(--color-chart-2) / <alpha-value>)",
				"chart-3": "hsl(var(--color-chart-3) / <alpha-value>)",
				"chart-4": "hsl(var(--color-chart-4) / <alpha-value>)",
				"chart-5": "hsl(var(--color-chart-5) / <alpha-value>)",

				/* Sidebar-specific tokens used by the UI components */
				sidebar: "hsl(var(--color-sidebar) / <alpha-value>)",
				"sidebar-foreground": "hsl(var(--color-sidebar-foreground) / <alpha-value>)",
				"sidebar-primary": "hsl(var(--color-sidebar-primary) / <alpha-value>)",
				"sidebar-primary-foreground": "hsl(var(--color-sidebar-primary-foreground) / <alpha-value>)",
				"sidebar-accent": "hsl(var(--color-sidebar-accent) / <alpha-value>)",
				"sidebar-accent-foreground": "hsl(var(--color-sidebar-accent-foreground) / <alpha-value>)",
				"sidebar-border": "hsl(var(--color-sidebar-border) / <alpha-value>)",
				"sidebar-ring": "hsl(var(--color-sidebar-ring) / <alpha-value>)",
			},
			height: {
				svh: "100svh",
			},
			minHeight: {
				svh: "100svh",
			},
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		/* small helper to generate `has-*` variant used in some components */
		plugin(function ({ addVariant }) {
			addVariant("has", ".has-\"&\"")
		}),
	],
}
