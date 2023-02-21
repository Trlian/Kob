<template>
    <div class="container content-field">
        <div class="card">
            <div class="card-body">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export default {
    serup() {
        const route = useRoute();
        let route_name = computed(() => route.name);

        return {
            route_name
        }
    }
}
</script>

<style scoped>
    div.content-field {
        margin-top: 20px;
    }
</style>
    
