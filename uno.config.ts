import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetUno,
  transformerAttributifyJsx,
} from "unocss";

export default defineConfig({
  rules: [
    ["m-1", { margin: "0.25rem" }],
    [
      /^m-(\d+)$/,
      ([, size]) => ({
        margin: `${typeof size === "string" ? parseInt(size) / 4 : 0}rem`,
      }),
    ],
  ],
  shortcuts: [
    {
      "s-red": "text-red px-4",
    },
  ],
  theme: {
    colors: {},
  },
  variants: [
    (matcher) => {
      if (matcher.startsWith("hover:")) {
        return {
          matcher: matcher.slice(6),
        };
      }
      return matcher;
    },
  ],
  extractors: [],
  transformers: [transformerAttributifyJsx()],
  preflights: [],
  safelist: [],
  presets: [presetUno(), presetAttributify(), presetTypography()],
});
