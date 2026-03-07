<template>
  <footer class="px-2 py-1 d-flex justify-space-between bg-statusbarBackground">
    <div class="d-flex ga-3">
      <BaseButton icon="mdi-remote-desktop" class="px-1" />
      <BaseButton text="main" icon="mdi-source-branch" class="px-1" />
      <div class="d-flex">
        <BaseButton text="0" icon="mdi-close-circle-outline" class="px-1" />
        <BaseButton text="0" icon="mdi-alert-outline" class="px-1" />
      </div>
    </div>
    <div class="d-flex ga-3">
      <BaseButton text="Spaces: 2" class="px-1" />
      <BaseButton text="UTF-8" class="px-1" />
      <BaseButton text="LF" class="px-1" />
      <BaseButton text="Language" icon="mdi-code-braces" class="px-1" />
      <BaseButton icon="mdi-bell-outline" />
    </div>
  </footer>
</template>
