<template>
  <div id="modal">
    <div class="modal">
      <div class="modal-actions">
        <span
          @click="$emit('modalclosed')"
          class="modal-action">&times;
        </span>
      </div>
      <slot>
      </slot>
    </div>
    <div v-show="active" class="modal-backdrop">
      Loading...
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    active: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
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