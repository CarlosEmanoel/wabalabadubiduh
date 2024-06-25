/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary_blue: 'var(--primary-blue)',
        secondary_blue: 'var(--secondary-blue)',
        tertiary_blue: 'var(--tertiary-blue)',
        primary_blue_hover: 'var(--primary-blue-hover)',
        primary_blue_transparent_hover: 'var(--primary-blue-transparent-hover)',
        secondary_blue_hover: 'var(--secondary-blue-hover)',
        error: 'var(--error)',
        error_hover: 'var(--error-hover)',
        success: 'var(--success)',
        success_hover: 'var(--success-hover)',
        warning: 'var(--warning)',
        warning_hover: 'var(--warning-hover)',
        info: 'var(--info)',
        info_hover: 'var(--info-hover)',
        black_transparent: '#000000aa'
      }
    },
  },
  plugins: [],
}

