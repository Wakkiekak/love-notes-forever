
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				love: {
					100: '#FEE5F0',
					200: '#FDC9E0',
					300: '#FBADCF',
					400: '#F690BF',
					500: '#F46BA8',
					600: '#D14A89',
					700: '#AE2E69',
					800: '#8B184A',
					900: '#680A33'
				},
				purple: {
					100: '#E5DEFF',
					200: '#C7BCFA',
					300: '#A89BF5',
					400: '#9B87F5',
					500: '#7E69AB',
					600: '#6E59A5',
					700: '#5A4886',
					800: '#473967',
					900: '#342A48'
				},
				ocean: {
					100: '#DBEAFE',
					200: '#BFDBFE',
					300: '#93C5FD',
					400: '#60A5FA',
					500: '#3B82F6',
					600: '#2563EB',
					700: '#1D4ED8',
					800: '#1E40AF',
					900: '#1E3A8A'
				},
				forest: {
					100: '#DCFCE7',
					200: '#BBF7D0',
					300: '#86EFAC',
					400: '#4ADE80',
					500: '#22C55E',
					600: '#16A34A',
					700: '#15803D',
					800: '#166534',
					900: '#14532D'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-heart': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.1)' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'wiggle': {
					'0%, 100%': { transform: 'rotate(-3deg)' },
					'50%': { transform: 'rotate(3deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'pulse-heart': 'pulse-heart 1.5s ease-in-out infinite',
				'slide-up': 'slide-up 0.5s ease-out',
				'wiggle': 'wiggle 1s ease-in-out infinite'
			},
			backgroundImage: {
				'love-gradient': 'linear-gradient(to right, #ee9ca7, #ffdde1)',
				'purple-gradient': 'linear-gradient(102.3deg, rgba(147,39,143,1) 5.9%, rgba(234,172,232,1) 64%, rgba(246,219,245,1) 89%)',
				'space-gradient': 'linear-gradient(to right, #0f0c29, #302b63, #24243e)',
				'galaxy-gradient': 'linear-gradient(315deg, #7f53ac 0%, #647dee 74%)',
				'mars-gradient': 'linear-gradient(to right, #f83600, #f9d423)',
				'ocean-gradient': 'linear-gradient(to right, #4facfe, #00f2fe)',
				'forest-gradient': 'linear-gradient(to right, #56ab2f, #a8e063)'
			},
			fontFamily: {
				'dancing': ['Dancing Script', 'cursive'],
				'quicksand': ['Quicksand', 'sans-serif'],
				'poppins': ['Poppins', 'sans-serif'],
				'montserrat': ['Montserrat', 'sans-serif'],
				'serif': ['Merriweather', 'serif']
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
