<template>
  <div
    class="min-h-screen flex items-start justify-center bg-bgColor-tw"
    @mousemove="onMouseMove"
  >
    <!-- mouse spotlight-->
    <div
      ref="spotContainer"
      class="absolute inset-0 pointer-events-none z-0"
      aria-hidden="true"
    >
      <div class="spotlight" :style="spotlightStyle"></div>
    </div>

    <!-- content -->
    <div class="w-full max-w-3xl z-10">
      <div
        class="flex justify-between items-baseline mx-10 my-8 pb-2 sm:pb-0 container-search"
      >
        <!-- title -->
        <fade>
          <h1
            class="font-bold text-2xl sm:text-3 xl mb-4 p-4 text-secondary-tw sm:block hidden"
          >
            to do list
          </h1>
        </fade>
        <!-- search -->
        <div class="relative w-full max-w-sm" ref="searchWrapper">
          <div class="relative w-full">
            <span
              class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"
            >
              <!-- icon -->
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
            </span>

            <input
              v-model="search"
              type="text"
              placeholder="جستجو..."
              class="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-xl bg-white/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-tw focus:border-primary-tw transition"
              @keydown.down.prevent="searchStore.moveDown(suggested.length)"
              @keydown.up.prevent="searchStore.moveUp(suggested.length)"
              @keydown.enter.prevent="searchStore.selectActive(suggested)"
            />

            <!-- clear button -->
            <transition name="close">
              <button
                v-if="searchStore.hasSearch"
                @click="clearSearch"
                class="absolute inset-y-0 right-0 flex items-center pr-3 mt-2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </transition>
          </div>

          <ul
            v-if="open && suggested.length"
            class="absolute top-full left-0 w-full bg-white border border-gray-300 rounded shadow mt-1 z-50 text-center"
          >
            <li
              v-for="(task, i) in suggested"
              :key="i"
              class="px-4 py-2 cursor-pointer hover:bg-gray-100 text-xl"
              :class="i === activeIndex ? 'bg-gray-100' : ''"
              @mouseenter="activeIndex = i"
              @click="searchStore.selectSuggestion(task)"
            >
              <span v-html="highlight(task.text)"></span>
            </li>
          </ul>
        </div>
      </div>

      <!-- filter -->
      <div
        class="mb-14 mt-20 grid grid-cols-2 sm:grid-cols-4 justify-center items-center gap-7 z-10"
      >
        <!-- all -->
        <fade>
          <label class="flex items-center justify-center cursor-pointer gap-2">
            <div class="relative w-8 h-8 flex-shrink-0">
              <input
                value="all"
                type="radio"
                v-model="filter"
                class="peer absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <span class="absolute inset-0 rounded border border-black"></span>
              <svg
                class="absolute inset-0 duration-500 ease-out [stroke-dasharray:100] [stroke-dashoffset:100] peer-checked:[stroke-dashoffset:0]"
                viewBox="0 0 38 37"
                fill="none"
              >
                <path
                  d="M6.617 36.785c-.676-5.093 4.49-10.776 6.318-14.952 1.887-4.31 4.315-10.701 6.055-15.506C20.343 2.59 20.456.693 20.57.789c3.262 2.744 1.697 10.518 2.106 14.675 1.926 19.575 4.62 12.875-7.635 4.43C12.194 17.933 2.911 12.1 1.351 8.82c-1.177-2.477 5.266 0 7.898 0 2.575 0 27.078-1.544 27.907-1.108.222.117-.312.422-.526.554-1.922 1.178-3.489 1.57-5.266 3.046-3.855 3.201-8.602 6.002-12.11 9.691-4.018 4.225-5.388 10.245-11.321 10.245"
                  stroke-width="1.5px"
                  pathLength="100"
                  stroke="#000"
                ></path>
              </svg>
            </div>
            <span
              class="peer-checked:line-through select-none whitespace-nowrap"
              >همه ی تسک ها</span
            >
          </label>
        </fade>
        <!-- done -->
        <fade>
          <label class="flex items-center justify-center cursor-pointer gap-2">
            <div class="relative w-8 h-8">
              <input
                type="radio"
                value="done"
                v-model="filter"
                class="peer absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <span class="absolute inset-0 rounded border border-black"></span>
              <svg
                class="absolute inset-0 duration-500 ease-out [stroke-dasharray:100] [stroke-dashoffset:100] peer-checked:[stroke-dashoffset:0]"
                viewBox="0 0 38 37"
                fill="none"
              >
                <path
                  d="M6.617 36.785c-.676-5.093 4.49-10.776 6.318-14.952 1.887-4.31 4.315-10.701 6.055-15.506C20.343 2.59 20.456.693 20.57.789c3.262 2.744 1.697 10.518 2.106 14.675 1.926 19.575 4.62 12.875-7.635 4.43C12.194 17.933 2.911 12.1 1.351 8.82c-1.177-2.477 5.266 0 7.898 0 2.575 0 27.078-1.544 27.907-1.108.222.117-.312.422-.526.554-1.922 1.178-3.489 1.57-5.266 3.046-3.855 3.201-8.602 6.002-12.11 9.691-4.018 4.225-5.388 10.245-11.321 10.245"
                  stroke-width="1.5px"
                  pathLength="100"
                  stroke="#000"
                ></path>
              </svg>
            </div>
            <span
              class="peer-checked:line-through select-none whitespace-nowrap"
              >تسک انجام شده</span
            >
          </label>
        </fade>

        <!-- not done -->

        <fade>
          <label class="flex items-center justify-center cursor-pointer gap-2">
            <div class="relative w-8 h-8">
              <input
                type="radio"
                value="notdone"
                v-model="filter"
                class="peer absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <span class="absolute inset-0 rounded border border-black"></span>
              <svg
                class="absolute inset-0 duration-500 ease-out [stroke-dasharray:100] [stroke-dashoffset:100] peer-checked:[stroke-dashoffset:0]"
                viewBox="0 0 38 37"
                fill="none"
              >
                <path
                  d="M6.617 36.785c-.676-5.093 4.49-10.776 6.318-14.952 1.887-4.31 4.315-10.701 6.055-15.506C20.343 2.59 20.456.693 20.57.789c3.262 2.744 1.697 10.518 2.106 14.675 1.926 19.575 4.62 12.875-7.635 4.43C12.194 17.933 2.911 12.1 1.351 8.82c-1.177-2.477 5.266 0 7.898 0 2.575 0 27.078-1.544 27.907-1.108.222.117-.312.422-.526.554-1.922 1.178-3.489 1.57-5.266 3.046-3.855 3.201-8.602 6.002-12.11 9.691-4.018 4.225-5.388 10.245-11.321 10.245"
                  stroke-width="1.5px"
                  pathLength="100"
                  stroke="#000"
                ></path>
              </svg>
            </div>
            <span
              class="peer-checked:line-through select-none whitespace-nowrap"
            >
              تسک انجام نشده</span
            >
          </label>
        </fade>
        <!-- FAVORITE -->
        <fade>
          <label class="flex items-center justify-center cursor-pointer gap-2">
            <div class="relative w-8 h-8">
              <input
                value="favorite"
                type="radio"
                v-model="filter"
                class="peer absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <span class="absolute inset-0 rounded border border-black"></span>
              <svg
                class="absolute inset-0 duration-500 ease-out [stroke-dasharray:100] [stroke-dashoffset:100] peer-checked:[stroke-dashoffset:0]"
                viewBox="0 0 38 37"
                fill="none"
              >
                <path
                  d="M6.617 36.785c-.676-5.093 4.49-10.776 6.318-14.952 1.887-4.31 4.315-10.701 6.055-15.506C20.343 2.59 20.456.693 20.57.789c3.262 2.744 1.697 10.518 2.106 14.675 1.926 19.575 4.62 12.875-7.635 4.43C12.194 17.933 2.911 12.1 1.351 8.82c-1.177-2.477 5.266 0 7.898 0 2.575 0 27.078-1.544 27.907-1.108.222.117-.312.422-.526.554-1.922 1.178-3.489 1.57-5.266 3.046-3.855 3.201-8.602 6.002-12.11 9.691-4.018 4.225-5.388 10.245-11.321 10.245"
                  stroke-width="1.5px"
                  pathLength="100"
                  stroke="#000"
                ></path>
              </svg>
            </div>
            <span
              class="peer-checked:line-through select-none whitespace-nowrap"
            >
              تسک مورد علاقه
            </span>
          </label>
        </fade>
      </div>

      <!-- input -->
      <ToDoInput @add-task="addTask"></ToDoInput>

      <!-- list -->
      <to-do-list
        v-if="filteredTasks.length"
        :tasks="filteredTasks"
        @editTask="editTask"
        @deleteTask="confirmDeleteModal"
        @toggleTask="toggleTask"
        @toggleFavorite="toggleFavorite"
        @reorder="handleReorder"
        @updateTask="handleUpdateTask"
      >
      </to-do-list>
      <!-- img -->
      <transition v-else name="fade" mode="out-in">
        <div key="empty" data-aos="zoom-in" class="min-h-full">
          <img
            class="object-cover h-full w-full mt-4"
            src="/images/first-svg.svg"
            alt=""
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
////////////////import
import {
  ref,
  reactive,
  watch,
  computed,
  onMounted,
  onBeforeUnmount,
} from "vue";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import ToDoInput from "../components/ToDoInput.vue";
import ToDoList from "../components/ToDoList.vue";
import { useSearchStore } from "@/store/searchStore";
const searchStore = useSearchStore();

