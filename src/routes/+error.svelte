<div class="error-container">
    <h1 style="color: var(--semantics-color-red)">{$page.status} {$page.error ? $page.error.message : "Erreur" }</h1>
    <a class="link-redirect box-with-shadow" href="/">
        <MdiHomeCircleOutline style="font-size: 5rem;color: var(--primary-color)"/>
    </a>
</div>

<script>
    import {page} from '$app/stores';
    import MdiHomeCircleOutline from 'virtual:icons/mdi/home-circle-outline'
</script>
<style>
    .error-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        align-items: center;

    }
</style>
