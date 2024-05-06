<?php

namespace App\Faker;

use Faker\Provider\Base;

class ClientProfilePictureProvider extends Base
{
    private static $IMAGE_PREFIX = "data:image/jpeg;base64,";

    public static function profilePicture(?string $name): string
    {

        return self::$IMAGE_PREFIX.self::requestImage($name, 512);
    }

    public static function profileThumbnail(?string $name): string
    {
        return self::$IMAGE_PREFIX.self::requestImage($name, 128);
    }

    private static function requestImage($name, $size): string
    {
        $parsedName = urlencode($name);
        $url = $parsedName
            ? "https://ui-avatars.com/api/?name=$parsedName&background=000000&color=fff&size=$size"
            : "https://ui-avatars.com/api/?background=000000&color=fff&size=$size";

        $image = null;
        while (!$image){
            try {
                $image = base64_encode(file_get_contents($url));
            } catch (\ErrorException $error){
                printf($error);
                printf("Retrying...");
            }
        }
        return $image;
    }
}
