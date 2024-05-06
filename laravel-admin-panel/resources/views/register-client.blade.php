@extends('layouts.app-bg')

@section('body')

    <x-auth-card>

        <form method="POST" action="{{ route('register-client-save') }}" class="mt-4" enctype="multipart/form-data">
        @csrf
            <div class="block mx-auto text-center relative">
                <img class="mx-auto h-40" src="{{asset('images/user-generic.png')}}" alt="">
                <label for="profile-picture" class="p-4 rounded-full bg-red-400 text-white relative -top-12 left-16 inline-block cursor-pointer">
                        <x-svg-s-upload class="w-5 h-5"/>
                </label>
                <input class="hidden" type="file" id="profile-picture" name="profile-picture" accept="image/*">
                @error('profile-picture')
                    <p class="text-sm text-red-400">{{$message}}</p>
                @enderror
            </div>
        <!-- Store name -->
            <div>
                <x-label for="phone" :value="__('client.phone')" />

                <x-input id="phone" class="block mt-1 w-full" type="text" name="phone" :value="old('phone')" required autofocus />
            </div>

            <div class="mt-4">
                <x-label for="address" :value="__('client.address')" />

                <x-input id="address" class="block mt-1 w-full" type="text" name="address" :value="old('address')" required autofocus />
            </div>

            <div class="flex items-center justify-end mt-4">
                <x-button class="ml-3">
                    {{ __('misc.register') }}
                </x-button>
            </div>
        </form>
    </x-auth-card>
@endsection
