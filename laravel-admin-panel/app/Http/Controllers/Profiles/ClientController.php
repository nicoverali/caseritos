<?php

namespace App\Http\Controllers\Profiles;

use App\Faker\ClientProfilePictureProvider;
use App\Helpers\ImageFileHelper;
use App\Http\Controllers\Controller;
use App\Models\Profiles\ClientProfile;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Symfony\Component\Console\Output\ConsoleOutput;

class ClientController extends Controller
{

    /**
     * Show the form for creating a new resource.
     *
     * @return Application|Factory|View|Redirector|RedirectResponse
     */
    public function create(Request $request)
    {
        if ($request->user()->hasRole('client')){
            return redirect(route('home'));
        }
        return view('register-client');
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
        if (!$user->hasRole('client')){
            $attributes = $request->validate([
                'profile-picture' => 'nullable|image|max:10240',
                'phone' => 'required|max:255',
                'address' => 'required|max:255',
            ]);

            $this->addProfilePictureToAttributes($attributes, $user->name);
            $user->assignRole('client');
            $user->assignClientProfile(ClientProfile::create($attributes));
        }

        return redirect(route('home'));
    }

    /**
     * Display the specified resource.
     *
     * @param ClientProfile $clientProfile
     * @return Application|Factory|View
     */
    public function show(ClientProfile $clientProfile)
    {
        return view('client')
            ->with('client', $clientProfile);
    }

    private function addProfilePictureToAttributes(array &$attributes, string $name)
    {
        if (array_key_exists('profile-picture', $attributes)){
            $imageFile = $attributes['profile-picture'];
            unset($attributes['profile-picture']);
            $attributes['picture'] = ImageFileHelper::imageToBase64($imageFile);
            $attributes['thumbnail'] = ImageFileHelper::thumbnail($imageFile);
        } else {
            $attributes['picture'] = ClientProfilePictureProvider::profilePicture($name);
            $attributes['thumbnail'] = ClientProfilePictureProvider::profileThumbnail($name);
        }
    }
}
