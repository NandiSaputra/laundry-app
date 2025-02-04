/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        regular: ["ComicNeue-Regular"],
        bolds: ["ComicNeue-Bold"],
        light: ["ComicNeue-Light"],
        italic: ["ComicNeue-Italic"],
        boldItalic: ["ComicNeue-BoldItalic"],
        lightItalic: ["ComicNeue-LightItalic"],
        interBold: ["Inter-Bold"],
        interItalic: ["InterVariable-Italic"],
        interVariabel: ["InterVariabel"],
        interMedium: ["Inter-Medium"],
      },
    },
    plugins: [],
  },
};
