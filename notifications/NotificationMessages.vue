<script setup lang="ts">
import { computed } from 'vue'
import { useForm } from '@inertiajs/vue3'
import { toggle, remove, unread } from '@/routes/notifications'
import { Trash } from '@lucide/vue'
import NotificationOwner from '@/components/notifications/NotificationOwner.vue'

const emit = defineEmits(['unread', 'toggle', 'delete'])

const props = defineProps<{
	data: any
}>()

const form = useForm()
const list = computed(() => props.data)

async function toggleNotify(id: string) {
	form.get(toggle.url({ id: id }), {
		preserveScroll: true,
		preserveState: true,
		onSuccess: (p: any) => {
			document.querySelector('#item_' + id)?.classList.toggle('notify_item_read')
			countUnread()
			emit('toggle', id)
		},
	})
}

function deleteNotify(id: string) {
	form.get(remove.url({ id: id }), {
		preserveScroll: true,
		preserveState: true,
		onSuccess: (p: any) => {
			// Removes two divs with event filter (hide or remove)!
			// document.querySelector('#item_' + id)?.remove();
			countUnread()
			emit('delete', id)
		},
	})
}

function countUnread() {
	form.get(unread.url(), {
		preserveScroll: true,
		preserveState: true,
		onSuccess: (p: any) => {
			emit('unread', p.flash.data.unread)
		},
	})
}
</script>

<template>
	<div class="notify_empty_list" v-if="list.length == 0">
		{{ $t('List is empty.') }}
	</div>

	<div v-for="item of list">
		<div
			:id="'item_' + item.id"
			:class="{
				notify_item: true,
				notify_item_read: item.read_at != null,
			}"
		>
			<div class="notify_bar">
				<div class="notify_item_dot" @click="toggleNotify(item.id)"></div>
				<Trash class="notify_del_icon" @click="deleteNotify(item.id)" />
			</div>

			<NotificationOwner
				:id="item.data.sender_id"
				:name="item.data.sender_name"
				:avatar="item.data.sender_image"
				:date="item.formatted_created_at"
			/>

			<div class="notify_message">
				<div class="notify_title">{{ $t(item.data.title) }}</div>
				<div class="notify_text">{{ $t(item.data.message) }}</div>
				<div class="notify_links" v-if="item.data.links.length > 0">
					<a
						v-for="link of item.data.links"
						:href="link.url"
						:title="link.text"
						class="notify_link"
						:class="link.class"
						target="_blank"
					>
						{{ $t(link.text) }}
					</a>
				</div>
			</div>
		</div>
	</div>
</template>
