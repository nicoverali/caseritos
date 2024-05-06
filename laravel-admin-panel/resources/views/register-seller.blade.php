@extends('layouts.app-bg')

@section('body')

    <x-auth-card>

        <x-slot name="logo">

        </x-slot>
        <x-svg-o-light-bulb class="text-center block w-6 h-6 text-red-400"/>
        <p class="mt-4">{{__('pages/register-seller.description')}}</p>

        <form method="POST" action="{{ route('become-a-seller-save') }}" class="mt-4">
        @csrf

        <!-- Store name -->
            <div>
                <x-label for="store_name" :value="__('pages/register-seller.store_name')" />

                <x-input id="store_name" class="block mt-1 w-full" type="text" name="store_name" :value="old('store_name')" required autofocus />
            </div>

            <div class="flex items-center justify-end mt-4">
                <x-button class="ml-3">
                    {{ __('misc.save') }}
                </x-button>
            </div>
        </form>
    </x-auth-card>
@endsection
