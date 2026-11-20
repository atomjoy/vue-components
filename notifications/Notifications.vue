<script setup lang="ts">
import { router } from '@inertiajs/vue3'
import { ref, onMounted } from 'vue'
import { page, readall } from '@/routes/notifications'
import { Bell, CircleX, RotateCw, SquareCheckBig } from '@lucide/vue'
import NotificationMessages from '@/components/notifications/NotificationMessages.vue'

const notifications: any = ref([])
const unread: any = ref(0)
const all: any = ref(0)
const curr_page = ref(1)
const open = ref(false)

function toggle() {
	open.value = !open.value
}

function checkUnread() {
	if (unread.value) {
		return unread.value > 0
	}
	return false
}

function readAll() {
	router.get(
		readall.url(),
		{},
		{
			preserveScroll: true,
			onSuccess: (p) => {
				document.querySelectorAll('.notify_item').forEach((e) => {
					e.classList.add('notify_item_read')
				})
				notifications.value = []
				curr_page.value = 1
				loadPage(1)
			},
		},
	)
}

function nextPage() {
	curr_page.value++
	loadPage(curr_page.value)
}

function loadPage(nr: number) {
	router.get(
		page.url({ page: nr }),
		{},
		{
			preserveState: true,
			preserveScroll: true,
			onSuccess: (p: any) => {
				p.flash?.data?.notifications.forEach((i: any) => {
					notifications.value.push(i)
				})
				unread.value = p.flash.data.unread
				all.value = p.flash.data.all
			},
		},
	)
}

function updateUnread(count: number) {
	unread.value = count
}

function updateToggle(id: string) {
	notifications.value = notifications.value.map((n: any) => {
		if (n.id == id) {
			n.read_at == null ? (n.read_at = new Date()) : (n.read_at = null)
		}
		return n
	})
}

function updateDelete(id: string) {
	notifications.value = notifications.value.filter((n: any) => n.id != id)
	if (all.value > 0) all.value--
}

onMounted(() => {
	curr_page.value = 1
	loadPage(1)
})
</script>

<template>
	<div class="user_notification_layout">
		<div class="user_notification_layout_icon" @click="toggle">
			<span class="dot" v-if="checkUnread()"></span>
			<Bell />
		</div>

		<div class="user_notification_layout_popup" v-if="open">
			<div class="user_notification_layout_top">
				<div class="user_notification_layout_top_title">
					{{ $t('Notifications') }} ({{ unread }}/{{ all }})
				</div>

				<CircleX @click="toggle" class="user_notification_layout_close" />
			</div>

			<div class="user_notification_layout_content">
				<slot>
					<NotificationMessages
						:data="notifications"
						@unread="updateUnread"
						@toggle="updateToggle"
						@delete="updateDelete"
					/>
				</slot>
			</div>

			<div class="user_notification_layout_bot">
				<div class="user_notification_layout_load" @click="nextPage">
					<RotateCw class="user_notification_layout_load_icon" />
					<span>{{ $t('Load more') }}</span>
				</div>

				<div class="user_notification_layout_load" @click="readAll">
					<SquareCheckBig class="user_notification_layout_load_icon" />
					<span>{{ $t('Mark all as read') }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
@import url('@/css/notifications.css');
</style>
