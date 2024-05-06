<?php

namespace App\Models;

use App\Models\Profiles\AdminProfile;
use App\Models\Profiles\ClientProfile;
use App\Models\Profiles\HasProfiles;
use App\Models\Profiles\SellerProfile;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /**
     * This arguments are provided to the relationships between users
     * and their profiles
     */
    private const PROFILES_REL_ARGS = [
        ModelRolePivot::class,  // Through
        'model_id',             // First key
        'id',                   // Second key
        'id',                   // Local key
        'role_profile_id'       // Second local key
    ];

    use HasFactory, Notifiable;

    use HasRoles {
        roles as protected traitRoles;
    }

    use HasProfiles;

    use SoftDeletes, CascadeSoftDelete;
    protected $cascadeDeletes = ['clientProfile', 'sellerProfile'];


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Gets the Role model if any that has the given name and is assigned to this User
     *
     * @param string $role
     * @return ProfileRole
     */
    public function role(string $role) : ProfileRole
    {
        return $this->roles->firstWhere('name', $role);
    }

    public function roles(): BelongsToMany
    {
        return $this->traitRoles()
            ->withPivot('role_profile_type')
            ->withPivot('role_profile_id')
            ->using(ModelRolePivot::class)
            ->as('assignment');
    }

    /**
     * Gets the user's client profile.
     *
     * @return HasOneThrough
     */
    public function clientProfile(): HasOneThrough
    {
        return $this->hasOneThrough(ClientProfile::class, ...self::PROFILES_REL_ARGS)
            ->where('model_has_roles.role_profile_type', ClientProfile::class);
    }

    /**
     * Gets the user's seller profile.
     *
     * @return HasOneThrough
     */
    public function sellerProfile(): HasOneThrough
    {
        return $this->hasOneThrough(SellerProfile::class, ...self::PROFILES_REL_ARGS)
                ->where('model_has_roles.role_profile_type', SellerProfile::class);
    }

    /**
     * Gets the user's client profile.
     *
     * @return HasOneThrough
     */
    public function adminProfile(): HasOneThrough
    {
        return $this->hasOneThrough(AdminProfile::class, ...self::PROFILES_REL_ARGS)
            ->where('model_has_roles.role_profile_type', AdminProfile::class);

    }


}
