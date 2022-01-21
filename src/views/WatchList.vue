<template>
  <div class="keranjang">
    <Navbar :updateItem="listItems" />
    <div class="container">
      <!-- breadcrumb -->
      <div class="row mt-4">
        <div class="col">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-dark">Home</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Watch List</li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row mb-4">
        <div v-if="isLoading" class="text-center mt-5">
          <div class="spinner-border mt-5" role="status">
            <span class="sr-only"></span>
          </div>
        </div>
        <div v-else>
          <div class="row" v-if="listItems.length">
            <div class="col-md-3 mt-4" v-for="item in listItems" :key="item.id">
              <CardItem 
                :items="item"
                :ctg="item.flag"
                :mark="true"
              />
            </div>
          </div>
          <!-- <div v-if="isNotFound">
            <div class="col-md-3 mt-4">
              <h5>Data Tidak Ditemukan </h5>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import CardItem from '@/components/CardItem.vue'
import axios from 'axios'
export default {
  name: 'WatchList',
  components: {
    Navbar, CardItem
  },
  data() {
    return {
      isLoading: false,
      base_url: 'https://api.themoviedb.org/3',
      key: '3773c1e3b8ce64d6d55c2316bb1b8f69',
      sess_id: '577fb2263adc661ee25e43de46bb5a1090613f0c',
      // dtObj : [
      //   listItems: [],
      //   flag: ''
      // ]
      listItems: []

    }
  },
  mounted () {
    this.getWatchMovie()
    this.getWatchTv()
  },
  methods: {
    getWatchMovie() {
      this.isLoading = true
      axios.get(`${this.base_url}/account/20/watchlist/movies?api_key=${this.key}&session_id=${this.sess_id}`)
        .then((res) => {
          const data = res.data.results
          const newData = data.map((el) => ({
            ...el,
            flag: 'Movies'
          }));
          newData.forEach(item => {
            this.listItems.push(item)
          })
          this.isLoading = false
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getWatchTv() {
      this.isLoading = true
      axios.get(`${this.base_url}/account/20/watchlist/tv?api_key=${this.key}&session_id=${this.sess_id}`)
        .then((res) => {
          const data = res.data.results
          const newData = data.map((el) => ({
            ...el,
            flag: 'Shows'
          }));
          newData.forEach(item => {
            this.listItems.push(item)
          })
          this.isLoading = false
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
}
</script>