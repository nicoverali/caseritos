<?php

namespace Database\Factories;

use App\Faker\FakeProductProvider;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $this->faker->addProvider(FakeProductProvider::class);
        $productFake = $this->faker->product();
        $creationDate = $this->faker->dateTimeThisYear();

        return [
            'name' => $productFake['description'] ?? $this->faker->streetName,
            'description' => $productFake['alt_description'] ?? '',
            'picture' => $productFake['image'],
            'thumbnail' => $productFake['thumbnail'],
            'stock' => $this->faker->numberBetween(0,100),
            'price' => $this->faker->numberBetween(100,1000),
            'created_at' => $creationDate,
            'updated_at' => $this->faker->dateTimeBetween($creationDate),
        ];
    }
}
