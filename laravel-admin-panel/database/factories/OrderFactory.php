<?php

namespace Database\Factories;

use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Order::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $creationDate = $this->faker->dateTimeThisYear();
        return [
            'quantity' => $this->faker->numberBetween(1,3),
            'price' => $this->faker->numberBetween(100,1000),
            'created_at' => $creationDate,
            'updated_at' => $this->faker->dateTimeBetween($creationDate),
        ];
    }
}
