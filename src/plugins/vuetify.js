// ----------------------------------------------------------------------------------------
// ------------------------------- Vuetify config strat -----------------------------------
// ----------------------------------------------------------------------------------------
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { aliases, mdi } from "vuetify/lib/iconsets/mdi";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { fa } from "vuetify/locale";
import { customIcons } from "@/assets/customIcons.js";

// Custom theme properties
const lightTheme = {
  dark: false,
  colors: {
    primary: "#06B6D4", // رنگ Tailwind primary
    secondary: "#0D9488", // رنگ Tailwind secondary
    background: "#F3F4F6", // bgColor
    surface: "#F3F4F6", // سطح کارت و دیالوگ
    info: "#6366F1", // hover / info
    error: "#DC2626", // delete / error
    onPrimary: "#FFFFFF", // متن روی primary
    onSecondary: "#FFFFFF", // متن روی secondary
    onBackground: "#111827", // متن روی background
    onSurface: "#111827", // متن روی سطح
  },
};

const vuetify = createVuetify({
  locale: {
    locale: "fa",
    fallback: "fa",
    messages: { fa },
    rtl: { fa: true },
  },
  theme: {
    defaultTheme: "lightTheme",
    themes: {
      lightTheme,
    },
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
      svg: customIcons,
    },
  },
  components,
  directives,
});

export { vuetify };
// ----------------------------------------------------------------------------------------
// ------------------------------- Vuetify config end -------------------------------------
// ----------------------------------------------------------------------------------------
