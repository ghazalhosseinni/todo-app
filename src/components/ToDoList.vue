<template>
  <div ref="listWrapper" class="mt-12 mb-20">
    <h2 class="text-xl font-bold mb-4 text-primary-tw">لیست تسک ها</h2>

    <Draggable
      v-model="displayTasks"
      :animation="400"
      item-key="id"
      @update:model-value="updateTasks"
      :swap-threshold="0.65"
      :easing="'cubic-bezier(0.25, 0.8, 0.25, 1)'"
      :force-fallback="true"
      handle=".drag-handle"
    >
      <template #item="{ element: task }">
        <li
          v-tilt
          class="flex justify-between items-center rounded-lg shadow-lg bg-gray-100 p-6 my-5"
          :class="[
            'p-3 rounded-lg shadow mb-2',
            task.highlighted
              ? 'bg-gray-200 border-2 border-secondary-tw'
              : 'bg-gray-100',
          ]"
          :key="task.id"
        >
          <div class="flex justify-start items-center">
            <!-- checkBox -->
            <div class="checkbox-wrapper" style="color: gray">
              <input
                v-model="task.done"
                @click="emit('toggleTask', task.id)"
                type="checkbox"
                class="check"
                :id="`check-${task.id}`"
              />
              <label :for="`check-${task.id}`" class="label">
                <svg class="sm:h-14 sm:w-14 h-10 w-10" viewBox="0 0 95 95">
                  <rect
                    x="30"
                    y="20"
                    width="50"
                    height="50"
                    stroke="black"
                    fill="none"
                  ></rect>
                  <g transform="translate(0,-952.36222)">
                    <path
                      d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4"
                      stroke="black"
                      stroke-width="3"
                      fill="none"
                      class="path1"
                    ></path>
                  </g>
                </svg>
              </label>
            </div>

            <!-- like -->
            <div class="heart-container -mt-2" title="Like">
              <input
                v-model="task.favorite"
                @click="emit('toggleFavorite', task.id)"
                type="checkbox"
                class="checkbox"
                :id="`fav-${task.id}`"
              />
              <div class="svg-container">
                <svg
                  viewBox="0 0 24 24"
                  class="svg-outline sm:h-9 sm:w-9 h-7 w-7"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"
                  ></path>
                </svg>
                <svg
                  viewBox="0 0 24 24"
                  class="svg-filled"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"
                  ></path>
                </svg>
                <svg
                  class="svg-celebrate"
                  width="100"
                  height="100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon points="10,10 20,20"></polygon>
                  <polygon points="10,50 20,50"></polygon>
                  <polygon points="20,80 30,70"></polygon>
                  <polygon points="90,10 80,20"></polygon>
                  <polygon points="90,50 80,50"></polygon>
                  <polygon points="80,80 70,70"></polygon>
                </svg>
              </div>
            </div>
          </div>

          <!-- text of task -->
          <div class="flex sm:justify-center justify-stretch items-center">
            <span
              v-if="!task.editing"
              :class="{
                ' line-through text-gray-500 transition-all duration-500 ':
                  task.done,
              }"
              class="text-colorText sm:text-2xl text-sm"
              >{{ task.text }}</span
            >
            <div
              class="drag-handle cursor-grab active:cursor-grabbing sm:mr-2 mr-0"
            >
              <v-icon class="sm:mr-2 mr-1" small>mdi-swap-vertical</v-icon>
            </div>
          </div>

          <!-- save/cancel -->
          <div v-if="task.editing" class="mt-2 flex gap-2">
            <input
              v-model="task.tempText"
              @keyup.enter="confirmEditModal(task)"
              :data-edit="task.id"
              type="text"
              class="border rounded p-1"
            />
            <button
              type="button"
              class="bg-secondary-tw text-gray-100 p-3 rounded-lg shadow-lg hover:bg-[#0B7D78] transition-all duration-500"
              @mousedown="confirmEditModal(task)"
              :data-edit="task.id"
            >
              ذخیره
            </button>
            <button
              class="bg-red-500 text-gray-100 p-3 rounded-lg shadow-lg hover:bg-red-600 transition-all duration-500"
              @click="cancelTask(task)"
            >
              لغو
            </button>
          </div>

          <div class="flex justify-start align-middle gap-2">
            <!-- edit task -->
            <button
              @click="startEditing(task)"
              class="edit-button sm:h-14 sm:w-14 h-10 w-10 rounded-2xl"
            >
              <svg class="edit-svgIcon" viewBox="0 0 512 512">
                <path
                  d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                ></path>
              </svg>
            </button>

            <!-- delete task -->
            <button
              @click="$emit('deleteTask', task.id)"
              class="group relative flex sm:h-14 sm:w-14 h-10 w-10 flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-red-800 bg-delete hover:bg-red-800 bg-red-600"
            >
              <!-- icons... (unchanged) -->
              <svg
                viewBox="0 0 1.625 1.625"
                class="absolute -top-7 fill-white delay-100 group-hover:top-6 group-hover:animate-[spin_1.4s] group-hover:duration-1000"
                height="15"
                width="15"
              >
                <path
                  d="M.471 1.024v-.52a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099h-.39c-.107 0-.195 0-.195-.195"
                ></path>
                <path
                  d="M1.219.601h-.163A.1.1 0 0 1 .959.504V.341A.033.033 0 0 0 .926.309h-.26a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099v-.39a.033.033 0 0 0-.032-.033"
                ></path>
                <path
                  d="m1.245.465-.15-.15a.02.02 0 0 0-.016-.006.023.023 0 0 0-.023.022v.108c0 .036.029.065.065.065h.107a.023.023 0 0 0 .023-.023.02.02 0 0 0-.007-.016"
                ></path>
              </svg>
              <svg
                width="16"
                fill="none"
                viewBox="0 0 39 7"
                class="origin-right duration-500 group-hover:rotate-90"
              >
                <line
                  stroke-width="4"
                  stroke="white"
                  y2="5"
                  x2="39"
                  y1="5"
                ></line>
                <line
                  stroke-width="3"
                  stroke="white"
                  y2="1.5"
                  x2="26.0357"
                  y1="1.5"
                  x1="12"
                ></line>
              </svg>
              <svg width="16" fill="none" viewBox="0 0 33 39" class="">
                <mask fill="white" id="path-1-inside-1_8_19">
                  <path
                    d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                  ></path>
                </mask>
                <path
                  mask="url(#path-1-inside-1_8_19)"
                  fill="white"
                  d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                ></path>
                <path stroke-width="4" stroke="white" d="M12 6L12 29"></path>
                <path stroke-width="4" stroke="white" d="M21 6V29"></path>
              </svg>
            </button>
          </div>
        </li>
      </template>
    </Draggable>
  </div>
