<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useInitials } from '@/composables/useInitials'

type Props = {
	name: string
	image: string | null
}

defineProps<Props>()

const { getInitials } = useInitials()
</script>

<template>
	<Avatar class="h-12 w-12 overflow-hidden rounded-full">
		<AvatarImage :src="image!" :alt="name" />
		<AvatarFallback class="rounded-lg text-black dark:text-white">
			{{ getInitials(name) }}
		</AvatarFallback>
	</Avatar>
</template>
