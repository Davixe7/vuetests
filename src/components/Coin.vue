<template>
  <div class="coin">
      <h4 class="coin-name">
        {{ coin.name }}
      </h4>
      <div class="coin-price">
        {{ usdPrice }}
      </div>
      <div class="coin-qr">
        <QRCanvas :options="qrOptions"></QRCanvas>
      </div>
  </div>
</template>

<script>
import { QRCanvas } from 'qrcanvas-vue';
export default {
  name: 'Coin',
  components:{ QRCanvas: QRCanvas },
  props: { coin: Object},
  computed:{
    usdPrice(){
      return this.coin.price
             ? this.coin.price + ' USD'
             : 'No price to show'
    }
  },
  data(){return {
    qrOptions: {
      cellSize: 4,
      correctLevel: 'H',
      data: ''
    }
  }},
  mounted(){
    this.qrOptions = {...this.qrOptions, data: this.coin.name + ' ' + this.usdPrice }
    if( !this.coin.symbol ) return
    const image = new Image();
    image.src = require(`@/assets/icons/${this.coin.symbol.toLowerCase()}.png`)
    image.crossOrigin = 'Anonymous';
    let that = this
    image.onload = () => {
      that.qrOptions = {...this.qrOptions, logo: { image } }
    }
  }
}
</script>

<style scoped>
.coin {
  text-align: center;
  flex: 1 0 auto;
  height: 100%;
  padding: 20px 20px 30px;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 1px 10px 1px rgba(0,0,0,.15);
}
.coin-name {
  margin: 0 0 15px;
  text-transform: uppercase;
}
.coin-price {
  margin-bottom: 20px;
}
</style>