</template>

<script setup>
import Swal from "sweetalert2";
import Draggable from "vuedraggable";
import {
  ref,
  watch,
  onMounted,
  nextTick,
  onUpdated,
  onBeforeUnmount,
} from "vue";
import VanillaTilt from "vanilla-tilt";

const props = defineProps({
  tasks: { type: Array, required: true },
});
const emit = defineEmits([
  "editTask",
  "deleteTask",
  "toggleTask",
  "toggleFavorite",
  "reorder",
  "updateTask",
]);

const listWrapper = ref(null);
const displayTasks = ref([]);

function normalizeTasks(source) {
  return (source || []).map((t, i) => ({
    ...t,
    id: t.id ?? `${Date.now()}-${i}-${Math.floor(Math.random() * 1000)}`,
    tempText: t.tempText ?? t.text ?? "",
    editing: !!t.editing,
  }));
}

watch(
  () => props.tasks,
  (newTasks) => {
    displayTasks.value = normalizeTasks(newTasks);
  },
  { deep: true }
);

function updateTasks(newOrder) {
  displayTasks.value = [...newOrder];
  const ids = newOrder.map((t) => t.id);
  emit("reorder", ids);
}

function initTiltForNewCards() {
  const root = listWrapper.value;
  const el = root?.$el ?? root;
  if (!el) return;
  const cards = el.querySelectorAll("li");
  cards.forEach((card) => {
    if (!card.vanillaTilt) {
      VanillaTilt.init(card, {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
        scale: 1.03,
        disable: card.classList.contains("dragging"),
      });
    }
  });
}

