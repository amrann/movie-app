<template>
  <div class="mt-4">
    <b-navbar toggleable="lg" type="light">
      <div class="container">
        <b-navbar-brand href="/">Movies</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <!-- <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li> -->
            <!-- <li class="nav-item">
              <router-link class="nav-link" to="/foods">Foods</router-link>
            </li> -->
            <b-nav-item-dropdown  right>
              <template #button-content>
                Movies
              </template>
              <b-dropdown-item>
                <li class="nav-item" @click="toTopRated">Top Rated</li>
              </b-dropdown-item>
              <b-dropdown-item >
                <li class="nav-item" @click="toUpcoming">Upcoming</li>
              </b-dropdown-item>
              <b-dropdown-item >
                <li class="nav-item" @click="toPlaying">Now Playing</li>
              </b-dropdown-item>
              <b-dropdown-item >
                <li class="nav-item" @click="toPopular">Popular</li>
              </b-dropdown-item>
              <!-- <b-dropdown-item>
                <router-link class="nav-link" to="/toprated">Top Rated</router-link>
              </b-dropdown-item>
              <b-dropdown-item >
                <router-link class="nav-link" to="/upcoming">Upcoming</router-link>
              </b-dropdown-item>
              <b-dropdown-item >
                <router-link class="nav-link" to="/playing">Now Playing</router-link>
              </b-dropdown-item>
              <b-dropdown-item >
                <router-link class="nav-link" to="/popular">Popular</router-link>
              </b-dropdown-item> -->
            </b-nav-item-dropdown>
            <b-nav-item-dropdown  right>
              <template #button-content>
                TV Shows
              </template>
              <b-dropdown-item>
                <li class="nav-item" @click="toPopularShow">Popular</li>
              </b-dropdown-item>
              <b-dropdown-item >
                <li class="nav-item" @click="toTopShow">Top Rated</li>
              </b-dropdown-item>
              <b-dropdown-item >
                <li class="nav-item" @click="toOnShow">On The Air</li>
              </b-dropdown-item>
              <b-dropdown-item >
                <li class="nav-item" @click="toAiring">Airing Today</li>
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>

          <b-navbar-nav class="ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/watch">
                Watch List
                <b-icon icon="list-stars"></b-icon>
                <span
                  class="badge badge-success ml-2"
                >{{ updateItem ? updateItem.length : listItems.length}}</span>
                <!-- <span
                  class="badge badge-success ml-2"
                >{{ updateKeranjang ? updateKeranjang.length : jumlah_pesanans.length }}</span> -->
              </router-link>
            </li>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Navbar',
  data () {
    return {
      base_url: 'https://api.themoviedb.org/3',
      key: '3773c1e3b8ce64d6d55c2316bb1b8f69',
      sess_id: '577fb2263adc661ee25e43de46bb5a1090613f0c',
      listItems: []
    }
  },
  props: ['updateItem'],
  mounted () {
    this.getWatchMovie()
    this.getWatchTv()
  },
  methods: {
    getWatchMovie() {
      axios.get(`${this.base_url}/account/20/watchlist/movies?api_key=${this.key}&session_id=${this.sess_id}`)
        .then((res) => {
          console.log(res, "res watch movie list")
          const data = res.data.results
          data.forEach(item => {
            this.listItems.push(item)
          })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getWatchTv() {
      axios.get(`${this.base_url}/account/20/watchlist/tv?api_key=${this.key}&session_id=${this.sess_id}`)
        .then((res) => {
          console.log(res, "res watch tv list")
          const data = res.data.results
          data.forEach(item => {
            this.listItems.push(item)
          })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    toTopRated() {
      this.$router.push({ path: "/toprated" })
      window.location.reload()
    },
    toUpcoming() {
      this.$router.push({ path: "/upcoming" })
      window.location.reload()
    },
    toPlaying() {
      this.$router.push({ path: "/playing" })
      window.location.reload()
    },
    toPopular() {
      this.$router.push({ path: "/popular" })
      window.location.reload()
    },
    toPopularShow() {
      this.$router.push({ path: "/popularshow" })
      window.location.reload()
    },
    toTopShow() {
      this.$router.push({ path: "/top" })
      window.location.reload()
    },
    toOnShow() {
      this.$router.push({ path: "/onshow" })
      window.location.reload()
    },
    toAiring() {
      this.$router.push({ path: "/airing" })
      window.location.reload()
    }
  }
}
</script>
