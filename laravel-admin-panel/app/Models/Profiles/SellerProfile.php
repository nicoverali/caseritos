<?php

namespace App\Models\Profiles;

use App\Models\CascadeSoftDelete;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class SellerProfile extends BaseProfile
{
    use HasFactory, SoftDeletes, CascadeSoftDelete;

    protected $cascadeDeletes = ['products'];

    protected $guarded = ['id'];

    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'owner_id');
    }

    public function orders() {
        return $this->hasManyThrough(Order::class, Product::class, 'owner_id');
    }
}
