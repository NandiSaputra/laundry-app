module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          safe: false, // Jika true, akan memeriksa apakah semua variabel sudah diisi
          allowUndefined: true, // Jika true, mengizinkan variabel yang tidak terdefinisi
        },
      ],
    ],
  };
};