// varriables
const genId = (i = 0) =>
  `${Date.now()}-${i}-${Math.floor(Math.random() * 10000)}`;
const filter = ref("all");
const search = computed({
  get: () => searchStore.search,
  set: (val) => searchStore.setSearch(val),
});
const open = computed(() => searchStore.open);
const activeIndex = computed({
  get: () => searchStore.activeIndex,
  set: (val) => (searchStore.activeIndex = val),
});
const searchWrapper = ref(null);

//////////local storage
const raw = JSON.parse(localStorage.getItem("tasks")) || [];

// loading tasks from local Storage
const tasks = ref(
  raw.map((t, i) => ({
    id: t.id ?? genId(i),
    text: t.text ?? "",
    done: !!t.done,
    favorite: !!t.favorite,
    editing: !!t.editing,
    highlighted: !!t.highlighted,
  }))
);

// if tasks change => save into local storage
watch(
  tasks,
  (newTasks) => {
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  },
  { deep: true }
);

///////////////////// search
watch(search, (val) => {
  const q = (val || "").trim().toLowerCase();
  if (!q || q.length < 3) {
    tasks.value.forEach((t) => (t.highlighted = false));
    return;
  }
  const exactSearch = tasks.value.some((t) => t.text.toLowerCase() === q);
  if (exactSearch) {
    tasks.value.forEach((t) => {
      t.highlighted = t.text.toLowerCase() === q;
    });
  }
});
const doSearch = () => {
  const q = search.value.trim().toLowerCase();
  if (!q || q.length < 3) {
    tasks.value.forEach((t) => (t.highlighted = false));
    return;
  }
  tasks.value.forEach((t) => {
    t.highlighted = t.text.toLowerCase().includes(q);
  });
};
const clearSearch = () => {
  searchStore.clear?.();
  filter.value = "all";
};

