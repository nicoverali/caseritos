<?php

namespace App\Models;

use App\Models\Profiles\HasBinaryImageAttributes;
use App\Models\Profiles\SellerProfile;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Collection;

class Product extends Model
{
    use HasFactory, SoftDeletes, HasBinaryImageAttributes;

    protected $guarded = ['id', 'owner_id'];

    protected $binaryImageAttributes = ['picture', 'thumbnail'];

    public function scopeWithStock(Builder $query){
        $query
            ->where('stock', '>', '0');
    }

    public function scopeExceptOwnedBy(Builder $query, User...$users){
        $sellers = (new Collection($users))
            ->map(function($user){return $user->sellerProfile;})
            ->whereNotNull()
            ->map(function ($seller){return $seller->id;})
            ->toArray();

        $query->when($sellers??false, function (Builder $query, $sellers){
            $query
                ->whereNotIn('owner_id', $sellers);
        });
    }

    public function scopeSearch(Builder $query, $search){
        $query->when($search, function ($query, $search) {
            $search = strtolower($search);
            $query
                ->whereRaw('LOWER(name) like ?', "%$search%")
                ->orWhereRaw('LOWER(description) like ?', "%$search%");
        });
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(SellerProfile::class)->withTrashed();
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

}
