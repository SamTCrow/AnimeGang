<script lang="ts" setup>
const menu = [
  {
    label: "Anime",
    to: "/anime",
    links: [
      [
        {
          label: "Top Anime",
          to: "/anime/top",
        },
        {
          label: "Anime season",
          to: "/anime/season",
        },
        {
          label: "Browse Anime",
          to: "/anime/browse",
        },
      ],
    ],
  },
  {
    label: "Manga",
    to: "/manga",
    links: [
      [
        {
          label: "Top Manga",
          to: "/manga/top",
        },
        {
          label: "Browse Manga",
          to: "/manga/browse",
        },
      ],
    ],
  },
  {
    label: "Characters",
    to: "/characters",
    links: [
      [
        {
          label: "Best characters",
          to: "/characters/best",
        },
        {
          label: "Worst characters",
          to: "/characters/worst",
        },
        {
          label: "Browse Characters",
          to: "/characters/worst",
        },
      ],
    ],
  },
];
</script>

<template>
  <ul class="flex gap-4 p-4 text-lg font-bold">
    <li v-for="item in menu" :key="item.label">
      <UDropdown mode="hover" :items="item.links" :popper="{ arrow: true }">
        <ULink :to="item.to">{{ item.label }}</ULink>
      </UDropdown>
    </li>
  </ul>
</template>