onMounted(() => {
  displayTasks.value = normalizeTasks(props.tasks);
  nextTick(initTiltForNewCards);
});

onUpdated(() => {
  nextTick(initTiltForNewCards);
});

onBeforeUnmount(() => {
  if (!listWrapper.value) return;
  const cards = listWrapper.value.querySelectorAll("li");
  cards.forEach((card) => card.vanillaTilt?.destroy());
});

/* ---------- اصلی: save / check / edit ---------- */

const saveAndEmit = (task) => {
  const newText = (task.tempText || "").trim();

  if (!newText) {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "متن نمی تواند خالی باشد",
      showConfirmButton: false,
      timer: 1500,
      toast: true,
      background: "#0D9488",
      color: "#fff",
    });
    nextTick(() => focusInputById(task.id));
    return;
  }

  // ذخیره و emit به والد
  task.text = newText;
  delete task.tempText;
  task.editing = false;
  emit("updateTask", { ...task });
};

const onBlurEdit = (task) => {
  const val = (task.tempText || "").trim();
  if (!val) {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "متن نمی تواند خالی باشد",
      showConfirmButton: false,
      timer: 1500,
      toast: true,
      background: "#0D9488",
      color: "#fff",
    });
    nextTick(() => focusInputById(task.id));
    return;
  }
  // اگر خالی نبود، فقط بسته شود (یا می‌توانید این را نادیده بگیرید تا کاربر حتما Save بزند)
  task.editing = false;
  task.tempText = task.tempText ?? task.text;
};

const startEditing = (task) => {
  task.editing = true;
  task.tempText = task.text ?? "";
  nextTick(() => {
    try {
      const root = listWrapper.value?.$el ?? listWrapper.value;
      if (!root) return;
      const input = root.querySelector(`input[data-edit="${task.id}"]`);
      if (input) {
        input.focus();
        if (typeof input.select === "function") input.select();
      }
    } catch (e) {
      // ignore
    }
  });
};

const cancelTask = (task) => {
  task.editing = false;
  // discard tempText changes
  task.tempText = task.text;
};

const confirmEditModal = async (task) => {
  const newText = (task.tempText || "").trim();

  if (!newText) {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "متن نمی تواند خالی باشد",
      showConfirmButton: false,
      timer: 1500,
      toast: true,
      background: "#0D9488",
      color: "#fff",
    });
    nextTick(() => focusInputById(task.id));
    return;
  }

  // چک تکراری نسبت به داده‌های والد
  const duplicate = (props.tasks || []).some(
    (t) =>
      t.id !== task.id && (t.text || "").toLowerCase() === newText.toLowerCase()
  );
  if (duplicate) {
    Swal.fire({
      position: "top-end",
      icon: "warning",
      title: "این تسک قبلاً وجود دارد",
      showConfirmButton: false,
      timer: 1800,
      toast: true,
      background: "#0D9488",
      color: "#fff",
    });
    nextTick(() => focusInputById(task.id));
    return;
  }

  // نمایش confirm (در صورت تمایل به تایید نهایی)
  const result = await Swal.fire({
    title: "تغییرات ذخیره شود؟",
    icon: "question",
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: "بله",
    cancelButtonText: "خیر",
    confirmButtonColor: "#06b6d4",
    cancelButtonColor: "#e5e7eb",
  });

  if (!result.isConfirmed) return;

  // ذخیره نهایی
  saveAndEmit(task);

  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "تغییرات با موفقیت ذخیره شد",
    showConfirmButton: false,
    timer: 1600,
    toast: true,
    background: "#0D9488",
    color: "#fff",
  });
};

function focusInputById(id) {
  nextTick(() => {
    try {
      const root = listWrapper.value?.$el ?? listWrapper.value;
      if (!root) return;
      const input = root.querySelector(`input[data-edit="${id}"]`);
      if (input) {
        input.focus();
        if (typeof input.select === "function") input.select();
      }
    } catch (e) {
      // ignore
    }
  });
}
</script>

