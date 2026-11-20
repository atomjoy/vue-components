<!-- Use it in article:  <Comments :article="article" :comments="comments" /> -->
<script setup lang="ts">
import { Link, useForm } from '@inertiajs/vue3'
import { Reply } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Required from './Required.vue'
import InputError from './InputError.vue'
import ArticleCommentAuthor from './ArticleCommentAuthor.vue'

const props = withDefaults(
	defineProps<{
		article: any | null
		comments: any | null
	}>(),
	{
		article: null,
		comments: null,
	},
)

const mainCommentForm = useForm({
	article_id: props.article?.id,
	content: '',
})

const replyCommentForm = useForm({
	article_id: props.article?.id,
	comment_id: null as number | null,
	content: '',
})

function submitMainComment() {
	mainCommentForm.article_id = props.article?.id
	mainCommentForm.post('/comments/store', {
		preserveScroll: true,
		onSuccess: () => mainCommentForm.reset('content'),
	})
}

function submitReplyComment(commentId: number) {
	replyCommentForm.article_id = props.article?.id
	replyCommentForm.comment_id = commentId
	replyCommentForm.post('/comments/reply', {
		preserveScroll: true,
		onSuccess: () => {
			replyCommentForm.reset('content')
			const el: HTMLElement | null = document.querySelector('#reply' + commentId)
			if (el) {
				el.style.display = 'none'
			}
		},
	})
}

function commentReply(id: number) {
	const el: HTMLElement | null = document.querySelector('#reply' + id)
	if (el) {
		el.style.display = 'inherit'
	}
}
</script>

<template>
	<div class="comments float-left mt-8 w-full">
		<div class="mb-6 flex items-center justify-between">
			<span class="text-2xl font-semibold">{{ $t('Komentarze') }}</span>
			<Link
				v-if="!$page.props.auth.user"
				href="/login"
				class="hover:text-main"
				:title="$t('Komentarz logowanie')"
			>
				{{ $t('Zaloguj') }}
			</Link>
		</div>

		<!-- Formularz Główny -->
		<div v-if="$page.props.auth.user" id="comment-form" class="my-4 border p-4">
			<form @submit.prevent="submitMainComment" class="space-y-6">
				<div v-if="mainCommentForm.wasSuccessful">
					{{ $t('Komentarz został utworzony.') }}
				</div>
				<div class="grid gap-2">
					<Label for="content">{{ $t('Komentarz') }}<Required /> </Label>
					<Textarea
						id="content"
						v-model="mainCommentForm.content"
						class="mt-1 block min-h-30 w-full"
						:placeholder="$t('Treść komentarza')"
					/>
					<InputError class="mt-2" :message="mainCommentForm.errors.content" />
				</div>
				<div class="flex items-center gap-4">
					<Button :disabled="mainCommentForm.processing" type="submit">
						{{ $t('Wyślij') }}
					</Button>
				</div>
			</form>
		</div>

		<div v-if="comments?.data?.length == 0" class="mb-4 border p-4">
			{{ $t('Nie dodano komentarzy.') }}
		</div>

		<!-- Lista Komentarzy i formularze odpowiedzi -->
		<div
			v-if="comments?.data?.length > 0"
			v-for="c in comments.data"
			:key="c.id"
			class="my-4 border-t py-4"
		>
			<div class="flex items-center justify-between">
				<ArticleCommentAuthor :user="c.user" />
				<div
					v-if="$page.props.auth.user"
					@click="commentReply(c.id)"
					class="hover:text-main mb-6 cursor-pointer"
					title="Reply"
				>
					<Reply />
				</div>
			</div>
			<div class="mb-1">{{ c.content }}</div>
			<div class="mb-4 text-sm text-neutral-400">{{ c.created_at }}</div>

			<!-- Formularz Odpowiedzi -->
			<div v-if="$page.props.auth.user" :id="'reply' + c.id" class="my-4 hidden border p-4">
				<form @submit.prevent="submitReplyComment(c.id)" class="space-y-6">
					<div v-if="replyCommentForm.wasSuccessful">
						{{ $t('Komentarz został utworzony.') }}
					</div>
					<div class="grid gap-2">
						<Label for="reply-content">{{ $t('Komentarz') }}<Required /> </Label>
						<Textarea
							id="reply-content"
							v-model="replyCommentForm.content"
							class="mt-1 block min-h-30 w-full"
							:placeholder="$t('Treść')"
						/>
						<InputError class="mt-2" :message="replyCommentForm.errors.content" />
					</div>
					<div class="flex items-center gap-4">
						<Button :disabled="replyCommentForm.processing" type="submit">
							{{ $t('Wyślij') }}
						</Button>
					</div>
				</form>
			</div>

			<div v-if="c?.replies?.length > 0" v-for="r in c.replies" :key="r.id" class="my-2">
				<div class="border-l-2 p-4">
					<ArticleCommentAuthor :user="r.user" />
					<div class="mb-1">{{ r.content }}</div>
					<div class="text-sm text-neutral-400">{{ r.created_at }}</div>
				</div>
			</div>
		</div>

		<Link
			v-if="comments?.next_page_url"
			:href="comments.next_page_url"
			preserve-scroll
			class="float-right p-2"
		>
			{{ $t('Następny') }}
		</Link>
		<Link
			v-if="comments?.prev_page_url"
			:href="comments.prev_page_url"
			preserve-scroll
			class="float-right p-2"
		>
			{{ $t('Poprzedni') }}
		</Link>
	</div>
</template>
