<template>
  <div id="app" ref="printable">
    <div class="container">
      <div class="row">
        <div class="col-lg-9">
          <h5>Featured Info</h5>
          <div v-if="coins.length" class="row">
            <div class="col-lg-6 mb-4">
              <Coin :coin="profileQrData" />
            </div>
            <div
              v-for="coin in coins"
              :key="coin.id"
              class="col-lg-6 mb-4"
            >
              <Coin :coin="coin"/>
            </div>
          </div>

          <footer>
            <div class="row">
              <div class="col-lg-3 pt-3">
                Contact Info
              </div>
              <div class="col-lg-9">
                <ul class="contact-info">
                  <li v-for="link in contactInfoLinks" :key="link.text">
                    <a :href="link.url" target="_blank">
                      {{ link.text }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </footer>
        </div>

        <div class="col-lg-3">
          <h5>
            Twitter Feed
          </h5>
          <div
            v-for="feed in feeds" :key="feed.name"
            class="feed-container mb-4">
            <twitter>
              <a :href="feed.feed_url" class="twitter-timeline"  >
                {{ feed.name }}
              </a>
            </twitter>
          </div>
        </div>
      </div>
    </div>

    <Screenshot :canvas="viewport">
    </Screenshot>
    
  </div>
</template>

<script>
import Screenshot from "./components/Screenshot.vue"
import Coin from "./components/Coin.vue"
import axios from "axios"

export default {
  name: "App",
  components: {
    Coin, Screenshot
  },
  data() {return {
    viewport: this.$refs.printable,
    coins: [],
    feeds: [
      {
        name: 'BBCAfrica',
        title: 'Tweets by BBCAfrica',
        feed_url: 'https://twitter.com/BBCAfrica?ref_src=twsrc%5Etfw'
      },
      {
        name: 'Ethereum',
        title: 'Ethereum Twitter Feed',
        feed_url: 'https://twitter.com/ethereum?ref_src=twsrc%5Etfw'
      }
    ],
    contactInfoLinks: [
      {
        icon: "",
        text: "Github",
        url: "https://github.com/juantabares",
      },
      {
        icon: "",
        text: "LinkedIn",
        url: "https://github.com/juantabares",
      },
      {
        icon: "",
        text: "juantabares@gmail.com",
        url: "mailto:juantabares@gmail.com",
        mail: true,
      },
      {
        icon: "",
        text: "Resume",
        url: "https://github.com/juantabares",
      },
    ],
    profileQrData: {
      name: "Juan Tabares",
      price: "No price in",
    }    
  }},
  methods: {
    fetchCoinsPrice() {
      axios.get('http://localhost:3000')
           .then( response => this.coins = [...response.data])
    }
  },
  mounted() {
    this.viewport = this.$refs.printable
    this.fetchCoinsPrice()
  },
};
</script>

<style>
  body {
    margin: 0;
    font-size: 14px;
  }
  h5 {
    margin-top: 0;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100vh;
    padding: 0 20px;
    background: #efefef;
  }
  .navbar {
    height: 100vh;
    width: 50px;
    background: blue;
    margin-bottom: 20px;
    position: fixed;
    top: 0;
    left: 0;
  }
  .container {
    padding: 20px;
  }
  .coins {
    display: flex;
    flex-flow: row nowrap;
  }
  .contact-info {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    list-style-type: none;
    justify-content: space-between;
  }
  .contact-info li a {
    text-decoration: none;
    color: #2d2d2d;
  }
  @media (min-width: 991px) {
    .feed-container {
      max-height: calc(50vh - 100px);
      overflow: auto;
    }
  }
  footer {
    padding: 10px 30px 10px;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 1px 7px 1px rgba(0, 0, 0, 0.18);
  }
</style>
