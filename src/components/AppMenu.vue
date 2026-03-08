<script setup>
const appTitle = import.meta.env.VITE_APP_TITLE

const files = {
  src: [
    {
      name: 'home',
      language: 'vue',
      icon: {
        value: 'mdi-vuejs',
        color: '#42b883',
      },
    },
    {
      name: 'about',
      language: 'html',
      icon: {
        value: 'mdi-language-html5',
        color: '#e34f26',
      },
    },
    {
      name: 'projects',
      language: 'js',
      icon: {
        value: 'mdi-language-javascript',
        color: '#f7df1e',
      },
    },
    {
      name: 'skills',
      language: 'json',
      icon: {
        value: 'mdi-code-json',
        color: 'rgb(var(--v-theme-comment))',
      },
    },
    {
      name: 'experience',
      language: 'ts',
      icon: {
        value: 'mdi-language-typescript',
        color: '#3178c6',
      },
    },
    {
      name: 'contact',
      language: 'css',
      icon: {
        value: 'mdi-language-css3',
        color: 'rgb(var(--v-theme-header))',
      },
    },
  ],
  root: [
    {
      name: 'HelloWorld',
      language: 'txt',
      icon: {
        value: 'mdi-file-document',
        color: 'rgb(var(--v-theme-lightGrey))',
      },
      active: true,
    },
    {
      name: 'README',
      language: 'md',
      icon: {
        value: 'mdi-language-markdown',
        color: 'rgb(var(--v-theme-name))',
      },
    },
  ],
}
</script>

<template>
  <nav class="bg-menuBackground">
    <div>
      <div class="px-5 py-2 d-flex ga-5 align-center">
        <div class="text-lightGrey" style="font-size: 0.825rem; font-family: Cascadia Code;">{{ appTitle.toUpperCase() }}</div>
        <div class="d-flex ga-1">
          <BaseButton icon="mdi-file-plus-outline" color="lightGrey" />
          <BaseButton icon="mdi-folder-plus-outline" color="lightGrey" />
          <BaseButton icon="mdi-refresh" color="lightGrey" />
          <BaseButton icon="mdi-dots-horizontal" color="lightGrey" />
        </div>
      </div>
      <div class="px-3 d-flex flex-column ga-1">
        <BaseFileFolder name="src" :files="files.src" />
        <BaseFileEntry v-for="file in files.root" :file="file" />
      </div>
    </div>
  </nav>
</template>
