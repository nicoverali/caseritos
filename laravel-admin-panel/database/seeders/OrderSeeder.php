<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\Product;
use App\Models\Profiles\ClientProfile;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $clients = ClientProfile::all();
        foreach ($clients as $client){
            $ordersCant = 10;
            $products = Product::all()->random($ordersCant);
            foreach ($products as $product){
                Order::factory()
                    ->for($client, 'client')
                    ->for($product)
                    ->create();
            }
        }
    }
}
