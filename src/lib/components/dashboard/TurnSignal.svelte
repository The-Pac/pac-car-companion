<script>
    import MdiArrowCompass from 'virtual:icons/mdi/arrow-compass'

    /**
     * @type {Boolean}
     */
    export let is_active
    /**
     * @type {Number}
     */
    export let orientation_deg

</script>
<MdiArrowCompass id="turn-signal-icon"
                 style="transform: rotate( {orientation_deg}deg);
            font-size : 5rem;{
            is_active ?
            'animation: 1s infinite turn-signal-blink;'
             : ''}"/>


<style lang="scss">
  @keyframes turn-signal-blink {
    0%, 50%, 100% {
      color: var(--semantics-color-green);
      filter: drop-shadow(0px 0px 10px var(--semantics-color-green));
    }

    25%, 75% {
      color: var(--hard-background-color);
      opacity: 0.2;
    }
  }
</style>