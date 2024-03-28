<script>

    import {onMount} from "svelte";
    import {
        current_coolant_temp,
        coolant_temp_max,
        current_fuel_level,
        fuel_level_max,
        current_oil_pressure,
        oil_pressure_max,
        current_oil_temp,
        oil_temp_max
    } from '$lib/stores.js'
    import MdiCoolantTemperature from "virtual:icons/mdi/coolant-temperature"
    import MdiOilTemperature from "virtual:icons/mdi/oil-temperature"
    import MdiOil from "virtual:icons/mdi/oil"
    import MdiFuelPump from "virtual:icons/mdi/fuel-pump"

    /**
     * @type {Number}
     */
    let current_oil_temp_display = 0
    /**
     * @type {Number}
     */
    let current_oil_temp_max_display

    /**
     * @type {Number}
     */
    let current_oil_pressure_display = 0
    /**
     * @type {Number}
     */
    let current_oil_pressure_max_display


    /**
     * @type {Number}
     */
    let current_coolant_temp_display = 0
    /**
     * @type {Number}
     */
    let current_coolant_temp_max_display

    /**
     * @type {Number}
     */
    let current_fuel_level_display = 0
    /**
     * @type {Number}
     */
    let current_fuel_level_max_display

    onMount(() => {
        current_oil_temp.subscribe(value => {
            current_oil_temp_display = value
        })
        oil_temp_max.subscribe(value => {
            current_oil_temp_max_display = value
        })

        current_fuel_level.subscribe(value => {
            current_fuel_level_display = value
        })
        fuel_level_max.subscribe(value => {
            current_fuel_level_max_display = value
        })

        current_oil_pressure.subscribe(value => {
            current_oil_pressure_display = value
        })
        oil_pressure_max.subscribe(value => {
            current_oil_pressure_max_display = value
        })


        current_coolant_temp.subscribe(value => {
            current_coolant_temp_display = value
        })
        coolant_temp_max.subscribe(value => {
            current_coolant_temp_max_display = value
        })
    })
</script>
<div id="indicators-container">
    <div class="gage-display-container">
        <label for="current-fuel-level-display">{current_fuel_level_display}</label>
        <progress id="current-fuel-level-display" value={current_fuel_level_display}
                  max="{current_fuel_level_max_display}"></progress>
        <div class="label-container">
            <label for="current-fuel-level-display">LO</label>
            <MdiFuelPump/>
            <label for="current-fuel-level-display">HI</label>
        </div>
    </div>

    <div class="gage-display-container">
        <label for="current-oil-temp-display">{current_oil_temp_display}</label>
        <progress id="current-oil-temp-display" value={current_oil_temp_display}
                  max="{current_oil_temp_max_display}"></progress>
        <div class="label-container">
            <label for="current-oil-temp-display">LO</label>
            <MdiOilTemperature/>
            <label for="current-oil-temp-display">HI</label>
        </div>
    </div>

    <div class="gage-display-container">
        <label for="current-oil-pressure-display">{current_oil_pressure_display}</label>
        <progress id="current-oil-pressure-display" value={current_oil_pressure_display}
                  max="{current_oil_pressure_max_display}"></progress>
        <div class="label-container">
            <label for="current-oil-pressure-display">LO</label>
            <MdiOil/>
            <label for="current-oil-pressure-display">HI</label>
        </div>
    </div>

    <div class="gage-display-container">
        <label for="current-coolant-temp-display">{current_coolant_temp_display}</label>
        <progress id="current-coolant-temp-display" value={current_coolant_temp_display}
                  max="{current_coolant_temp_max_display}"></progress>
        <div class="label-container">
            <label for="current-coolant-temp-display">LO</label>
            <MdiCoolantTemperature/>
            <label for="current-coolant-temp-display">HI</label>
        </div>
    </div>
</div>
<style lang="scss">
  #indicators-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;

    .gage-display-container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      label {
        font-size: 2rem;
        color: var(--light-color);
      }

      progress {
        -webkit-appearance: none;
        appearance: none;
        width: 100%;
        margin: 10px 0;
        position: relative;
      }

      progress::-webkit-progress-bar {
        border-radius: 5px;
        background: var(--soft-background-color);
      }

      progress::-webkit-progress-value {
        border-radius: 5px;
        background: var(--semantics-color-green);
        position: relative;
      }


      .label-container {
        display: flex;
        justify-content: space-between;
        width: 100%;
        font-size: 1.5rem;
        color: var(--light-color);

        label {
          font-size: 1.5rem;
        }
      }
    }
  }
</style>