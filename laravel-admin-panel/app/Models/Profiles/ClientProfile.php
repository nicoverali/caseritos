<?php

namespace App\Models\Profiles;

use App\Models\ModelRolePivot;
use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class ClientProfile extends BaseProfile
{
    use HasFactory, SoftDeletes, HasBinaryImageAttributes;

    protected $binaryImageAttributes = ['picture', 'thumbnail'];

    protected $guarded = ['id'];

    public function orders() : HasMany
    {
        return $this->hasMany(Order::class, 'client_id');
    }
}
