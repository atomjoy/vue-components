<script setup>
import { useForm } from "@inertiajs/vue3";

const form = useForm({
    pairs: [{ name: "", value: "" }],
});

const addPair = () => {
    form.pairs.push({ name: "", value: "" });
};

const removePair = (index) => {
    form.pairs.splice(index, 1);
    form.clearErrors();
};

const submit = () => {
    form.post(route("settings.store"), {
        preserveScroll: true,
        onSuccess: () => {
            // opcjonalnie: form.reset()
        },
    });
};

/*
const props = defineProps({
    existingSettings: Object, // np. { site_name: 'Moja Strona', theme: 'dark' }
});

const form = useForm({
    pairs: Object.entries(props.existingSettings || {}).map(
        ([name, value]) => ({
            name,
            value,
        }),
    ),
});
*/
</script>

<template>
    <form @submit.prevent="submit">
        <div v-for="(pair, index) in form.pairs" :key="index" style="margin-bottom: 12px">
            <div>
                <input v-model="pair.name" type="text" placeholder="Klucz (name)" />
                <input v-model="pair.value" type="text" placeholder="Wartość (value)" />

                <button type="button" @click="removePair(index)" v-if="form.pairs.length > 1">Usuń</button>
            </div>

            <div v-if="form.errors[`pairs.${index}.name`]" style="color: red; font-size: 12px">
                {{ form.errors[`pairs.${index}.name`] }}
            </div>
            <div v-if="form.errors[`pairs.${index}.value`]" style="color: red; font-size: 12px">
                {{ form.errors[`pairs.${index}.value`] }}
            </div>
        </div>

        <button type="button" @click="addPair">+ Dodaj parametr</button>

        <button type="submit" :disabled="form.processing">
            {{ form.processing ? "Zapisywanie..." : "Zapisz" }}
        </button>
    </form>
</template>
