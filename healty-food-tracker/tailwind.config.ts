import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primaryBlue': '#0017EE', //highlights
        'SCGreen': '#C4D1CE',
        'SBGreen': '#DCE5E4',
        'SCBlue': '#BDCAD1',
        'SBBlue': '#DCE1E5',
        'SCBeige': '#E1CFBF',
        'SBBeige': '#EBE8E3',
        'SCPink': '#DCC8C2',
        'SBPink': '#EBE5E3',
        'black': '#000000',
        'grey90': '#242424',
        'grey70': '#747474',
        'grey30': '#C4C4C4',
        'grey10': '#F4F4F4',
        'white': '#FFFFFF',

        //Own colors added
        'Primary-Color': 'var(--primary-color)',
        'Primary-Color-Dark': 'var(--primary-color-dark)',
        'BTBlue': '#007BFF',
        'BTBlue-dark': '#3B71CA',
        'BTSecondary': '#9FA6B2',
        'BTSuccess': '#14A44D',
        'BTSuccess-dark': '#007E33',
        'BTDanger': '#CC0000',
        'BTDanger-dark': '#DC4C64',
        'BTWarning': '#E4A11B',
        'BTWarning-dark': '#FF8800',
        'BTInfo': '#54B4D3',
        'BTInfo-dark': '#0099CC',
        'BTLight': '#FBFBFB',
        'BTDark': '#332D2D',
      },
    },
  },
  plugins: [],
};
export default config;
