<template>
  <div id="app" ref="printable">
    <div class="container">
      <div class="row">
        <div class="col-lg-4">
          <h5>Featured Info</h5>
          <div v-if="coins && coins.length" class="row">
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
          <twitter>
            <a :href="feeds[0].feed_url" class="twitter-timeline">
              {{ feeds[0].name }}
            </a>
          </twitter>
        </div>

        <div class="col-lg-4 twitter">
          <h5>Ethereum</h5>
          <twitter>
            <a :href="feeds[1].feed_url" class="twitter-timeline">
              {{ feeds[1].name }}
            </a>
          </twitter>
        </div>
      </div>
    </div>

    <modal
      :active="!!screenshot.url"
      :loading="screenshot.loading"
      @modalclosed="()=>screenshot.url=''">
      <img :src="screenshot.url" alt="">
    </modal>

    <div class="fabs-container">
      <button
        @click="takeScreenshot"
        type="button"
        class="fab">
        <div v-if="screenshot.loading">...</div>
        <img v-else src="./assets/camera.svg" alt="screenshot" />
      </button>

      <button
        v-show="coins && coins.length"
        @click="getCSV"
        type="button"
        class="fab">
        CSV
      </button>
    </div>

    <footer>
      <div class="row">
        <div class="col-lg-3 pt-3">Contact Info</div>
        <div class="col-lg-9">
          <ul class="contact-info">
            <li
              v-for="link in contactInfoLinks"
              :key="link.text">
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
import Modal from "./components/Modal.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    Coin,
    Modal
  },
  computed: {
    exportableData() {
      return [...this.coins, this.profileQrData]
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
      screenshot: {
        url: '',
        loading: false
      },
    };
  },
  methods: {
    getCSV() {
      if (!window.ipcRenderer){
        alert("Only available in Electron Desktop Version")
        return
      }
      window.ipcRenderer.send("csv:get", JSON.stringify(this.exportableData));
    },
    async takeScreenshot() {
      const options = {
        type: "dataURL",
        useCORS: true,
        allowTaint: false,
      };
      this.screenshot.loading = true
      this.screenshot.url = await this.$html2canvas(this.$refs.printable, options);
      this.screenshot.loading = false
    },
    fetchCoinsPrice() {
      let url = "https://api.nomics.com/v1/currencies/ticker?key=a144193450b0eb6509dd8e9b20b88995&ids=ADA,XTZ,BURST";
      axios.get(url).then((response) => {
        this.coins = [...response.data];
      });
    },
  },
  mounted() {
    this.fetchCoinsPrice();
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
.container {
  padding: 20px;
  max-width: 100vw !important;
}
footer {
  padding: 10px 30px 10px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 1px 7px 1px rgba(0, 0, 0, 0.18);
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
.fabs-container {
  display: flex;
  flex-flow: column nowrap;
  position: fixed;
  bottom: 70px;
  left: 30px;
  z-index: 1000;
}
.fab {
  width: 60px;
  height: 60px;
  margin-bottom: 20px;
  border: none;
  border-radius: 50%;
  box-shadow: 0 1px 15px 1px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  background: #fff;
}
.fab img {
  width: 30px;
}
.twitter {
  height: 85vh;
  overflow: auto;
}
</style>
