<?php

namespace App\Models;

use App\Models\Profiles\AdminProfile;
use App\Models\Profiles\ClientProfile;
use App\Models\Profiles\SellerProfile;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Spatie\Permission\Models\Role as SpatieRole;

class ProfileRole extends SpatieRole
{
    /**
     * This arguments are provided to the relationships between roles
     * and different profiles
     */
    private const PROFILES_REL_ARGS = [
        ModelRolePivot::class,      // Through
        'role_id',                  // First key
        'id',                       // Second key
        'id',                       // Local key
        'role_profile_id'           // Second local key
    ];

    use HasFactory;

    public function users(): BelongsToMany
    {
        return parent::users()
            ->withPivot('role_profile_type')
            ->withPivot('role_profile_id')
            ->using(ModelRolePivot::class)
            ->as('assignment');
    }

    /**
     * Gets all the client profiles of users with this role
     *
     * @return HasManyThrough
     */
    public function clientProfiles(): HasManyThrough
    {
        return $this->hasManyThrough(ClientProfile::class, ...self::PROFILES_REL_ARGS);
    }

    /**
     * Gets all the seller profiles of users with this role
     *
     * @return HasManyThrough
     */
    public function sellerProfiles(): HasManyThrough
    {
        return $this->hasManyThrough(SellerProfile::class, ...self::PROFILES_REL_ARGS);
    }

    /**
     * Gets all the administrator profiles of users with this role
     *
     * @return HasManyThrough
     */
    public function adminProfiles(): HasManyThrough
    {
        return $this->hasManyThrough(AdminProfile::class, ...self::PROFILES_REL_ARGS);
    }


}
