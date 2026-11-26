<?php

namespace App\Http\Controllers\Settings;

use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SettingsController extends Controller
{
	public function store(Request $request)
	{
		$rules = [];

		foreach ($request->except('_token', '_method') as $key => $value) {
			if (str_starts_with($key, 'image_')) {
				$rules[$key] = 'nullable|image|max:2048';
			} elseif (str_starts_with($key, 'textarea_')) {
				$rules[$key] = 'nullable|string|max:5000';
			} elseif (str_starts_with($key, 'bool_')) {
				$rules[$key] = 'nullable|boolean';
			} else {
				$rules[$key] = 'nullable|string|max:255';
			}
		}

		$validated = $request->validate($rules);

		foreach ($validated as $key => $value) {

			// 0. Obsługa usuwania istniejącego obrazka
			if (str_starts_with($key, 'remove_image_') && $request->boolean($key)) {
				$settingKey = str_replace('remove_', '', $key); // np. "image_logo"
				Setting::removeImage($settingKey);
				continue;
			}

			// 1. Obrazki
			if (str_starts_with($key, 'image_')) {
				if ($request->hasFile($key)) {
					$path = $request->file($key)->store('settings', 'public');
					Setting::set($key, Storage::disk('public')->url($path));
				}
				continue;
			}

			// 2. Checkboxy (zapisujemy jako '1' lub '0', żeby łatwo było trzymać w kolumnie tekstowej)
			if (str_starts_with($key, 'bool_')) {
				Setting::set($key, filter_var($value, FILTER_VALIDATE_BOOLEAN) ? '1' : '0');
				continue;
			}

			// 3. Tekst i Textarea
			Setting::set($key, $value);
		}

		return back()->with('success', 'Ustawienia zostały zaktualizowane.');
	}

	public function storeDynamicPairs(Request $request)
	{
		$validated = $request->validate([
			'pairs' => 'required|array|min:1',
			'pairs.*.name' => 'required|string|distinct', // 'distinct' blokuje duplikaty kluczy
			'pairs.*.value' => 'nullable|string',
		]);

		// Zamiana na tablicę asocjacyjną: ['klucz_1' => 'wartosc_1', ...]
		$result = collect($validated['pairs'])->pluck('value', 'name')->toArray();

		// Pobieramy nazwy kluczy przesłanych z formularza
		$submittedKeys = collect($validated['pairs'])->pluck('name');

		// Usuwamy z bazy klucze, które użytkownik usunął z formularza
		Setting::whereNotIn('name', $submittedKeys)->delete();

		// Zapis do bazy...
		foreach ($validated['pairs'] as $pair) {
			Setting::set($pair['name'], $pair['value']);
		}

		return back()->with('success', 'Parametry zapisane!');
	}

	public function edit()
	{
		return Inertia::render('settings/Donation', [
			'settings' => [
				'donation_title' => Setting::get('donation_title', config('app.name')),
				'textarea_donation_about' => Setting::get('textarea_donation_about'),
				'donation_color' => Setting::get('donation_color', '0066ff'),
				'image_donation_logo' => Setting::get('image_donation_logo'),
				'image_donation_bg' => Setting::get('image_donation_bg'),
			],
		]);
	}

	public function update(Request $request)
	{
		$validated = $request->validate([
			'donation_title' => ['nullable', 'string', 'max:255'],
			'textarea_donation_about' => ['nullable', 'string', 'max:5000'],
			'donation_color' => ['nullable', 'string', 'min:6', 'max:6'],
			// Form
			'image_donation_logo' => ['nullable', 'image', 'mimes:png,jpg,webp', 'max:2048'],
			'image_donation_banner' => ['nullable', 'image', 'mimes:png,jpg,webp', 'max:2048'],
			'image_donation_bg' => ['nullable', 'image', 'mimes:png,jpg,webp', 'max:2048'],
			// Widget
			'latest_donations_title' => ['nullable', 'string', 'max:50'],
			'largest_donations_title' => ['nullable', 'string', 'max:50'],
			'latest_donations_ticker_title' => ['nullable', 'string', 'max:50'],
			'largest_donations_ticker_title' => ['nullable', 'string', 'max:50'],
		]);

		foreach ($validated as $key => $val) {
			if (!str_starts_with($key, 'image_')) {
				Setting::set($key, $val);
			} elseif ($request->hasFile($key)) {
				Setting::setImage($key, $request->file($key));
			}
		}

		if ($request->boolean('remove_image_donation_logo')) {
			Setting::removeImage('image_donation_logo');
		}

		Inertia::flash('toast', [
			'type' => 'success',
			'message' => 'Settings updated'
		]);

		return back()->with('success', 'Ustawienia zostały zapisane.');
	}
}
