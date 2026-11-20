<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { randomColor } from '@/utils/randomColor'

type Author = {
	avatar: string
	name: string
}

interface Props {
	user: Author
}

let props = defineProps<Props>()

let avatar = props.user.avatar?.charAt(0) == '/' ? props.user.avatar : '/image/' + props.user.avatar
let color = randomColor()
</script>

<template>
	<div class="mb-6 flex items-center gap-4">
		<Avatar class="bg-muted h-11 w-11 border">
			<AvatarImage :src="avatar" :title="user.name" class="rounded-full" />
			<AvatarFallback
				:style="'color: #fff; background-color: oklch(from ' + color + ' 90% c h)'"
			>
				{{ user.name?.charAt(0)?.toUpperCase() }}
			</AvatarFallback>
		</Avatar>
		<div>
			<div class="text-md font-medium">
				{{ user.name ?? 'Nieznajomy' }}
			</div>
		</div>
	</div>
</template>
