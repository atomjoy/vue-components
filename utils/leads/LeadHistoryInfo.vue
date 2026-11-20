<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { formatDateTime } from '@/utils/userHelpers'
import { History, ArrowRight } from '@lucide/vue'
import { Link } from '@inertiajs/vue3'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps<{
	histories: any
}>()
</script>

<template>
	<!-- Dopasowana do tabeli lead_histories -->
	<Card class="shadow-none">
		<CardHeader>
			<CardTitle class="flex items-center gap-2 text-base font-semibold">
				<History class="text-muted-foreground h-5 w-5" />
				{{ t('Lead History') }}
			</CardTitle>
		</CardHeader>
		<CardContent>
			<!-- Sprawdzamy czy są wpisy historyczne w relacji -->
			<div
				v-if="histories && histories.length > 0"
				class="border-muted relative ml-2 space-y-6 border-l pl-6"
			>
				<div v-for="history in histories" :key="history.id" class="relative">
					<!-- Kropka na osi czasu -->
					<div
						class="bg-background border-primary absolute top-1 -left-8 flex h-4 w-4 items-center justify-center rounded border-2"
					>
						<div class="bg-primary h-1.5 w-1.5 rounded"></div>
					</div>

					<div class="flex flex-col space-y-1.5">
						<!-- Nagłówek wpisu (Kto, Kiedy, Typ akcji) -->
						<div
							class="text-muted-foreground flex flex-wrap items-center gap-2 text-xs"
						>
							<span class="text-foreground font-semibold">
								{{ history.user?.name ?? t('System') }}
							</span>
							<span>•</span>
							<Badge
								variant="outline"
								class="px-1.5 py-0 font-mono text-[11px] tracking-wider uppercase"
							>
								{{ history.type }}
							</Badge>
							<span>•</span>
							<span>{{ formatDateTime(history.created_at) }}</span>

							<!-- Poziom kwalifikacji jeśli został zapisany -->
							<Badge
								v-if="history.qualification_level"
								variant="secondary"
								class="ml-auto text-[10px]"
							>
								{{ t('Score') }}: {{ history.qualification_level }}/4
							</Badge>
						</div>

						<!-- Zmiana statusu (old_status -> new_status) -->
						<div class="flex items-center gap-2 pt-0.5 text-sm">
							<Badge
								v-if="history.old_status"
								variant="outline"
								class="line-through opacity-60"
							>
								{{ history.old_status }}
							</Badge>
							<ArrowRight
								v-if="history.old_status"
								class="text-muted-foreground h-3 w-3"
							/>
							<Badge variant="default" class="bg-primary/90">
								{{ history.new_status }}
							</Badge>
						</div>

						<!-- Treść notatki dołączonej do historii -->
						<div
							v-if="history.note"
							class="text-muted-foreground bg-muted/30 mt-1 rounded border border-dotted p-2 text-sm whitespace-pre-line"
						>
							{{ history.note }}
						</div>
					</div>
				</div>
			</div>

			<!-- Stan pusty historii -->
			<div
				v-else
				class="text-muted-foreground rounded-lg border border-dashed py-6 text-center text-sm"
			>
				{{ t('No history records found for this lead.') }}
			</div>
		</CardContent>
	</Card>
</template>
