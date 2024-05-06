<?php

namespace App\Models\Profiles;

trait HasBinaryImageAttributes {

    protected $attributesAsString = [];

    public function __get($key)
    {
        foreach ($this->binaryImageAttributes??[] as $attribute) {
            if ($attribute != $key) {
                continue;
            }
            if (array_key_exists($attribute, $this->attributesAsString)){
                return $this->attributesAsString[$attribute];
            }
            $image = stream_get_contents(parent::__get($key));
            $this->attributesAsString[$attribute] = $image;
            return $image;
        }
        return parent::__get($key);
    }
}
