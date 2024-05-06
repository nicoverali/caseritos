<?php

namespace App\Providers;

use App\Models\Order;
use App\Models\Product;
use App\Policies\EditOwnedProductOnly;
use App\Policies\ShowClientToSellerOnly;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        Product::class => EditOwnedProductOnly::class,
        Order::class => ShowClientToSellerOnly::class
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        //
    }
}