<style scoped>
html,
body {
  overflow-x: hidden !important;
}
/* edit style */
.edit-button {
  border-radius: 50%;
  background-color: var(--primary-tw);
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.164);
  cursor: pointer;
  transition-duration: 0.8s;
  overflow: hidden;
  position: relative;
  text-decoration: none !important;
}

.edit-svgIcon {
  width: 17px;
  transition-duration: 0.8s;
}

.edit-svgIcon path {
  fill: white;
}

.edit-button:hover {
  /* width: 120px; */
  /* border-radius: 50px; */
  transition-duration: 0.3s;
  background-color: #0395ad;
  align-items: center;
}

.edit-button:hover .edit-svgIcon {
  width: 20px;
  transition-duration: 0.3s;
  transform: translateY(60%);
  -webkit-transform: rotate(360deg);
  -moz-transform: rotate(360deg);
  -o-transform: rotate(360deg);
  -ms-transform: rotate(360deg);
  transform: rotate(360deg);
  border: none;
}

.edit-button::before {
  display: none;
  color: white;
  transition-duration: 0.3s;
  font-size: 2px;
  border: none;
}

/* .edit-button:hover::before {
  display: block;
  padding-right: 10px;
  font-size: 13px;
  opacity: 1;
  transform: translateY(0px);
  transition-duration: 0.3s;
} */

/* transition */

/* enter animation */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* exit animation */
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

/* enter */
.list-enter-active {
  animation: fadeIn 1s ease forwards;
}

/* exit */
.list-leave-active {
  animation: fadeOut 0.5s ease forwards;
}

/* checkBox style */
.checkbox-wrapper input[type="checkbox"] {
  visibility: hidden;
  display: none;
}

.checkbox-wrapper *,
.checkbox-wrapper ::after,
.checkbox-wrapper ::before {
  box-sizing: border-box;
  user-select: none;
}

.checkbox-wrapper {
  position: relative;
  display: block;
  overflow: hidden;
}

.checkbox-wrapper .label {
  cursor: pointer;
}

.checkbox-wrapper .check {
  width: 50px;
  height: 50px;
  position: absolute;
  opacity: 0;
}

.checkbox-wrapper .label svg {
  vertical-align: middle;
}

.checkbox-wrapper .path1 {
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
  transition: 0.5s stroke-dashoffset;
  opacity: 0;
}

.checkbox-wrapper .check:checked + label svg g path {
  stroke-dashoffset: 0;
  opacity: 1;
}

/* like style */
.heart-container {
  --heart-color: rgb(255, 91, 137);
  position: relative;
  width: 30px;
  height: 30px;
  transition: 0.3s;
}

.heart-container .checkbox {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 20;
  cursor: pointer;
}

.heart-container .svg-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.heart-container .svg-outline,
.heart-container .svg-filled {
  fill: var(--heart-color);
  position: absolute;
}

.heart-container .svg-filled {
  animation: keyframes-svg-filled 1s;
  display: none;
}

.heart-container .svg-celebrate {
  position: absolute;
  animation: keyframes-svg-celebrate 0.5s;
  animation-fill-mode: forwards;
  display: none;
  stroke: var(--heart-color);
  fill: var(--heart-color);
  stroke-width: 2px;
}

.heart-container .checkbox:checked ~ .svg-container .svg-filled {
  display: block;
}

.heart-container .checkbox:checked ~ .svg-container .svg-celebrate {
  display: block;
}

@keyframes keyframes-svg-filled {
  0% {
    transform: scale(0);
  }

  25% {
    transform: scale(1.2);
  }

  50% {
    transform: scale(1);
    filter: brightness(1.5);
  }
}

@keyframes keyframes-svg-celebrate {
  0% {
    transform: scale(0);
  }

  50% {
    opacity: 1;
    filter: brightness(1.5);
  }

  100% {
    transform: scale(1.4);
    opacity: 0;
    display: none;
  }
}
</style>
