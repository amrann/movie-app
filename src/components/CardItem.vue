<template>
  <div class="card shadow card-product">
    <div class="movie-img">
      <img
        :src="`https://image.tmdb.org/t/p/w500/${items.poster_path}`"
        class="card-img-top"
        alt=""
      />
      <p class="overview">{{ items.overview }}</p>
    </div>
    <div class="card-body">
      <h5 class="card-title">
        <strong>
          {{ items.title ? items.title.slice(0, 20) : items.name.slice(0, 20) }}
          <span v-if="items.title">
            <span v-if="items.title.length > 20"> ... </span>
          </span>
          <span v-if="items.name">
            <span v-if="items.name.length > 20"> ... </span>
          </span>
        </strong>
      </h5>
      <p
        class="card-text"
      >Released:
        {{
          items.release_date ? 
          new Date(items.release_date).toLocaleString('en-us', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          }) :
          new Date(items.first_air_date).toLocaleString('en-us', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })
        }} </p>
      <!-- <a href="#" class="btn btn-success">Pesan</a>
      <b-icon-cart></b-icon-cart> -->
      <b-icon :icon="isBookmark ? 'bookmark-fill' : 'bookmark'" font-scale="2" type="submit" @click="actBtnBookmark(items, ctg)"></b-icon>
      <!-- <router-link class="btn btn-success" :to="'/foods/'+product.id"><b-icon-cart></b-icon-cart> Pesan</router-link> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CardProduct',
  props: ['items', 'ctg', 'mark'],
  data() {
    return {
      base_url: 'https://api.themoviedb.org/3',
      key: '3773c1e3b8ce64d6d55c2316bb1b8f69',
      sess_id: '577fb2263adc661ee25e43de46bb5a1090613f0c',
      isBookmark: false
    }
  },
  mounted () {
    this.isBookmark = this.mark
  },
  methods: {
    actBtnBookmark(item, cate) {
      if(this.isBookmark) {
        const payload = {
          "media_type": cate === 'Movies' ? "movie" : 'tv',
          "media_id": item.id,
          "watchlist": false
        }
        axios.post(`https://api.themoviedb.org/3/account/20/watchlist?api_key=${this.key}&session_id=${this.sess_id}`, payload)
          .then((res) => {
            this.$toast.success('Berhasil Menghapus', {
              type: 'success',
              position: 'top-right',
              duration: 3000,
              dismissible: true
            })
            window.location.reload()            
          })
          .catch((err) => {
            console.log(err)
            this.$toast.error('Gagal', {
              type: 'error',
              position: 'top-right',
              duration: 3000,
              dismissible: true
            })
          })
      } else {
        const payload = {
          "media_type": cate === 'Movies' ? "movie" : 'tv',
          "media_id": item.id,
          "watchlist": true
        }
        axios.post(`https://api.themoviedb.org/3/account/20/watchlist?api_key=${this.key}&session_id=${this.sess_id}`, payload)
          .then((res) => {
            this.$toast.success('Berhasil Menambahkan', {
              type: 'success',
              position: 'top-right',
              duration: 3000,
              dismissible: true
            })
            this.isBookmark = true
          })
          .catch((err) => {
            console.log(err)
            this.$toast.error('Gagal', {
              type: 'error',
              position: 'top-right',
              duration: 3000,
              dismissible: true
            })
          })
      }
    }
  },
}
</script>

<style scoped >
  .movie-img {
    position: relative;
    overflow: hidden;
  }
  .overview {
    line-height: 1.5;
    position: absolute;
    bottom: 0;
    background-color: rgba(201, 38, 2, 0.9);
    padding: 12px;
    color: #fff;
    transform: translateY(100%);
    transition: 0.3s ease-in-out all;
  }
  .overview:hover {
    transform: translateY(0);
  }
</style>
