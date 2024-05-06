<?php

namespace Database\Factories\Profiles;

use App\Faker\ClientProfilePictureProvider;
use App\Models\Profiles\ClientProfile;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClientProfileFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ClientProfile::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $this->faker->addProvider(ClientProfilePictureProvider::class);

        return [
            'picture' => $this->faker->profilePicture(''),
            'thumbnail' => $this->faker->profileThumbnail(''),
            'phone' => $this->faker->phoneNumber,
            'address' => $this->faker->address,
        ];
    }
}
