<script setup lang="ts">
import { computed } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useInitials } from '@/composables/useInitials'
import InputError from '@/components/InputError.vue'

type Props = {
	errors?: any
}

defineProps<Props>()

const { getInitials } = useInitials()

const page = usePage()

const user = computed(() => page.props.auth.user)
</script>

<template>
	<Label for="avatar">Avatar</Label>
	<Avatar class="h-16 w-16 overflow-hidden rounded-lg">
		<AvatarImage :src="user.avatar!" :alt="user.name" />
		<AvatarFallback class="rounded-lg text-black dark:text-white">
			{{ getInitials(user.name) }}
		</AvatarFallback>
	</Avatar>
	<p v-if="user.avatar">{{ user.avatar }}</p>
	<Input
		id="avatar"
		type="file"
		class="mt-1 block w-full"
		name="avatar"
		placeholder="Image file"
	/>
	<InputError class="mt-2" :message="errors.image" />
</template>
