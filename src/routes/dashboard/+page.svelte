<script>

    import RpmCounter from "$lib/components/dashboard/RpmCounter.svelte";
    import GearIndicator from "$lib/components/dashboard/GearIndicator.svelte";
    import TurnSignal from "$lib/components/dashboard/TurnSignal.svelte";
    import {onMount} from "svelte";
    import {current_gear, current_turn_signal, current_speed} from "$lib/stores.js";
    import SpeedoMeter from "$lib/components/dashboard/SpeedoMeter.svelte";
    import Indicators from "$lib/components/dashboard/Indicators.svelte";


    /**
     * @type {Boolean}
     */
    let left_turn_signal_is_active = false
    /**
     * @type {Boolean}
     */
    let right_turn_signal_is_active = false

    /**
     * @type {Number}
     */
    let current_gear_display
    /**
     * @type {Number}
     */
    let current_speed_display

    onMount(() => {
        current_turn_signal.subscribe(value => {
            /**
             * 0 : None
             * 1 : Left
             * 2 : Right
             * 3 : Both
             */
            left_turn_signal_is_active = value === 1 || value === 3
            right_turn_signal_is_active = value === 2 || value === 3
        })
        current_gear.subscribe(value => {
            current_gear_display = value
        })
        current_speed.subscribe(value => {
            current_speed_display = value
        })
    })
</script>

<div id="dashboard-main-container">
    <div id="rpm-counter-container">
        <RpmCounter/>
    </div>
    <div id="principal-container">
        <TurnSignal orientation_deg={-90} is_active={left_turn_signal_is_active}/>
        <div id="left-indicators-container">
            <SpeedoMeter current_speed_display={current_speed_display}/>
        </div>
        <div id="gear-indicators-container">
            <GearIndicator current_gear_display={current_gear_display}/>
        </div>
        <div id="right-indicators-container">
            <Indicators/>
        </div>
        <TurnSignal orientation_deg={90} is_active={right_turn_signal_is_active}/>
    </div>

</div>


<style lang="scss">
  #dashboard-main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;


    #rpm-counter-container {
      height: 20%;
      width: 90%;
    }

    #principal-container {
      height: 70%;
      width: 90%;
      display: flex;
      justify-content: space-around;
      align-items: center;


      #left-indicators-container {
        height: 100%;
        width: 25%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      #gear-indicators-container {
        height: 100%;
        width: 30%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      #right-indicators-container {
        height: 100%;
        width: 25%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

  }
</style>
