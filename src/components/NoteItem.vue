<script setup>
import { computed } from "vue";
import StarIcon from "@/assets/icons/editor/StarIcon.vue";

const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});

const createdDateTime = computed(() => {
  if (!props.note.createdAt) return "";
  const date = new Date(props.note.createdAt);
  if (Number.isNaN(date.getTime())) return "";
  const time = date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${time}  ${day}.${month}.${year}`;
});
</script>

<template>
  <router-link :to="`/note/${note.id}`" class="note-item">
    <div class="note-main">
      <h3 class="note-title">
        {{ note.title || "Untitled" }}
      </h3>
      <h4 class="note-text" v-if="note.content">
        {{ note.content }}
      </h4>
    </div>
    <div class="note-meta">
      <span v-if="note.isFavorite" class="note-favorite ">
        <StarIcon />
      </span>
      <div class="note-date">
        {{ createdDateTime || note.date }}
      </div>
    </div>
  </router-link>
</template>

<style scoped>
.note-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: fit-content;
  margin: 0 auto;
  margin-bottom: 10px;
  padding: 1rem;
  background: var(--item);
  border-radius: 13px;
  text-decoration: none;
  overflow: hidden;
  color: var(--text);
  box-shadow: var(--note-shadow);
  border: 1px solid var(--note-border-color);
  transition: all 0.2s ease;
}

.note-item:hover {
  background-color: var(--item-hover);
  transform: translateY(-1px);
}
.note-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1 1 auto;
  min-width: 0;
}
.note-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 0 0 auto;
  margin-left: 1rem;
}
.note-title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 400;
  width: 100%;
  height: fit-content;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.note-date {
  margin-left: 0.5rem;
  font-weight: 300;
  color: #b3b3b3;
}
.note-text {
  margin: 0;
  font-size: 1rem;
  font-weight: 400;
  width: 100%;
  margin-top: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #b3b3b3;
  font-weight: 300;
}

.note-favorite {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--icon-color-strong);
  fill: var(--icon-color-strong);
}

.note-favorite svg {
  width: 18px;
  height: 18px;
}

.note-favorite :deep(svg path) {
  stroke: var(--icon-color-strong);
  fill: var(--icon-color-strong);
}

@media screen and (max-width: 992px) {
  .note-item {
    width: 100%;
    margin-bottom: 1.2rem;
  }
}
</style>
