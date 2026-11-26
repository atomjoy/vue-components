<!--
 <SettingsForm
  :settings="settings"
  :fields="{ Ogólne: [
    { key: 'company_name', label: 'Nazwa firmy' },
    { key: 'image_invoice_logo', label: 'Logo na fakturze' },
    { key: 'textarea_footer_info', label: 'Stopka na fakturze' },
    { key: 'bool_vat_payer', label: 'Płatnik VAT' }
  ]}"
/>

return Inertia::render('settings/Edit', [
    'settings' => Setting::pluck('value', 'name'),
    'translations' => __('settings'), // Zwraca całą tablicę z lang/pl/settings.php
]);

<label :for="field.key">
  {{ translations[field.key] ?? field.key }}
</label>
-->
<script setup>
import { computed, reactive, onUnmounted } from "vue";
import { useForm } from "@inertiajs/vue3";

const props = defineProps({
    fields: {
        type: [Object, Array],
        default: () => ({
            Ogólne: [
                { key: "site_name", label: "Nazwa strony" },
                { key: "image_logo", label: "Logo (PNG/SVG)" },
                { key: "textarea_description", label: "Opis SEO" },
                { key: "bool_maintenance_mode", label: "Tryb konserwacji" },
            ],
            Newsletter: [
                { key: "newsletter_title", label: "Nagłówek newslettera" },
                { key: "textarea_newsletter_desc", label: "Opis zapisu" },
                { key: "bool_newsletter_active", label: "Włączony" },
            ],
        }),
    },
    settings: {
        type: Object,
        default: () => ({}),
    },
});

const parseField = (item) => {
    const key = typeof item === "string" ? item : item.key;
    const label = typeof item === "string" ? item : (item.label ?? key);

    let type = "text";
    if (key.startsWith("image_")) type = "image";
    else if (key.startsWith("textarea_")) type = "textarea";
    else if (key.startsWith("bool_")) type = "boolean";

    return { key, label, type };
};

const normalizedSections = computed(() => {
    if (Array.isArray(props.fields)) {
        return [{ title: null, fields: props.fields.map(parseField) }];
    }

    return Object.entries(props.fields).map(([sectionTitle, sectionFields]) => ({
        title: sectionTitle,
        fields: sectionFields.map(parseField),
    }));
});

const initialValues = {};
normalizedSections.value.forEach((section) => {
    section.fields.forEach(({ key, type }) => {
        if (type === "image") {
            initialValues[key] = null;
            initialValues[`remove_${key}`] = false;
        } else if (type === "boolean") {
            initialValues[key] = Boolean(Number(props.settings[key]) || props.settings[key] === true);
        } else {
            initialValues[key] = props.settings[key] ?? "";
        }
    });
});

const form = useForm(initialValues);
const previews = reactive({});

const clearPreview = (key) => {
    if (previews[key]) {
        URL.revokeObjectURL(previews[key]);
        delete previews[key];
    }
};

const handleFileChange = (key, event) => {
    const file = event.target.files?.[0] ?? null;
    form[key] = file;
    clearPreview(key);

    if (file) {
        form[`remove_${key}`] = false;
        previews[key] = URL.createObjectURL(file);
    }
};

const toggleRemoveImage = (key) => {
    form[`remove_${key}`] = !form[`remove_${key}`];
    if (form[`remove_${key}`]) {
        form[key] = null;
        clearPreview(key);
    }
};

const getImageUrl = (key) => {
    if (previews[key]) {
        return previews[key];
    }

    const path = props.settings[key];
    if (!path) return "";

    if (path.startsWith("http") || path.startsWith("/")) {
        return path;
    }

    return `/storage/${path}`;
};

onUnmounted(() => {
    Object.keys(previews).forEach(clearPreview);
});

const submit = () => {
    form.post("/settings/update", {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
            Object.keys(previews).forEach(clearPreview);
            Object.keys(form.data()).forEach((k) => {
                if (k.startsWith("remove_")) form[k] = false;
            });
        },
    });
};
</script>

