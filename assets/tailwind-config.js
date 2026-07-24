tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-tertiary-container": "#bdffdb",
        "tertiary-fixed-dim": "#4edea3",
        "on-secondary-fixed": "#171c1f",
        "on-primary-fixed": "#00174b",
        "on-error-container": "#93000a",
        "inverse-surface": "#2f3131",
        "inverse-primary": "#b4c5ff",
        "primary-container": "#2563eb",
        "on-secondary-container": "#5e6367",
        "surface-container": "#eeeeee",
        "surface-container-low": "#f3f3f4",
        "tertiary": "#006242",
        "primary": "#004ac6",
        "on-tertiary": "#ffffff",
        "on-secondary": "#ffffff",
        "surface-container-lowest": "#ffffff",
        "surface-dim": "#dadada",
        "background": "#f9f9f9",
        "on-secondary-fixed-variant": "#43474b",
        "tertiary-container": "#007d55",
        "on-surface": "#1a1c1c",
        "surface-tint": "#0053db",
        "on-surface-variant": "#434655",
        "secondary": "#5a5f62",
        "tertiary-fixed": "#6ffbbe",
        "on-background": "#1a1c1c",
        "primary-fixed-dim": "#b4c5ff",
        "outline-variant": "#c3c6d7",
        "error-container": "#ffdad6",
        "on-primary": "#ffffff",
        "on-primary-container": "#eeefff",
        "outline": "#737686",
        "surface-variant": "#e2e2e2",
        "inverse-on-surface": "#f0f1f1",
        "on-primary-fixed-variant": "#003ea8",
        "secondary-container": "#dce0e4",
        "on-tertiary-fixed": "#002113",
        "surface": "#f9f9f9",
        "primary-fixed": "#dbe1ff",
        "surface-container-highest": "#e2e2e2",
        "secondary-fixed-dim": "#c3c7cb",
        "secondary-fixed": "#dfe3e7",
        "surface-bright": "#f9f9f9",
        "on-error": "#ffffff",
        "error": "#ba1a1a",
        "surface-container-high": "#e8e8e8",
        "on-tertiary-fixed-variant": "#005236"
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1.25rem",
        full: "9999px"
      },
      spacing: {
        "base-unit": "4px",
        gutter: "24px",
        "container-max-width": "1280px",
        "margin-mobile": "20px",
        "margin-desktop": "64px"
      },
      fontFamily: {
        "label-sm": ["JetBrains Mono"],
        "headline-md": ["Hanken Grotesk"],
        "body-lg": ["Inter"],
        "headline-lg": ["Hanken Grotesk"],
        "display-lg": ["Hanken Grotesk"],
        "body-md": ["Inter"],
        "headline-lg-mobile": ["Hanken Grotesk"]
      },
      fontSize: {
        "label-sm": ["12px", { lineHeight: "16px", letterSpacing: "0.05em", fontWeight: "500" }],
        "headline-md": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "headline-lg": ["32px", { lineHeight: "40px", fontWeight: "600" }],
        "display-lg": ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "headline-lg-mobile": ["24px", { lineHeight: "32px", fontWeight: "600" }]
      }
    }
  }
};