// suggestion
const suggested = computed(() => {
  const text = search.value.trim().toLowerCase();
  if (!text) return [];
  return tasks.value.filter((task) => task.text.toLowerCase().includes(text));
});
function selectSuggestion(task) {
  search.value = task.text;
  open.value = false;
  activeIndex.value = -1;
}
function selectActive() {
  if (activeIndex.value >= 0) {
    selectSuggestion(suggested.value[activeIndex.value]);
  }
}
// highlight
function highlight(text) {
  const q = search.value;
  if (!q) return text;
  let result = "";
  let index = 0;
  for (let i = 0; i < text.length; i++) {
    if (index < q.length && text[i].toLowerCase() === q[index].toLowerCase()) {
      result += `<span class="text-primary-tw px-[0.3px]">${text[i]}</span>`;
      index++;
    } else result += text[i];
  }
  return result;
}

// moving
function moveDown() {
  if (!suggested.value.length) return;
  activeIndex.value = (activeIndex.value + 1) % suggested.value.length;
}
function moveUp() {
  if (!suggested.value.length) return;
  activeIndex.value =
    (activeIndex.value - 1 + suggested.value.length) % suggested.value.length;
}
function handleClickOutside(e) {
  if (searchWrapper.value && !searchWrapper.value.contains(e.target)) {
    if (typeof searchStore.close === "function") {
      searchStore.close();
    } else {
      searchStore.open = false;
      searchStore.activeIndex = -1;
    }
  }
}
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

