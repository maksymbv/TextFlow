<script setup>
import { ref, defineExpose } from "vue";
import CloseIcon from "@/assets/icons/settings/CloseIcon.vue";
import LogoIcon from "@/assets/icons/settings/LogoIcon.vue";
const isOpen = ref(false);
const theme = ref(
  document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark"
);

const THEME_KEY = "textflow-theme";

const applyTheme = (value) => {
  const normalized = value === "light" ? "light" : "dark";
  theme.value = normalized;
  document.documentElement.setAttribute("data-theme", normalized);
  document.documentElement.style.backgroundColor =
    normalized === "light" ? "#f5f5f7" : "#171717";
  try {
    localStorage.setItem(THEME_KEY, normalized);
  } catch {
    // ignore storage errors
  }
};

const open = () => {
  document.body.style.overflow = "hidden";
  isOpen.value = true;
};
const close = () => {
  isOpen.value = false;
  document.body.style.overflow = "auto";
};

const onThemeChange = (event) => {
  applyTheme(event.target.value);
};

defineExpose({ open });
</script>
<template>
  <Teleport to="body"
    ><div v-if="isOpen" class="modal-overlay" @click.self="close">
      <div class="settings-modal">
        <div class="settings-header">
          <h3>Settings</h3>
          <button @click="close" class="control-item"><CloseIcon /></button>
        </div>
        <div class="setting-item">
          <span class="setting-item-name">Theme</span>
          <select
            name="theme"
            id="theme-toggle"
            class="control-item"
            :value="theme"
            @change="onThemeChange"
          >
            <option value="dark">Dark theme (Default)</option>
            <option value="light">Light theme</option>
          </select>
        </div>
        <div class="divider"></div>
        <div class="setting-item">
          <span class="setting-item-name">About</span>
          <p class="setting-item-text">
            TextFlow is a minimal note app for quick thoughts, tasks and ideas.
            Notes are stored only in your browser using IndexedDB, so nothing is
            sent to a server. You can export any note as a TXT file if you want
            to back it up or share it.
          </p>
          <a href="https://github.com/mxbv/TextFlow-web" class="control-item">
            <LogoIcon /> <span>View source</span>
          </a>
        </div>
      </div>
    </div></Teleport
  >
</template>

<style scoped>
.modal-overlay {
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 100vh;
  background: #1010105a;
  backdrop-filter: blur(10px);
  z-index: 1000;
}

.settings-modal {
  background: var(--bg);
  padding: 1.5rem;
  border-radius: 12px;
  width: 50%;
  border: solid 1px var(--accent);
  animation: fadeIn 0.3s ease;
}
.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: var(--text);
  margin-bottom: 20px;
}
.settings-header h3 {
  font-size: 1.2rem;
}
.close {
  margin: 0;
}
.setting-item {
  color: var(--text);
}
.setting-item-name {
  display: block;
  color: #adadad;
  margin-bottom: 20px;
}
.setting-item-text {
  margin-bottom: 20px;
}
.button span {
  margin-left: 5px;
}
.divider {
  width: 100%;
  height: 1px;
  background-color: var(--content-block);
  margin: 20px 0;
}
@media screen and (max-width: 992px) {
  .settings-modal {
    width: 95%;
  }
}
</style>
