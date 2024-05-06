<?php

namespace App\Models\Profiles;

use App\Models\User;

trait HasProfiles {

    public function assignClientProfile(ClientProfile $profile){
        $this->assignProfile('client', $profile);
        return $this;
    }

    public function assignSellerProfile(SellerProfile $profile){
        $this->assignProfile('seller', $profile);
        return $this;
    }

    public function assignAdminProfile(AdminProfile $profile){
        $this->assignProfile('admin', $profile);
        return $this;
    }

    private function assignProfile(String $name, BaseProfile $profile) {
        $assignment = $this->role($name)->assignment;
        $assignment->profile()->associate($profile);
        $assignment->save();
    }

}
