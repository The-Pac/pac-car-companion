<script>
    import {invoke} from "@tauri-apps/api/tauri";
    import {onMount} from "svelte";
    import {CarScene} from "$lib/CarScene.js";
    import Categories from "$lib/components/navigation/Category.svelte";


    onMount(async () => {
        let car_scene = new CarScene()
        await car_scene.generate_scene()
    })

</script>

<div id="navigation-main-container">
    <div id="top-side-categories-container">
        <Categories/>
    </div>

    <div>

    </div>

    <div id="canvas-container">
        <canvas id="canvas">
        </canvas>
    </div>
</div>

<style lang="scss">
  #navigation-main-container {
    position: relative;
    height: 100%;
    width: 100%;
    z-index: 0;

    #top-side-categories-container {
      display: flex;
      align-items: center;
      z-index: 2;
      padding: 5px;
      height: 40%;
      width: 100%;
      background: var(--hard-background-color);
      backdrop-filter: blur(2px);
    }

    #canvas-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60%;
      width: 100%;
      z-index: 1;
    }

    #bottom-switch-container {
      position: absolute;
      bottom: 1%;
      right: 20%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 4%;
      width: 20%;
      z-index: 2;

      .switch-mode-block {
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40%;
        height: 100%;
        user-select: none;
        border-radius: 5px;
        padding: 1px;
        background: black;
        box-shadow: inset 0 0 2px 2px #202020;
        color: white;
      }

    }

    #bottom-map-container {
      position: absolute;
      bottom: 10px;
      left: 10px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 30%;
      width: 40%;
      padding: 5px;
      border-radius: 5px;
      z-index: 2;
      background: black;
      box-shadow: inset 0 0 2px 2px #202020;
    }
  }
</style>
