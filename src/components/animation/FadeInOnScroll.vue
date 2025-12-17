<template>
  <div ref="el" :class="{ 'is-visible': isVisible }" class="fade-in-on-scroll">
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
.fade-in-on-scroll {
  opacity: 0;
  transition: opacity 4s ease, transform 8s ease;
  will-change: opacity, transform;
}
.fade-in-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
