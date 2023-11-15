<template>
    <NotFound />
 </template>
 <script>
 // @ is an alias to /src

 import NotFound from  '@/components/NotFound.vue'

 
 export default {
   name: 'NotFoundView',
   components: {
    NotFound
   }
 }
 </script>
 <style scoped>
 #content {
   background-color: var(--background);  
 }
 </style>
 