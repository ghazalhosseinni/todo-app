import { createApp } from "vue";
import App from "./App.vue";

//animation aos
import "aos/dist/aos.css";
import AOS from "aos";
// Initialize AOS
AOS.init({
  duration: 2000, // Animation duration in ms
  easing: "ease-in-out", // Easing function
  once: true, // Whether animation should happen only once
});

// vue router
import router from "./router/index.js";

// vuetify
import { vuetify } from "./plugins/vuetify.js";

// Style
import "@/assets/style/main.css";
import "@/assets/style/style.scss";

// mitt
import mitt from "mitt";
const emitter = mitt();

// axios
import Axios from "axios";

// NProgress
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Router Navigation Guards
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
router.afterEach(() => {
  NProgress.done();
});

const app = createApp(App);

// to use globally
app.config.globalProperties.$http = Axios;

// mitt
app.config.globalProperties.emitter = emitter;

// baseUrl
app.config.globalProperties.baseUrl = import.meta.env.VITE_BASE_URL;

// headers
app.config.globalProperties.headers = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};
//toastification
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
app.use(Toast, {
  position: POSITION.TOP_RIGHT,
  timeout: 3000,
});

// pinia
import { createPinia } from "pinia";

//vanila tilt
import VanillaTilt from "vanilla-tilt";
// register global directive
app.directive("tilt", {
  mounted(el, binding = {}) {
    const options = binding.value || {
      max: 12,
      speed: 2000,
      glare: true,
      "max-glare": 0.4,
      scale: 1.05,
      easing: "cubic-bezier(.03,.98,.52,.99)",
    };
    VanillaTilt.init(el, options);
  },
  unmounted(el) {
    // destroy when removed
    el.vanillaTilt?.destroy();
  },
});

// components
import FadeInOnScroll from "./components/animation/FadeInOnScroll.vue";
app.component("fade", FadeInOnScroll);
import SlideInDown from "./components/animation/SlideInDown.vue";
app.component("slide-down", SlideInDown);
import SlideInLeft from "./components/animation/SlideInLeft.vue";
app.component("slide-left", SlideInLeft);
import SlideInRight from "./components/animation/SlideInRight.vue";
app.component("slide-right", SlideInRight);
import SlideInTop from "./components/animation/SlideInTop.vue";
app.component("slide-top", SlideInTop);

app.use(vuetify);
app.use(createPinia());
app.use(router).mount("#app");
