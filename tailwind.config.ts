
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
					50: '#FFF2F8',
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
					50: '#F0F9FF',
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
					50: '#F0FDF4',
					100: '#DCFCE7',
					200: '#BBF7D0',
					300: '#86EFAC',
					400: '#4ADE80',
					500: '#22C55E',
					600: '#16A34A',
					700: '#15803D',
					800: '#166534',
					900: '#14532D'
				},
				mars: {
					50: '#FFF4F1',
					100: '#FFE4DE',
					200: '#FECACA',
					300: '#FCA5A5',
					400: '#F87171',
					500: '#EF4444',
					600: '#DC2626',
					700: '#B91C1C',
					800: '#991B1B',
					900: '#7F1D1D',
					950: '#450A0A'
				},
				amber: {
					50: '#FFFBEB',
					100: '#FEF3C7',
					200: '#FDE68A',
					300: '#FCD34D',
					400: '#FBBF24',
					500: '#F59E0B',
					600: '#D97706',
					700: '#B45309',
					800: '#92400E',
					900: '#78350F'
				},
				sunset: {
					100: '#FFEDD5',
					200: '#FED7AA',
					300: '#FDBA74',
					400: '#FB923C',
					500: '#F97316',
					600: '#EA580C',
					700: '#C2410C',
					800: '#9A3412',
					900: '#7C2D12'
				},
				midnight: {
					100: '#E0E7FF',
					200: '#C7D2FE',
					300: '#A5B4FC',
					400: '#818CF8',
					500: '#6366F1',
					600: '#4F46E5',
					700: '#4338CA',
					800: '#3730A3',
					900: '#312E81'
				},
				retro: {
					100: '#F5F5F0',
					200: '#E8E5D7',
					300: '#D5CFC0',
					400: '#BCB5A4',
					500: '#9B9485',
					600: '#827D6F',
					700: '#5E4C3E',
					800: '#483A2F',
					900: '#2D241F'
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
				},
				'zoom-in': {
					'0%': { transform: 'scale(0.8)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'bounce-in': {
					'0%': { transform: 'scale(0.3)', opacity: '0' },
					'50%': { transform: 'scale(1.05)', opacity: '0.8' },
					'70%': { transform: 'scale(0.9)', opacity: '1' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'pulse-heart': 'pulse-heart 1.5s ease-in-out infinite',
				'slide-up': 'slide-up 0.5s ease-out',
				'wiggle': 'wiggle 1s ease-in-out infinite',
				'zoom-in': 'zoom-in 0.5s ease-out',
				'bounce-in': 'bounce-in 0.8s ease-out'
			},
			backgroundImage: {
				'love-gradient': 'linear-gradient(to right, #ee9ca7, #ffdde1)',
				'purple-gradient': 'linear-gradient(102.3deg, rgba(147,39,143,1) 5.9%, rgba(234,172,232,1) 64%, rgba(246,219,245,1) 89%)',
				'space-gradient': 'linear-gradient(to right, #0f0c29, #302b63, #24243e)',
				'galaxy-gradient': 'linear-gradient(315deg, #7f53ac 0%, #647dee 74%)',
				'mars-gradient': 'linear-gradient(to right, #431109, #611818, #300A0A)',
				'ocean-gradient': 'linear-gradient(to right, #4facfe, #00f2fe)',
				'forest-gradient': 'linear-gradient(to right, #56ab2f, #a8e063)',
				'sunset-gradient': 'linear-gradient(to right, #f97316, #c084fc)',
				'midnight-gradient': 'linear-gradient(to right, #0c1330, #1e3a8a)',
				'retro-gradient': 'linear-gradient(to right, #9a8478, #5e4c3e)'
			},
			fontFamily: {
				'dancing': ['Dancing Script', 'cursive'],
				'quicksand': ['Quicksand', 'sans-serif'],
				'poppins': ['Poppins', 'sans-serif'],
				'montserrat': ['Montserrat', 'sans-serif'],
				'serif': ['Merriweather', 'serif'],
				'fredoka': ['Fredoka One', 'cursive']
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
