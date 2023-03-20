<template>
  <div class="bg" ref="RING">
    <router-view/>
  </div>
</template>

<script>
import RINGS from 'vanta/src/vanta.rings'
import * as THREE from "three";
import HALO from "vanta/src/vanta.halo";
export default {
  name: "Login",
  mounted() {
  this.vantaEffect = RINGS({
    el: this.$refs.RING,
    THREE: THREE
  }), VANTA.RINGS({
    el: this.$refs.RING,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00
  });
},
beforeDestroy() {
  if (this.vantaEffect) {
    this.vantaEffect.destroy()
  }
},
}
</script>

<style scoped>
.bg{
  /*background-image: url("../assets/loginBackground.png");*/
  background-size:100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  padding: 0px;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