<template>
    <form @submit.prevent="submit">
        <fieldset
            v-for="(section, index) in normalizedSections"
            :key="section.title ?? index"
            style="border: 1px solid #e5e7eb; padding: 16px; margin-bottom: 24px; border-radius: 6px"
        >
            <legend v-if="section.title" style="font-size: 1rem; font-weight: 500; padding: 0 8px">
                {{ section.title }}
            </legend>

            <div v-for="field in section.fields" :key="field.key" style="margin-bottom: 16px text-sm">
                <template v-if="field.type === 'boolean'">
                    <label :for="field.key" style="display: flex; align-items: center; gap: 8px; cursor: pointer">
                        <input :id="field.key" v-model="form[field.key]" type="checkbox" />
                        <span>{{ field.label }}</span>
                    </label>
                </template>

                <template v-else>
                    <label :for="field.key" class="block text-sm leading-none font-medium select-none my-3">
                        {{ field.label }}
                    </label>

                    <template v-if="field.type === 'image'">
                        <div
                            v-if="previews[field.key] || settings[field.key]"
                            style="margin: 8px 0; display: flex; align-items: center; gap: 12px"
                        >
                            <img
                                :src="getImageUrl(field.key)"
                                :alt="field.label"
                                :style="{
                                    maxHeight: '60px',
                                    border: previews[field.key] ? '2px solid #2563eb' : '1px solid #ddd',
                                    opacity: form[`remove_${field.key}`] ? 0.3 : 1,
                                    transition: 'opacity 0.2s',
                                }"
                            />

                            <button
                                v-if="settings[field.key] && !previews[field.key]"
                                type="button"
                                @click="toggleRemoveImage(field.key)"
                                :style="{
                                    padding: '4px 10px',
                                    fontSize: '12px',
                                    cursor: 'pointer',
                                    borderRadius: '4px',
                                    border: '1px solid',
                                    borderColor: form[`remove_${field.key}`] ? '#6b7280' : '#dc2626',
                                    color: form[`remove_${field.key}`] ? '#374151' : '#dc2626',
                                    backgroundColor: 'transparent',
                                }"
                            >
                                {{ form[`remove_${field.key}`] ? "Cofnij usunięcie" : "Usuń obrazek" }}
                            </button>

                            <button
                                v-if="previews[field.key]"
                                type="button"
                                @click="
                                    clearPreview(field.key);
                                    form[field.key] = null;
                                "
                                style="
                                    padding: 4px 10px;
                                    font-size: 12px;
                                    cursor: pointer;
                                    border-radius: 4px;
                                    border: 1px solid #6b7280;
                                    color: #374151;
                                    background: transparent;
                                "
                            >
                                Anuluj nowy
                            </button>
                        </div>

                        <div v-if="form[`remove_${field.key}`]" style="color: #dc2626; font-size: 12px; margin-bottom: 6px">
                            Obrazek zostanie usunięty po zapisaniu formularza.
                        </div>

                        <input :id="field.key" type="file" accept="image/*" @input="handleFileChange(field.key, $event)" />
                    </template>

                    <template v-else-if="field.type === 'textarea'">
                        <textarea :id="field.key" v-model="form[field.key]" rows="4" style="width: 100%"></textarea>
                    </template>

                    <template v-else>
                        <input :id="field.key" v-model="form[field.key]" type="text" style="width: 100%" />
                    </template>
                </template>

                <div v-if="form.errors[field.key]" style="color: red; font-size: 12px; margin-top: 4px">
                    {{ form.errors[field.key] }}
                </div>
            </div>
        </fieldset>

        <button
            type="submit"
            :disabled="form.processing"
            class="bg-black text-white whitespace-nowrap rounded-md text-sm font-medium mb-2 px-4 py-2"
        >
            {{ form.processing ? "Zapisywanie..." : "Zapisz ustawienia" }}
        </button>
    </form>
</template>
