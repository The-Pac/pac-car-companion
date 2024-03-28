<script>
    import {onMount} from "svelte";
    import {current_rpm, idle_rpm, max_rpm, medium_rpm} from "$lib/stores.js";


    /**
     * @type {Number}
     */
    let current_rpm_display = 0

    /**
     * @type {Number}
     */
    let max_rpm_display
    /**
     * @type {Number}
     */
    let idle_rpm_display
    /**
     * @type {Number}
     */
    let medium_rpm_display


    onMount(() => {
        current_rpm.subscribe((value) => {
            current_rpm_display = value
        })
        max_rpm.subscribe((value) => {
            max_rpm_display = value
        })
        idle_rpm.subscribe((value) => {
            idle_rpm_display = value
        })
        medium_rpm.subscribe((value) => {
            medium_rpm_display = value
        })

        let rpm_display_element = document.getElementById("rpm-display")

        let idle_percent = Math.floor(((idle_rpm_display) / max_rpm_display) * 100)
        let medium_percent = Math.floor(((medium_rpm_display) / max_rpm_display) * 100)

        if (rpm_display_element) {
            rpm_display_element.style.setProperty('--gradiant-rpm-background',
                "linear-gradient(90deg" +
                ",var(--rpm-minimal-zone)" +
                ",var(--rpm-minimal-zone) " + (idle_percent - 1) +
                "%,var(--rpm-normal-zone) " + (idle_percent + 1) +
                "%,var(--rpm-normal-zone) " +
                ",var(--rpm-medium-zone)" + (medium_percent - 5) +
                "%,var(--rpm-high-zone) " + (medium_percent + 5) +
                "%,var(--rpm-high-zone) 100%)");
        }
    })
</script>

<div id="rpm-counter-main-container">
    <progress id="rpm-display" value={current_rpm_display} max="{max_rpm_display}"></progress>
    <div id="rpm-display-tic">
        {#each {length: Math.floor(max_rpm_display / 1000) + 1} as _ , i}
            <label class="tic-number" for="rpm-display">{i}</label>
        {/each}
    </div>
</div>


<style lang="scss">
  #rpm-counter-main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;

    #rpm-display {
      -webkit-appearance: none;
      appearance: none;
      height: 50%;
      width: 100%;
    }

    #rpm-display::-webkit-progress-bar {
      border-radius: 5px;
      background: var(--gradiant-rpm-background);
    }

    #rpm-display::-webkit-progress-value {
      border-radius: 5px;
    }

    #rpm-display-tic {
      color: var(--light-color);
      display: flex;
      width: 101%;
      align-items: center;
      justify-content: space-between;
      position: relative;

      .tic-number {
        font-size: 2rem;
      }
    }
  }
</style>
