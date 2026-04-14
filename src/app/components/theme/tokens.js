/* ============================================
   THEME ENGINE
   Sets semantic CSS custom properties on :root.
   Token names mirror the design system in globals.css.
   ============================================ */

/* ---- Primitive palette ---- */
const NEUTRAL_BLACK = "#3E3E3E";
const NEUTRAL_WHITE = "#FFFFFF";

const RED_500 = "#B93715";
const GREEN_500 = "#5DAE64";
const BLUE_500 = "#1979B9";

const INTENT_POSITIVE = GREEN_500;
const INTENT_NEGATIVE = RED_500;
const BG_POSITIVE = "#F3FFF4";
const BG_NEGATIVE = "rgba(255, 184, 178, 0.34)";

const TAG_BG = "#CAC4B4";

/* ---- Helper ---- */
function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/* ---- Theme definitions ---- */
export const colorSchemes = {
  dark: {
    id: "b1",

    /* Background */
    colorBgBase: "#212121",
    colorBgSurface: NEUTRAL_WHITE,
    colorBgSurfaceAlt: NEUTRAL_WHITE,

    /* Text */
    colorTextPrimary: NEUTRAL_WHITE,
    colorTextSecondary: NEUTRAL_BLACK,
    colorTextMuted: "#dcdbdc",
    colorTextInverse: NEUTRAL_WHITE,
    colorTextLink: BLUE_500,
    colorTextAccent: NEUTRAL_WHITE,

    /* Border & Shadow */
    colorBorderDefault: NEUTRAL_WHITE,
    colorBorderMuted: "#cccccc",
    colorShadow: NEUTRAL_BLACK,

    /* Intent */
    colorIntentPositive: INTENT_POSITIVE,
    colorIntentNegative: INTENT_NEGATIVE,
    colorBgPositive: BG_POSITIVE,
    colorBgNegative: BG_NEGATIVE,

    /* Tags */
    colorTagBg: TAG_BG,
  },

  light: [
    {
      id: "5",

      /* Background */
      colorBgBase: "#E1D4C7",
      colorBgSurface: NEUTRAL_WHITE,
      colorBgSurfaceAlt: hexToRgba("#fff5eb", 0.5),

      /* Text */
      colorTextPrimary: NEUTRAL_BLACK,
      colorTextSecondary: NEUTRAL_BLACK,
      colorTextMuted: "#525151",
      colorTextInverse: NEUTRAL_WHITE,
      colorTextLink: BLUE_500,
      colorTextAccent: NEUTRAL_BLACK,

      /* Border & Shadow */
      colorBorderDefault: NEUTRAL_BLACK,
      colorBorderMuted: "#cccccc",
      colorShadow: NEUTRAL_BLACK,

      /* Intent */
      colorIntentPositive: INTENT_POSITIVE,
      colorIntentNegative: INTENT_NEGATIVE,
      colorBgPositive: BG_POSITIVE,
      colorBgNegative: BG_NEGATIVE,

      /* Tags */
      colorTagBg: TAG_BG,
    },
  ],
};

/* ---- Token-to-CSS-variable mapping ---- */
const TOKEN_MAP = {
  colorBgBase: "--color-bg-base",
  colorBgSurface: "--color-bg-surface",
  colorBgSurfaceAlt: "--color-bg-surface-alt",

  colorTextPrimary: "--color-text-primary",
  colorTextSecondary: "--color-text-secondary",
  colorTextMuted: "--color-text-muted",
  colorTextInverse: "--color-text-inverse",
  colorTextLink: "--color-text-link",
  colorTextAccent: "--color-text-accent",

  colorBorderDefault: "--color-border-default",
  colorBorderMuted: "--color-border-muted",
  colorShadow: "--color-shadow",

  colorIntentPositive: "--color-intent-positive",
  colorIntentNegative: "--color-intent-negative",
  colorBgPositive: "--color-bg-positive",
  colorBgNegative: "--color-bg-negative",

  colorTagBg: "--color-tag-bg",
};

/* ---- Apply theme ---- */
const applyTheme = (themeType = "light") => {
  if (typeof window === "undefined") return;
  if (window.isPasswordModalOpen) return;

  let scheme;

  if (themeType === "light") {
    const currentId = document.documentElement.style
      .getPropertyValue("--theme-id")
      .trim();
    const others = colorSchemes.light.filter((t) => t.id !== currentId);

    /* Fallback: if no other themes, reuse current */
    scheme =
      others.length > 0
        ? others[Math.floor(Math.random() * others.length)]
        : colorSchemes.light.find((t) => t.id === currentId) || colorSchemes.light[0];
  } else {
    scheme = colorSchemes.dark;
  }

  const root = document.documentElement.style;

  /* Set theme identifier */
  root.setProperty("--theme-id", scheme.id);

  /* Set all semantic tokens */
  for (const [key, cssVar] of Object.entries(TOKEN_MAP)) {
    if (scheme[key] != null) {
      root.setProperty(cssVar, scheme[key]);
    }
  }
};

export { applyTheme };
