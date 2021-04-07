<template>
  <div id="app" ref="printable">
    <div class="container">
      <div class="row">
        <div class="col-lg-4">
          <h5>Featured Info</h5>
          <div v-if="coins.length" class="row">
            <div class="col-lg-6 mb-4">
              <Coin :coin="profileQrData" />
            </div>
            <div v-for="coin in coins" :key="coin.id" class="col-lg-6 mb-4">
              <Coin :coin="coin" />
            </div>
          </div>
        </div>
        <div class="col-lg-4 twitter">
          <h5>BBCAfrica</h5>

          <!-- <twitter>
            <a :href="feeds[0].feed_url" class="twitter-timeline">
              {{ feeds[0].name }}
            </a>
          </twitter> -->
        </div>

        <div class="col-lg-4 twitter">
          <h5>Ethereum</h5>
          <!-- <twitter>
            <a :href="feeds[1].feed_url" class="twitter-timeline">
              {{ feeds[1].name }}
            </a>
          </twitter> -->
        </div>
      </div>
    </div>

    <div class="modal" v-show="screenshotUrl">
      <div class="modal-actions">
        <span @click="screenshotUrl = ''" class="modal-action"> &times; </span>
      </div>
      <img :src="screenshotUrl" alt="" />
    </div>
    <div class="modal-backdrop" v-show="screenshotUrl"></div>

    <button @click="takeScreenshot" type="button" class="fab">
      <img src="./assets/camera.svg" alt="" />
    </button>
    <footer>
      <div class="row">
        <div class="col-lg-3 pt-3">Contact Info</div>
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
</template>

<script>
import Coin from "./components/Coin.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    Coin,
  },
  computed: {
    coinNames() {
      return this.coins.map((coin) => coin.name);
    },
  },
  data() {
    return {
      coins: [],
      feeds: [
        {
          name: "BBCAfrica",
          title: "Tweets by BBCAfrica",
          feed_url: "https://twitter.com/BBCAfrica?ref_src=twsrc%5Etfw",
        },
        {
          name: "Ethereum",
          title: "Ethereum Twitter Feed",
          feed_url: "https://twitter.com/ethereum?ref_src=twsrc%5Etfw",
        },
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
        price: "",
      },
      screenshotUrl: "",
    };
  },
  methods: {
    async takeScreenshot() {
      const el = this.$refs.printable;
      const options = {
        allowTaint: false,
        useCORS: true,
        type: "dataURL",
      };
      this.screenshotUrl = await this.$html2canvas(el, options);
    },
    fetchCoinsPrice() {
      let url =
        "https://api.nomics.com/v1/currencies/ticker?key=a144193450b0eb6509dd8e9b20b88995&ids=ADA,XTZ,BURST";
      axios.get(url).then((response) => {
        this.coins = [...response.data];
      });
    },
  },
  mounted() {
    //this.fetchCoinsPrice();
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
  max-width: 100vw !important;
}

.coins {
  display: flex;
  flex-flow: row nowrap;
}

.feed {
  display: flex;
  flex-flow: row nowrap;
  overflow: auto;
  padding: 0 0 20px;
  margin-bottom: 40px;
}
.feed-item {
  flex: 1 0 200px;
  margin-right: 30px;
  background: gray;
  height: 200px;
}
.fab {
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  z-index: 1000;
  position: fixed;
  bottom: 100px;
  left: 30px;
  box-shadow: 0 1px 15px 1px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  background: #fff;
}
.fab img {
  width: 30px;
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

.modal {
  position: fixed;
  z-index: 1200;
  width: 70%;
  height: auto;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
}
.modal-actions {
  padding: 10px;
  display: flex;
  justify-content: flex-end;
}
.modal-action {
  font-size: 24px;
  color: #fff;
  cursor: pointer;
}
.modal img {
  max-width: 100%;
}
.modal-backdrop {
  height: 100vh;
  width: 100vw;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1100;
  top: 0;
  left: 0;
}
.twitter {
  height: 85vh;
  overflow: auto;
}
</style>
