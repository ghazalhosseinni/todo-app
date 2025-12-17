<template>
  <div ref="el" :class="{ 'is-visible': isVisible }" class="slide-in-left">
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
.slide-in-left {
  opacity: 0;
  transform: translateX(-50px);
  transition: opacity 3s ease, transform 2s ease;
  will-change: transform, opacity;
}
.slide-in-left.is-visible {
  opacity: 1;
  transform: translateX(0);
}
</style>
