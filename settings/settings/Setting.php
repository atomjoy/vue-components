<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class Setting extends Model
{
	protected $fillable = ['key', 'value'];

	private const CACHE_KEY = 'global_settings';

	protected static function booted(): void
	{
		static::saved(fn() => static::clearCache());
		static::deleted(fn() => static::clearCache());
	}

	public static function allCached(): array
	{
		return Cache::rememberForever(self::CACHE_KEY, function () {
			return static::pluck('value', 'key')->toArray();
		});
	}

	public static function get(string $key, mixed $default = null): mixed
	{
		return static::where('key', $key)->value('value') ?? $default;
	}

	public static function set(string $key, mixed $value): self
	{
		return static::updateOrCreate(
			['key' => $key],
			['value' => $value]
		);
	}

	public static function setImage(string $key, UploadedFile $file, string $directory = 'settings'): string
	{
		$oldPath = static::get($key);
		if ($oldPath && Storage::disk('public')->exists($oldPath)) {
			Storage::disk('public')->delete($oldPath);
		}

		$newPath = $file->store($directory, 'public');
		static::set($key, $newPath);

		return $newPath;
	}

	public static function removeImage(string $key): void
	{
		$oldPath = static::get($key);
		if ($oldPath && Storage::disk('public')->exists($oldPath)) {
			Storage::disk('public')->delete($oldPath);
		}

		static::set($key, null);
	}

	public static function clearCache(): void
	{
		Cache::forget(self::CACHE_KEY);
	}
}
