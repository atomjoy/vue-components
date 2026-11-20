<script setup lang="ts">
import { randomColor } from '@/utils/randomColor'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

let props = defineProps<{
	avatar: string | null
	name: string | null
	date: string | null
	id: string | null
}>()
let avatar = props.avatar?.charAt(0) == '/' ? props.avatar : '/image/' + props.avatar
let color = randomColor()
</script>

<template>
	<div class="notify_owner">
		<div class="notify_owner_avatar" :data-sender="id">
			<Avatar class="bg-muted h-full w-full">
				<AvatarImage :src="avatar" :title="name" class="rounded-full" />
				<AvatarFallback
					:style="'color: #fff; background-color: oklch(from ' + color + ' 90% c h)'"
				>
					{{ name?.charAt(0)?.toUpperCase() }}
				</AvatarFallback>
			</Avatar>
		</div>
		<div class="notify_owner_author">
			<div class="notify_owner_name">
				{{ name ?? $t('Office Bot') }}
			</div>
			<div class="notify_owner_date">
				{{ date ?? '' }}
			</div>
		</div>
	</div>
</template>
