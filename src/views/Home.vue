<template>
  <div class="home">
    <Navbar />
     <div class="container">
      <Hero/>
    </div> 
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Hero from '@/components/Hero.vue'
import axios from 'axios'
export default {
  name: 'Foods',
  components: {
    Navbar, 
    Hero, 
  },
  data () {
    return {
      itemProducts: []
    }
  },
  mounted () {
    this.getItem()
  },
  methods: {
    getItem () {
      axios.get("http://localhost:3000/best-products")
        .then((res) => {
          this.itemProducts = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