//////////////// add/delete fav/ornot done/notdone
// add
const addTask = (taskText) => {
  const exist = tasks.value.some(
    (t) => t.text.toLowerCase() === taskText.toLowerCase()
  );
  if (exist) {
    Swal.fire({
      position: "top-end",
      icon: "warning",
      title: "تسک از قبل موجود است",
      showConfirmButton: false,
      timer: 2000,
      toast: true,
      background: "#0D9488",
      color: "#fff",
    });
    return;
  }
  tasks.value.push({
    id: genId(tasks.value.length),
    text: taskText,
    done: false,
    editing: false,
    favorite: false,
    highlighted: false,
  });
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "تسک با موفقیت اضافه شد",
    showConfirmButton: false,
    timer: 2000,
    toast: true,
    background: "#0D9488",
    color: "#fff",
  });
};

// delete
// ToDoApp.vue
const deleteTaskById = (id) => {
  const idx = tasks.value.findIndex((t) => t.id === id);
  if (idx !== -1) {
    tasks.value.splice(idx, 1);
    // نمایش پیام حذف
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "تسک با موفقیت حذف شد",
      showConfirmButton: false,
      timer: 1500,
      toast: true,
      background: "#0D9488",
      color: "#fff",
    });
  }
};

// toggle done/notdone
const toggleTask = (id) => {
  const idx = tasks.value.findIndex((t) => t.id === id);
  if (idx !== -1) tasks.value[idx].done = !tasks.value[idx].done;
};
// toggle fav/not fav
const toggleFavorite = (id) => {
  const idx = tasks.value.findIndex((t) => t.id === id);
  if (idx !== -1) tasks.value[idx].favorite = !tasks.value[idx].favorite;
};

// filtered tasks
const filteredTasks = computed(() => {
  let result = tasks.value;
  if (filter.value === "done") result = result.filter((task) => task.done);
  else if (filter.value === "notdone")
    result = result.filter((task) => !task.done);
  else if (filter.value === "favorite")
    result = result.filter((task) => task.favorite);
  // search
  const q = search.value.trim().toLowerCase();
  if (q.length >= 3)
    result = result.filter((t) => t.text.toLowerCase().includes(q));
  return result;
});

//////////// confirm delete
const confirmDeleteModal = async (id) => {
  const result = await Swal.fire({
    title: " آیا تسک حذف شود؟ ",
    icon: "warning",
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: "بله",
    cancelButtonText: "خیر",
    confirmButtonColor: "#e11d48",
    cancelButtonColor: "#ffffff",
    background: "#ffffff",
    customClass: {
      popup: "rounded-2xl shadow-hg",
      title: "text-lg font-semibold text-center",
      content: "text-sm text-gray-600",
      confirmButton: "px-5 py-2 rounded-lg text-white",
      cancelButton: "px-5 py-2 rounded-lg",
    },
    backdrop: `rgba(0,0,0,0.45) left top no-repeat`,
  });

  if (result.isConfirmed) {
    deleteTaskById(id);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "تسک با موفقیت حذف شد",
      showConfirmButton: false,
      timer: 2000,
      toast: true,
      background: "#0D9488",
      color: "#fff",
    });
  }
};

////////////////// spotlight mouse
const spotContainer = ref(null);
const mouse = reactive({ x: -9999, y: -9999 });
const trail = reactive({ x: -9999, y: -9999 });
const mouseActive = ref(false);
let hideTimeout = null;
let rafId = null;
function animateSpot() {
  const ease = 0.12;
  trail.x += (mouse.x - trail.x) * ease;
  trail.y += (mouse.y - trail.y) * ease;
  rafId = requestAnimationFrame(animateSpot);
}
function onMouseMoveWindow(e) {
  const rect = spotContainer.value?.getBoundingClientRect?.();
  mouse.x = rect ? e.clientX - rect.left : e.clientX;
  mouse.y = rect ? e.clientY - rect.top : e.clientY;
  mouseActive.value = true;
  if (hideTimeout) clearTimeout(hideTimeout);
  hideTimeout = setTimeout(() => (mouseActive.value = false), 900);
}
function onTouchMoveWindow(e) {
  const touch = e.touches?.[0];
  if (!touch) return;
  onMouseMoveWindow({ clientX: touch.clientX, clientY: touch.clientY });
}
onMounted(() => {
  animateSpot();
  window.addEventListener("mousemove", onMouseMoveWindow);
  window.addEventListener("touchmove", onTouchMoveWindow, { passive: true });
});
onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId);
  window.removeEventListener("mousemove", onMouseMoveWindow);
  window.removeEventListener("touchmove", onTouchMoveWindow);
  if (hideTimeout) clearTimeout(hideTimeout);
});

