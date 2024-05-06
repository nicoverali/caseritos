<?php

namespace App\Policies;

use App\Models\Order;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ShowClientToSellerOnly
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the client of the order.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Order  $order
     * @return mixed
     */
    public function viewClient(User $user, Order $order)
    {
        return $order->product->owner->is($user->sellerProfile);
    }
}
