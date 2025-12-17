<template>
  <div ref="el" :class="{ 'is-visible': isVisible }" class="slide-in-bottom">
    <slot />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
    };
  },
  mounted() {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.isVisible = true;
          observer.unobserve(this.$refs.el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(this.$refs.el);
  },
};
</script>

<style scoped>
body,
html {
  overflow-x: hidden;
}

.slide-in-bottom {
  opacity: 0;
  transform: translateY(50px); /* از پایین شروع کن */
  transition: opacity 2s ease, transform 2s ease;
  will-change: opacity, transform;
}

.slide-in-bottom.is-visible {
  opacity: 1;
  transform: translateY(0); /* به جای اصلی بیاد */
}
</style>