const spotlightStyle = computed(() => {
  const radius = 220,
    innerRadius = 80,
    alpha = 1,
    innerAlpha = 0.8;
  const opacity = mouseActive.value ? 1 : 0;
  const cx = isFinite(trail.x) ? Math.round(trail.x) : -9999;
  const cy = isFinite(trail.y) ? Math.round(trail.y) : -9999;
  return {
    position: "absolute",
    inset: "0",
    width: "100%",
    height: "100%",
    background: `
      radial-gradient(circle ${innerRadius}px at ${cx}px ${cy}px, rgba(255,255,255,${innerAlpha}), transparent 40%),
      radial-gradient(circle ${radius}px at ${cx}px ${cy}px, rgba(255,255,255,${alpha}), transparent 60%)
    `,
    filter: "blur(32px)",
    mixBlendMode: "screen",
    pointerEvents: "none",
    transition: "opacity 220ms ease, background 60ms linear",
    opacity,
    zIndex: 2,
    willChange: "background, opacity",
  };
});

////////////////reorder
const handleReorder = (newIds) => {
  if (!Array.isArray(newIds) || newIds.length === 0) return;
  const idSet = new Set(newIds);
  const idToTask = Object.fromEntries(tasks.value.map((t) => [t.id, t]));
  const queue = [...newIds];
  const result = tasks.value.map((t) =>
    idSet.has(t.id) ? idToTask[queue.shift()] : t
  );
  while (queue.length) {
    const id = queue.shift();
    if (idToTask[id]) result.push(idToTask[id]);
  }
  tasks.value = result;
};

// update task
const handleUpdateTask = (updatedTask) => {
  const index = tasks.value.findIndex((t) => t.id === updatedTask.id);
  if (index !== -1) {
    tasks.value[index] = {
      ...tasks.value[index],
      ...updatedTask,
      id: tasks.value[index].id,
    };
  }
};
</script>

<style>
html,
body {
  overflow-x: hidden !important;
}
/* animatin image */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

/* search  */
.input-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  position: relative;
}

.input {
  border-style: none;
  height: 50px;
  width: 50px;
  padding: 10px;
  outline: none;
  border-radius: 50%;
  transition: 0.5s ease-in-out;
  box-shadow: 0px 0px 3px #f3f3f3;
  padding-right: 40px;
  color: black;
  overflow: hidden;
}

.input::placeholder,
.input {
  font-size: 15px;
}

.input::placeholder {
  color: black;
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0px;
  cursor: pointer;
  width: 50px;
  height: 50px;
  outline: none;
  border-style: none;
  border-radius: 50%;
  pointer-events: painted;
  background-color: transparent;
  transition: 0.2s linear;
}

.icon:focus ~ .input,
.input:focus {
  box-shadow: none;
  width: 250px;
  border-radius: 0px;
  background-color: transparent;
  border-bottom: 3px solid var(--secondary-tw);
  transition: all 500ms cubic-bezier(0, 0.11, 0.35, 2);
}
.input-wrapper {
  display: flex;
  align-items: center;
  position: relative;
}

.input-wrapper .icon-path {
  stroke: #fff;
  transition: stroke 0.3s ease;
}

.input-wrapper:focus-within .icon-path {
  stroke: var(--primary);
}

/* responsive search */
@media (max-width: 768px) {
  .icon:focus ~ .input,
  .input:focus {
    box-shadow: none;
    width: 13rem;
    border-radius: 0px;
    background-color: transparent;
    border-bottom: 3px solid var(--secondary-tw);
    transition: all 500ms cubic-bezier(0, 0.11, 0.35, 2);
  }
  .container-search {
    display: flex;
    justify-content: start !important;
  }
}

/* mouse */
.spotlight {
  mix-blend-mode: screen;
  filter: brightness(2);
  filter: blur(1px);
  opacity: 1;
  pointer-events: none;
}

.z-content {
  z-index: 100;
  position: relative;
}
</style>
