/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Sourced from Taylor Plumbing & Heating's real logo/site (gold #ffdd11 + logo blue + near-black).
        // Gold is reserved for fills/backgrounds and text-on-dark (matches the original site's yellow-on-black
        // banners); blue carries small text/links on light backgrounds where raw gold reads too low-contrast.
        primary: '#EFC12E',        // brand gold (fills, buttons w/ dark text, dark-bg headings/icons)
        'primary-dark': '#B8860B', // deep gold (gradients, hover states)
        'primary-light': '#F7DE8A',// pale gold (text/icons on dark sections)
        accent: '#146B9E',         // logo blue (text, links, icons on light backgrounds)
        'accent-dark': '#0F4F76',
        background: '#FAF8F3',
        surface: '#FFFFFF',
        ink: '#141414',
        muted: '#6B6560',
        divider: '#E8E2D4',
        deep: '#0A0A0A',
      },
      fontFamily: {
        display: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        '2.5xl': '1.25rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
        '7xl': '4rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
