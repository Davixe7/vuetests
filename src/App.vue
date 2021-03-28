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
              <Coin :coin="coin" />
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
          <h5>Twitter Feed</h5>
          <div class="feed-container mb-4">
            <twitter>
              <a
                class="twitter-timeline"
                href="https://twitter.com/BBCAfrica?ref_src=twsrc%5Etfw"
              >
                Tweets by BBCAfrica
              </a>
            </twitter>
          </div>
          <div class="feed-container">
            <twitter>
              <a
                class="twitter-timeline"
                href="https://twitter.com/ethereum?ref_src=twsrc%5Etfw"
              >
                Ethereum
              </a>
            </twitter>
          </div>
        </div>
      </div>
    </div>

    <div class="modal" v-show="screenshotUrl">
      <div class="modal-actions">
        <span @click="screenshotUrl = ''" class="modal-action">
          &times;
        </span>
      </div>
      <img :src="screenshotUrl" alt="" />
    </div>

    <div class="modal-backdrop" v-show="screenshotUrl"></div>

    <button @click="takeScreenshot" type="button" class="fab">
      <img src="./assets/camera.svg" alt="">
    </button>
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
  data() {
    return {
      coins: [],
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
        slug: "Juan Tabares",
        quote: {
          USD: {
            price: "No price in",
          },
        },
      },
      screenshotUrl: "",
    };
  },
  methods: {
    async takeScreenshot() {
      const el = this.$refs.printable;
      const options = {
        useCORS: true,
        type: "dataURL",
      };
      this.screenshotUrl = await this.$html2canvas(el, options);
    },
    fetchCoinsPrice() {
      let config = {
        headers: {
          "X-CMC_PRO_API_KEY": "02710d96-5ee6-4c87-8d7e-c17228e2a664",
        }
      };
      let url = "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?slug=tezos,burst,cardano"
      axios.get(url, {}, config).then( response => {
        this.coins = Object.values(response.data.data);
      })
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
    bottom: 30px;
    right: 30px;
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
</style>
