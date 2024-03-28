<script>
    /**
     * @type {Number}
     */
    export let current_speed_display
</script>
<div id="speedo-meter-container">
    <h1 id="speed">{current_speed_display}</h1>
    <h1 id="kilometer">Km</h1>
</div>
<style lang="scss">
  #speedo-meter-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    #speed {
      font-size: 10rem;
    }
    #kilometer {
      font-size: 5rem;
      transform: rotate(90deg);
      opacity: .6;
    }
  }
</style>