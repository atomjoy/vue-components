<script setup lang="ts">
import { ref } from 'vue';

const avatar_path: any = ref(null);

const props = defineProps<{
    image: string | null;
}>();

if (props.image) {
    avatar_path.value = '/image/' + props.image;
} else {
    avatar_path.value = '/default/user.webp';
}
</script>

<template>
    <img
        class="notify_owner_avatar_image"
        :src="avatar_path"
        onerror="
            this.onerror = false;
            this.src = '/default/user.webp';
        "
    />
</template>
