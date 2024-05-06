<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Profiles\SellerProfile;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $sellers = SellerProfile::all();
        foreach ($sellers as $seller){
            $product_cant = rand(0, 10);
            Product::factory($product_cant)
                ->for($seller, 'owner')
                ->create();
        }
    }
}
