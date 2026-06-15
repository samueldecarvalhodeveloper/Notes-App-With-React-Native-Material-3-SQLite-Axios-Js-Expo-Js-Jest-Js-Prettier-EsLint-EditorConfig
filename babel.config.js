module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "babel-preset-expo",
        {
          "react-compiler": {
            sources: (filename) =>
              filename.endsWith(".tsx") ||
              filename.endsWith(".ts") ||
              filename.endsWith(".jsx") ||
              filename.endsWith(".js"),
          },
        },
      ],
    ],
  };
};
