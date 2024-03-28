<script>
    import MdiPlus from "virtual:icons/mdi/plus"
    import {onMount} from "svelte";
    import {invoke} from "@tauri-apps/api/tauri";
    import {MaintenancePart} from "$lib/components/model/MaintenancePart.js";

    /** @type {Array<MaintenancePart>} maintenance_parts*/
    let maintenance_parts = []
    /** @type {MaintenancePart} new_maintenance_part*/
    let new_maintenance_part = new MaintenancePart()

    onMount(async () => {
        await invoke("get_maintenance_parts")
            .then((response) => {
                maintenance_parts = response
            })
    })

    async function create_new_maintenance_part() {
        if (new_maintenance_part.is_valid()) {
            await invoke("add_maintenance_part", {newMaintenancePart: new_maintenance_part})
                .then(value => {
                    maintenance_parts.push(new_maintenance_part)
                    new_maintenance_part = new MaintenancePart()
                })
                .catch(reason => {

                })
        }


    }
</script>


<div id="service-container" class="scrollbar-vertical">
    <div class="new-maintenance-part-container">
        <input style="grid-area:name;" type="text" placeholder="Part name"
               bind:value={new_maintenance_part.name}/>
        <input style="grid-area: km;" type="number" inputmode="numeric" placeholder="Kilometer"
               bind:value={new_maintenance_part.kilometer}/>
        <input style="grid-area: ref;" type="text" placeholder="Reference"
               bind:value={new_maintenance_part.reference}/>
        <input style="grid-area: oref;" type="text" placeholder="OEM Reference"
               bind:value={new_maintenance_part.oem_reference}/>
        <div style="grid-area: diy;">
            <input id="is-diy" type="checkbox" bind:checked={new_maintenance_part.diy}>
            <label for="is-diy">DIY</label>
        </div>
        {#if !new_maintenance_part.diy}
            <input style="grid-area: gname;" type="text" placeholder="Garage Name"
                   bind:value={new_maintenance_part.made_by}/>
        {/if}
        <div style="grid-area: maint;">
            <input id="is-part-of-the-maintenance" type="checkbox"
                   bind:checked={new_maintenance_part.is_part_of_the_maintenance}/>
            <label for="is-part-of-the-maintenance">Part of the maintenance</label>
        </div>
        {#if new_maintenance_part.is_part_of_the_maintenance}
            <input style="grid-area: nmaint;" type="number" inputmode="numeric" placeholder="Next maintenance"
                   bind:value={new_maintenance_part.next_maintenance}/>
        {/if}

        <button style="grid-area: button;height: 100%;width: 100%;" on:click={() => create_new_maintenance_part()}>
            <MdiPlus style="color: var(--light-color);font-size: 20px"/>
        </button>
    </div>
    <div class="h-bar" style="margin: 12px 0"></div>
    {#each maintenance_parts as maintenance_part}
        <div class="maintenance-part-container">
            <h4 style="grid-area: name;">{maintenance_part.name} ({maintenance_part.kilometer}Km)</h4>
            <p style="grid-area: ref;">Ref: {maintenance_part.reference}</p>
            <p style="grid-area: oref;">OEM ref: {maintenance_part.oem_reference}</p>
            {#if !maintenance_part.diy}
                <p style="grid-area: gname;">Made by: {maintenance_part.made_by}</p>
            {:else}
                <p style="grid-area: gname;">Made by: Me</p>
            {/if}
            {#if maintenance_part.is_part_of_the_maintenance}
                <p style="grid-area: nmaint;">Next maintenance: {maintenance_part.next_maintenance}Km</p>
            {/if}

        </div>
        <div class="h-bar" style="margin: 12px 0;"></div>
    {/each}
</div>

<style lang="scss">
  #service-container {
    padding-right: 10px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .new-maintenance-part-container {
      display: grid;
      align-items: center;
      grid-column-gap: 5px;
      grid-row-gap: 5px;
      width: 100%;
      height: 100%;
      grid-template-areas:
      "name name km km"
      "ref ref oref oref"
      "diy gname gname gname"
      "maint  maint maint maint"
      "nmaint nmaint nmaint nmaint"
      "button button button button";

      button, input {
        border-radius: 50px;
        background: rgba(38, 81, 73, 0.3);
        border: 2px solid var(--deep-jewel-green-primary-color);
      }

      input[type="text"], input[type="number"] {
        padding-left: 5px;
        padding-right: 5px;
        color: var(--light-color);
      }

      label {
        color: var(--light-color);
        font-size: small;
      }

      input::placeholder {
        color: var(--light-color);
        opacity: .7;
      }

    }

    .maintenance-part-container {
      padding: 10px;
      display: grid;
      height: 100%;
      align-items: center;
      grid-column-gap: 5px;
      border-radius: 10px;
      grid-row-gap: 5px;
      background: rgba(38, 81, 73, 0.3);
      border: 2px solid var(--deep-jewel-green-primary-color);

      grid-template-areas:
      "name name name name"
      "ref ref oref oref"
      "nmaint nmaint gname gname";
    }
  }
</style>
