<template>
  <div id="screenshot">
    <button @click="takeScreenshot" type="button" class="fab">
      <img src="./../assets/camera.svg" alt="" />
    </button>
    
    <div class="modal" v-show="screenshotUrl">
      <div class="modal-actions">
        <span @click="screenshotUrl = ''" class="modal-action">
          &times;
        </span>
      </div>
      <img :src="screenshotUrl" alt="" />
    </div>
    <div class="modal-backdrop" v-show="screenshotUrl">
    </div>
  </div>
</template>

<script>
export default {
  props: { canvas: Object },
  data() {
    return {
      screenshotUrl: "",
      options: {
        allowTaint: true,
        useCORS: true,
        type: "dataURL",
      },
    };
  },
  methods: {
    async takeScreenshot() {
      this.screenshotUrl = await this.$html2canvas(this.canvas, this.options);
    },
  },
};
</script>

<style scoped>
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