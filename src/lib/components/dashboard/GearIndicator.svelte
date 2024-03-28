<script>
    /**
     * @type {Number}
     */
    export let current_gear_display
</script>

<div id="gear-indicator-main-container">
    <h1>{current_gear_display === 0 ? "N" : current_gear_display}</h1>
    <h4>GEAR</h4>
</div>


<style lang="scss">
  #gear-indicator-main-container {
    padding: 5%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border-radius: 25px;
    background: var(--deep-jewel-green-primary-color);
    color: var(--light-color);
    filter: drop-shadow(0px 10px 10px var(--hard-background-color));

    h1 {
      font-size: 20rem;
      filter: drop-shadow(0px 10px 10px var(--hard-background-color));
    }

    h4 {
      opacity: .6;
      font-weight: lighter;
      text-indent: 2rem;
      font-size: 3rem;
      letter-spacing: 2rem;
      filter: drop-shadow(0px 5px 5px var(--hard-background-color));
    }
  }
</style>
