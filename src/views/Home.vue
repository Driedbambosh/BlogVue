<template>
  <div class="home">
    <top-bar></top-bar>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import topBar from '@/components/topBar'

export default {
  name: 'Home',
  components: {
    topBar
  },
  
}
</script>
