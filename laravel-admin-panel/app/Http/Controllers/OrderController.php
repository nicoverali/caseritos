<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;

class OrderController extends Controller
{
    /**
     * Display a listing of client orders.
     *
     * @return Application|Factory|View
     */
    public function clientIndex(Request $request)
    {
        $client = $request->user()->clientProfile;
        return view('orders')
            ->with('orders', $client->orders()
                ->latest()
                ->with('product', 'product.owner')
                ->get());
    }

    /**
     * Display a listing of seller orders.
     *
     * @return Application|Factory|View
     */
    public function sellerIndex(Request $request)
    {
        $seller = $request->user()->sellerProfile;
        return view('sales')
            ->with('orders', $seller->orders()
                ->latest()
                ->with('product')
                ->get());
    }

    public function showClient(Order $order, Request $request){
        if ($request->user()->cannot('viewClient', $order)){
            abort(403, "Not allow");
        }

        return view('client')
            ->with('client', $order->client);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Application|RedirectResponse|Redirector
     */
    public function store(Product $product, Request $request)
    {
        $client = $request->user()->clientProfile;
        $quantity = $request->validate([
            'quantity' => "required|numeric|gt:0|lte:$product->stock"
        ])['quantity'];

        $this->removeStock($product, $quantity);
        $this->createOrder($client, $product, $quantity);
        return redirect(route('orders'));
    }

    private function removeStock(Product $product, $quantity)
    {
        $product->stock -= $quantity;
        $product->save();
    }

    private function createOrder($client, Product $product, $quantity)
    {
        $client->orders()->create([
            'product_id' => $product->id,
            'quantity' => $quantity,
            'price' => $product->price,
        ]);
    }
}
