import { defineStore } from "pinia";

const STORAGE_KEY = "searchState_v1";

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export const useSearchStore = defineStore("search", {
  state: () => {
    const saved = loadFromStorage();
    return {
      search: saved.search || "",
      open: false,
      activeIndex:
        typeof saved.activeIndex === "number" ? saved.activeIndex : -1,
    };
  },
  getters: {
    hasSearch: (state) => !!state.search.trim(),
  },
  actions: {
    _save() {
      try {
        const payload = {
          search: this.search,
          activeIndex: this.activeIndex,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      } catch (e) {
        console.error(e);
      }
    },

    setSearch(value) {
      this.search = value;
      this.open = !!value.trim();
      if (!value.trim()) this.activeIndex = -1;
      this._save();
    },

    moveDown(suggestionsLength) {
      if (!suggestionsLength) return;
      this.activeIndex = (this.activeIndex + 1) % suggestionsLength;
      this._save();
    },

    moveUp(suggestionsLength) {
      if (!suggestionsLength) return;
      this.activeIndex =
        (this.activeIndex - 1 + suggestionsLength) % suggestionsLength;
      this._save();
    },

    selectActive(suggestions) {
      if (
        this.activeIndex >= 0 &&
        suggestions &&
        suggestions[this.activeIndex]
      ) {
        this.search = suggestions[this.activeIndex].text;
        this.open = false;
        this.activeIndex = -1;
        this._save();
      }
    },

    selectSuggestion(task) {
      if (!task) return;
      this.search = task.text;
      this.open = false;
      this.activeIndex = -1;
      this._save();
    },

    clear() {
      this.search = "";
      this.open = false;
      this.activeIndex = -1;
      this._save();
    },

    close() {
      this.open = false;
      this.activeIndex = -1;
      this._save();
    },
  },
});
