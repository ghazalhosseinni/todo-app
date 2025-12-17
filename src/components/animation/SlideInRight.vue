<template>
  <div ref="el" :class="{ 'is-visible': isVisible }" class="slide-in-right">
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
.slide-in-right {
  opacity: 0;
  transform: translateX(50px);
  transition: opacity 2s ease, transform 2s ease;
  will-change: opacity, transform;
}
.slide-in-right.is-visible {
  opacity: 1;
  transform: translateX(0);
}
</style>
