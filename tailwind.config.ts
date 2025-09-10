
import type {Config} from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
      './components/**/*.{ts,tsx}',
      './app/**/*.{ts,tsx}',
      './src/**/*.{ts,tsx}',
  ],
  safelist: [
    ...[
        'yellow', 'blue', 'green', 'red', 
        'orange', 'purple', 'brown', 'gray'
    ].flatMap(color => [`highlight-${color}`, `bg-note-${color}`]),
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        'header-break': '900px',
        'quick-jump-break': '1100px',
        'history-break': '1250px',
      },
      fontFamily: {
        heading: ['Alegreya', 'serif'],
        body: ['Alegreya', 'serif'],
        code: ['Source Code Pro', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: {
          DEFAULT: "hsl(var(--input))",
          alt: "hsl(var(--input-alt))",
        },
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        'history-item': {
            DEFAULT: "hsl(var(--history-item))",
            active: "hsl(var(--history-item-active))",
        },
        menubar: {
          DEFAULT: "hsl(var(--menubar-bg))",
        },
        'highlight-yellow': 'hsl(var(--note-yellow))',
        'highlight-blue': 'hsl(var(--note-blue))',
        'highlight-green': 'hsl(var(--note-green))',
        'highlight-red': 'hsl(var(--note-red))',
        'highlight-orange': 'hsl(var(--note-orange))',
        'highlight-purple': 'hsl(var(--note-purple))',
        'highlight-brown': 'hsl(var(--note-brown))',
        'highlight-gray': 'hsl(var(--note-gray))',

        'note-yellow': 'hsl(var(--note-yellow))',
        'note-blue': 'hsl(var(--note-blue))',
        'note-green': 'hsl(var(--note-green))',
        'note-red': 'hsl(var(--note-red))',
        'note-orange': 'hsl(var(--note-orange))',
        'note-purple': 'hsl(var(--note-purple))',
        'note-brown': 'hsl(var(--note-brown))',
        'note-gray': 'hsl(var(--note-gray))',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config

export default config;
