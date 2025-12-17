<template>
  <div class="grid grid-cols-[1fr_auto] mb-4 mx-5">
    <input
      data-aos="zoom-out"
      v-model="taskTest"
      @keyup.enter="submitTask"
      type="text"
      placeholder="تسک جدیدت رو وارد کن"
      class="flex-1 px-4 py-2 w-full rounded-lg text-[1.2rem] transition-all duration-500 border border-[#0D9488] ml-8 placeholder:text-primary focus:placeholder:text-gray-400 focus:bg-gray-200"
    />
    <button
      data-aos="zoom-in"
      @click="submitTask"
      class="c-button c-button--gooey rounded-xl overflow-hidden mr-3"
    >
      افزودن
      <div class="c-button__blobs">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </button>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      style="display: block; height: 0; width: 0"
    >
      <defs>
        <filter id="goo">
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="10"
            result="blur"
          ></feGaussianBlur>
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
            result="goo"
          ></feColorMatrix>
          <feBlend in="SourceGraphic" in2="goo"></feBlend>
        </filter>
      </defs>
    </svg>
  </div>
</template>

<script setup>
import { ref } from "vue";
// toast
import { useToast } from "vue-toastification";
const toast = useToast();

// emit
const emit = defineEmits(["addTask"]);

// variable v-model
const taskTest = ref("");

// submit task
const submitTask = () => {
  if (taskTest.value.trim() === "") {
    toast.error("لطفا یک تسک وارد کنید.", {
      toastClassName: "toast-error",
    });
    return;
  }

  emit("addTask", taskTest.value);
  taskTest.value = "";
};
</script>

<style>
html,
body {
  overflow-x: hidden !important;
}
/* button add */
.c-button {
  color: var(--primary-tw);
  font-weight: 400;
  font-size: 16px;
  text-decoration: none;
  padding: 0.9em 1.6em;
  cursor: pointer;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  position: relative;
  z-index: 1;
  background-color: transparent;
}

.c-button--gooey {
  color: var(--secondary-tw);
  text-transform: uppercase;
  letter-spacing: 2px;
  border: 0.5px solid var(--secondary-tw);
  border-radius: 0;
  position: relative;
  transition: all 2s ease;
}

.c-button--gooey .c-button__blobs {
  height: 100%;
  filter: url(#goo);
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  bottom: -3px;
  right: -1px;
  z-index: -1;
}

.c-button--gooey .c-button__blobs div {
  background-color: var(--secondary-tw);
  width: 34%;
  height: 100%;
  border-radius: 100%;
  position: absolute;
  transform: scale(1.4) translateY(125%) translateZ(0);
  transition: all 1s ease;
}

.c-button--gooey .c-button__blobs div:nth-child(1) {
  left: -5%;
}

.c-button--gooey .c-button__blobs div:nth-child(2) {
  left: 30%;
  transition-delay: 60ms;
}

.c-button--gooey .c-button__blobs div:nth-child(3) {
  left: 66%;
  transition-delay: 25ms;
}

.c-button--gooey:hover {
  color: #fff;
  border: none;
}

.c-button--gooey:hover .c-button__blobs div {
  transform: scale(1.4) translateY(0) translateZ(0);
}

/* responsive input */
@media (max-width: 374px) {
  input {
    width: 12rem;
    flex-shrink: 0;
  }
  input::placeholder {
    font-size: 0.8rem;
    text-align: center; /* اگر میخوای وسط قرار بگیره */
  }
}
</style>
