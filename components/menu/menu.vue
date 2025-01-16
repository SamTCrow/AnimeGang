<script lang="ts" setup>
const open = ref(false);

const menu = [
  {
    label: "AnimeGang",
    to: "/",
    links: [
      [
        {
          label: "Top Anime",
          to: "/anime/top"
        },
        {
          label: "Anime season",
          to: "/anime/season"
        },
        
      ]
    ]
  }
];
</script>

<template>
  <div>
    <ul class="hidden gap-4 text-lg font-medium lg:flex">
      <li v-for="item in menu" :key="item.label">
        <UDropdown
          mode="hover"
          :items="item.links"
          :popper="{
            placement: 'bottom-start',
            arrow: true,
            offsetDistance: -5
          }"
        >
          <ULink
            :to="item.to"
            class="dark:hover:text-primary-200 hover:text-primary-800"
            >{{ item.label }}</ULink
          >
        </UDropdown>
      </li>
    </ul>
    <Icon
      class="block cursor-pointer lg:hidden"
      name="charm:menu-hamburger"
      size="30"
      @click="open = true"
    />
    <div
      v-if="open"
      class="fixed left-0 top-0 z-50 h-screen w-full bg-gray-200 p-2 lg:hidden dark:bg-gray-800"
    >
      <Icon
        class="absolute right-2 top-2 cursor-pointer"
        name="mingcute:close-fill"
        size="30"
        @click="open = false"
      />
      <h1 class="mb-4 text-2xl font-bold">AnimeGang</h1>
      <ul class="ml-4 space-y-8">
        <li v-for="item in menu" :key="item.label" class="text-md">
          <ULink
            :to="item.to"
            class="dark:hover:text-primary-200 hover:text-primary-800 text-xl"
            >{{ item.label }}</ULink
          >
          <ul class="mt-2">
            <li
              v-for="menulinks in item.links"
              :key="menulinks.indexOf"
              class="text- ml-4 flex flex-col items-start gap-2"
            >
              <ULink
                v-for="link in menulinks"
                :key="link.label"
                class="dark:hover:text-primary-200 hover:text-primary-800"
              >
                {{ link.label }}
              </ULink>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
