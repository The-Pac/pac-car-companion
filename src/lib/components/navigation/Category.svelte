<script>
    import {invoke} from "@tauri-apps/api/tauri";
    import {onMount} from "svelte";
    import MdiYoutube from 'virtual:icons/mdi/youtube'
    import MdiGoogle from 'virtual:icons/mdi/google'
    import MdiSpotify from 'virtual:icons/mdi/spotify'
    import MdiWeb from 'virtual:icons/mdi/web'
    import MdiLightbulb from 'virtual:icons/mdi/lightbulb'
    import MdiErrorOutline from 'virtual:icons/mdi/error-outline'
    import MdiSettings from 'virtual:icons/mdi/settings'
    import MdiCarSports from 'virtual:icons/mdi/car-sports'
    import MdiWrench from 'virtual:icons/mdi/wrench'
    import MdiInformationOutline from 'virtual:icons/mdi/information-outline'
    import {SubCategory, Category} from "$lib/DropDownItem.js"
    import {event_to_three} from "$lib/stores.js";
    import {
        SETTING_COLOR,
        CAR_COLOR,
        SEMANTICS_RED_COLOR,
        SPOTIFY_COLOR,
        GOOGLE_COLOR,
        YOUTUBE_COLOR,
        LIGHT_COLOR,
    } from "$lib/Colors.js";
    import ServicePage from "$lib/components/sub_category_page/ServicePage.svelte";

    /**
     * @type {Array<Category>}
     */
    let categories = [];
    /**
     * @type {Array<SubCategory>}
     */
    let sub_categories_selected = [];
    /**
     * @type {any}
     */
    let page_selected = null;
    let is_sub_category_selected = false
    let is_category_selected = false
    /**
     * @type {String} category_status
     */
    let category_status


    onMount(async () => {
        categories = [
            new Category(LIGHT_COLOR, "Website", MdiWeb,
                [
                    new SubCategory(YOUTUBE_COLOR, "Youtube", MdiYoutube, true, () => invoke("create_external_page", {
                        url: "https://www.youtube.com/",
                        label: "youtube"
                    }), false, null),
                    new SubCategory(GOOGLE_COLOR, "Google", MdiGoogle, true, () => invoke("create_external_page", {
                        url: "https://www.google.fr/",
                        label: "google"
                    }), false, null),
                    new SubCategory(SPOTIFY_COLOR, "Spotify", MdiSpotify, true, () => invoke("create_external_page", {
                        url: "https://open.spotify.com/",
                        label: "spotify"
                    }), false, null)
                ]
            ),
            new Category(CAR_COLOR, "Car", MdiCarSports,
                [
                    new SubCategory(LIGHT_COLOR, "Information", MdiInformationOutline, true, () => {
                    }, true, null),
                    new SubCategory(LIGHT_COLOR, "Car Parts", MdiInformationOutline, true, () => {
                        invoke("create_external_page", {
                            url: "https://toyota.epc-data.com/celica/st202/149793/",
                            label: "car_parts"
                        })
                    }, true, null),
                    new SubCategory(LIGHT_COLOR, "Service", MdiWrench, true, async () => {
                        event_to_three.set('on_car_service')
                        category_status = 'on_car_service'
                    }, true, ServicePage),
                    new SubCategory(SEMANTICS_RED_COLOR, "Error", MdiErrorOutline, true, () => {
                    }, true, null),
                ]
            ),
            new Category(SETTING_COLOR, "Setting", MdiSettings,
                [
                    new SubCategory(LIGHT_COLOR, "Status", MdiLightbulb, true, () => {
                    }, false, null),
                    new SubCategory(SEMANTICS_RED_COLOR, "Errors", MdiErrorOutline, true, () => {
                    }, false, null),
                ]
            )
        ]
    })

    async function reset_event() {
        switch (category_status) {
            case 'on_car_service':
                event_to_three.set('off_car_service')
                break
        }
    }

    /**
     *
     * @param {Category} category
     */
    function on_category_click(category) {
        if (!is_category_selected || is_category_selected && sub_categories_selected !== category.sub_categories) {
            sub_categories_selected = category.sub_categories
            is_category_selected = true
        } else {
            sub_categories_selected = []
            is_category_selected = false
        }
        page_selected = null

        reset_event()
    }

    /**
     *
     * @param {SubCategory} sub_category
     */
    function on_sub_category_click(sub_category) {
        if (sub_category.has_page) {
            if (!is_sub_category_selected || is_sub_category_selected && page_selected !== sub_category.page) {
                page_selected = sub_category.page
                is_sub_category_selected = true
            } else {
                page_selected = null
                is_sub_category_selected = false
            }
        }
        reset_event()

        if (sub_category.is_clickable) {
            sub_category.on_click()
        }
    }

</script>

<div id="categories-container">
    {#each categories as category}
        <button class="title-container"
                on:click={() => on_category_click(category)}
                style="color: {category.color};filter: drop-shadow(0px 0px 1px {category.color});font-size: 25px">
            <svelte:component this={category.icon}/>
            {category.title}
        </button>
        {#if is_category_selected && category.sub_categories === sub_categories_selected}
            <div style="display: flex;">
                <div class="v-bar" style="margin-left: 12px;"></div>
                <div id="sub-categories-container">
                    {#each sub_categories_selected as sub_category}
                        <button class="item"
                                on:click={() => on_sub_category_click(sub_category)}
                                style="color: {sub_category.color};filter: drop-shadow(0px 0px 1px {sub_category.color});font-size: 20px">
                            <svelte:component this={sub_category.icon}/>
                            {sub_category.title}
                        </button>
                    {/each}
                </div>
            </div>
        {/if}
    {/each}
</div>
{#if is_sub_category_selected}
    <div id="page-container">
        <svelte:component this={page_selected}/>
    </div>
{/if}


<style lang="scss">
  #categories-container {
    height: 90%;
    padding-right: 10px;
    margin: 0;
    display: flex;
    flex-direction: column;
    list-style: none;

    .title-container {
      display: flex;
      align-items: center;
      background: none;
      width: 100%;
      padding: 0;
      margin: 5px 0;
    }
  }

  #sub-categories-container {
    padding-left: 10px;
    margin: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    list-style: none;

    .item {
      width: 100%;
      margin: 5px 0 20px;
      display: flex;
      align-items: center;
      background: none;
      padding: 0;
    }
  }

  #page-container {
    height: 90%;
    width: 100%;
    margin: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
</style>
