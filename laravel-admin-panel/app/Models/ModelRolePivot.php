<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphPivot;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class ModelRolePivot extends MorphPivot
{
    use HasFactory;

    protected $table = 'model_has_roles';

    /**
     * Get the profile of the user with the related role
     *
     * @return MorphTo
     */
    public function profile(): MorphTo
    {
        return $this->morphTo('role_profile');
    }

}
