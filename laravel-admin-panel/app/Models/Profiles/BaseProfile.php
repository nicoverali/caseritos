<?php


namespace App\Models\Profiles;


use App\Models\ModelRolePivot;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class BaseProfile extends Model
{

    /**
     * Get the User/Role pivot for this profile.
     */
    public function pivot(): MorphOne
    {
        return $this->morphOne(ModelRolePivot::class, 'role_profile');
    }

    /**
     * Gets the user associated with this profile
     *
     * @return HasOneThrough
     */
    public function user(): HasOneThrough
    {
        return $this->hasOneThrough(User::class, ModelRolePivot::class, 'role_profile_id', 'id', 'id', 'model_id')
            ->where('model_has_roles.role_profile_type', static::class)
            ->withTrashed();
    }

}
