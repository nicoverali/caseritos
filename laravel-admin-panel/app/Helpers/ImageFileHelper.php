<?php

namespace App\Helpers;

use Intervention\Image\Facades\Image;

class ImageFileHelper{

    public static function imageToBase64($imageFile): string
    {
        $type = $imageFile->getMimeType();
        $picture = utf8_encode(base64_encode(file_get_contents($imageFile)));
        return "data:$type;base64,$picture";
    }

    public static function thumbnail($imageFile): string
    {
        return Image::make($imageFile)
            ->resize(512, 512, function($constraint) {$constraint->aspectRatio();})
            ->encode('data-url', 80)
            ->getEncoded();
    }

}
