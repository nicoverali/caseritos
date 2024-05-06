<?php

namespace App\Http\Controllers\Profiles;

use App\Http\Controllers\Controller;
use App\Models\Profiles\SellerProfile;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Redirector;

class SellerController extends Controller
{
    /**
     * Show the form for creating a new resource.
     *
     * @return Application|Factory|View
     */
    public function create(Request $request)
    {
        if ($request->user()->hasRole('seller')){
            return redirect(route('home'));
        }
        return view('register-seller');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Application|Redirector|RedirectResponse
     */
    public function store(Request $request)
    {
        $user = $request->user();
        if (!$user->hasRole('seller')){
            $attributes = $request->validate([
                'store_name' => 'required|string|max:255'
            ]);
            $user->assignRole('seller');
            $user->assignSellerProfile(SellerProfile::create($attributes));
        }

        return redirect(route('create-product'));
    }
}
