<template>
  <div>
    <Navbar />
    <div class="container">
      <!-- <h2>Daftar Makanan</h2> -->
      <div class="row mt-4">
        <div class="col">
          <h2>
            List Movies 
            <strong>{{this.name_path.title}}</strong>
          </h2>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-4">
          <div class="input-group mb-3">
            <input
              v-model="cari"
              type="text"
              class="form-control"
              placeholder="Search ..."
              aria-label="Search"
              aria-describedby="basic-addon1"
              @keyup.enter="cariItem(true)"
            />
            <div v-show="cari" class="input-group-prepend">
              <span class="input-group-text" type="submit" @click="clear" id="basic-addon1">
                Clear Search
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="row mb-4">
        <div v-if="isLoading" class="text-center">
          <div class="spinner-border" role="status">
            <span class="sr-only"></span>
          </div>
        </div>
        <div v-else>
          <div class="row" v-if="listItems.length">
            <div class="col-md-3 mt-4" v-for="item in listItems" :key="item.id">
              <CardItem 
                :items="item"
                :ctg="name_path.isCategory"
                :mark="false"
              />
            </div>
          </div>
          <div class="row" v-if="listItemSearch.length">
            <div class="col-md-3 mt-4" v-for="item in listItemSearch" :key="item.id">
              <CardItem 
                :items="item"
                :ctg="name_path.isCategory"
                :mark="false"
              />
            </div>
          </div>
          <div v-if="isNotFound">
            <div class="col-md-3 mt-4">
              <h5>Data Tidak Ditemukan </h5>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-md-4">
              <div v-if="isBtnPage" class="input-group mb-3">
                <button type="button" class="btn btn-primary btn-lg btn-block" @click="loadPage">Load More ...
                  <span v-if="isLoadingBtn" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                </button>
              </div>
            </div>
          </div>
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
  name: 'Foods',
  components: {
    Navbar, CardItem
  },
  data () {
    return {
      base_url: 'https://api.themoviedb.org/3',
      key: '3773c1e3b8ce64d6d55c2316bb1b8f69',
      name_path: {
        title: '',
        path: '',
        isCategory: ''
      },
      isLoading: false,
      isLoadingBtn: false,
      listItems: [],
      listItemSearch: [],
      cari: '',
      hal: 1,
      isNotFound: false,
      isBtnPage: false,
      flag: {
        getitem: false,
        search: false
      }
    }
  },
  mounted () {
    console.log(this.$route.path, "route path")
    console.log(this.$route.name, "route name")
    if(this.$route.path === '/toprated') {
      this.name_path.path = 'top_rated'
      this.name_path.title = 'Top Rated'
      this.name_path.isCategory = this.$route.name
    } else if (this.$route.path === '/upcoming') {
      this.name_path.path = 'upcoming'
      this.name_path.title = 'Upcoming'
      this.name_path.isCategory = this.$route.name
    } else if (this.$route.path === '/playing') {
      this.name_path.path = 'now_playing'
      this.name_path.title = 'Now Playing'
      this.name_path.isCategory = this.$route.name
    } else if (this.$route.path === '/popular') {
      this.name_path.path = 'popular'
      this.name_path.title = 'Popular'
      this.name_path.isCategory = this.$route.name
    } else if(this.$route.path === '/popularshow') {
      this.name_path.path = 'popular'
      this.name_path.title = 'Popular'
      this.name_path.isCategory = this.$route.name
    } else if (this.$route.path === '/top') {
      this.name_path.path = 'top_rated'
      this.name_path.title = 'Top Rated'
      this.name_path.isCategory = this.$route.name
    } else if (this.$route.path === '/onshow') {
      this.name_path.path = 'on_the_air'
      this.name_path.title = 'On Air'
      this.name_path.isCategory = this.$route.name
    } else if (this.$route.path === '/airing') {
      this.name_path.path = 'airing_today'
      this.name_path.title = 'Airing Today'
      this.name_path.isCategory = this.$route.name
    } 
    this.getItems()
  },
  methods: {
    getItems() {
      this.isLoading = true
      this.flag.getitem = true
      this.flag.search = false
      this.isNotFound = false
      this.listItemSearch = []
      axios.get(this.name_path.isCategory === 'Movies' ? `${this.base_url}/movie/${this.name_path.path}?api_key=${this.key}&language=en-US&page=${this.hal}` : `${this.base_url}/tv/${this.name_path.path}?api_key=${this.key}&language=en-US&page=${this.hal}`)
        .then((res) => {
          console.log(res, "ini ress")
          const data = res.data.results
          data.forEach(item => {
            this.listItems.push(item)
          })
          if(res.data.total_pages !== this.hal) {
            this.isBtnPage = true 
          } else {
            this.isBtnPage = false
          }
          this.isLoading = false
        })
        .catch((err) => {
          console.log(err)
        })
    },
    cariItem(data=false) {
      this.isLoading = true
      this.flag.getitem = false
      this.flag.search = true
      this.isNotFound = false
      this.listItems = []
      if(data === true) {
        this.listItemSearch = []
      }
      if(this.cari) {
        axios.get(this.name_path.isCategory === 'Movies' ? `${this.base_url}/search/movie?api_key=${this.key}&language=en-US&page=${this.hal}&query=${this.cari}` : `${this.base_url}/search/tv?api_key=${this.key}&language=en-US&page=${this.hal}&query=${this.cari}`)
        .then((res) => {
          console.log(res, "res search")
          const data = res.data.results
          data.forEach(item => {
            this.listItemSearch.push(item)
          })
          console.log(this.listItemSearch.length, "length searc")
          if (this.listItemSearch.length === 0) {
            this.isNotFound = true
          }
          if(res.data.total_pages > this.hal) {
            this.isBtnPage = true 
          } else {
            this.isBtnPage = false
          }
          this.isLoading = false
        })
        .catch((err) => {
          console.log(err)
        })
      } else {
        this.hal = 1
        this.getItems()
      }
      
    },
    async loadPage() {
      this.hal += 1
      this.isLoadingBtn = true
      if(this.flag.getitem) {
        await this.getItems()
        this.isLoadingBtn = false
      } else {
        await this.cariItem()
        this.isLoadingBtn = false
      }
    },
    clear() {
      this.cari = ''
      this.getItems()
    }
  }
}
</script>
