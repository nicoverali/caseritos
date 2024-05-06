@extends('layouts.app-bg')

@section('body')

    <x-auth-card>
        <x-slot name="logo">
            <a class="inline-block text-center" href="/">
                <x-application-logo full class="h-20 fill-current text-gray-500"/>
            </a>
        </x-slot>

        <!-- Session Status -->
        <x-auth-session-status class="mb-4" :status="session('status')" />

        <!-- Validation Errors -->
        <x-auth-validation-errors class="mb-4" :errors="$errors" />

        <form method="POST" action="{{ route('login') }}">
            @csrf

            <!-- Email Address -->
            <div>
                <x-label for="email" :value="__('Email')" />

                <x-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required autofocus />
            </div>

            <!-- Password -->
            <div class="mt-4">
                <x-label for="password" :value="__('Password')" class="inline-block float-left"/>

                @if (Route::has('password.request'))
                    <x-underline-link href="{{ route('password.request') }}" class="text-sm float-right">
                        {{ __('Forgot your password?') }}
                    </x-underline-link>
                @endif

                <x-input id="password" class="inline-block mt-1 w-full"
                                type="password"
                                name="password"
                                required autocomplete="current-password" />

{{--                @if (Route::has('password.request'))--}}
{{--                    <x-underline-link href="{{ route('password.request') }}" class="text-sm block mt-4 sm:mt-2">--}}
{{--                        {{ __('Forgot your password?') }}--}}
{{--                    </x-underline-link>--}}
{{--                @endif--}}
            </div>

            <!-- Remember Me -->
            <div class="block mt-4">
                <label for="remember_me" class="inline-flex items-center">
                    <input id="remember_me" type="checkbox" class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" name="remember">
                    <span class="ml-2 text-sm text-gray-600">{{ __('Remember me') }}</span>
                </label>
            </div>

            <div class="flex items-center justify-end mt-4">

                <x-underline-link href="{{route('register')}}" class="mt-2">
                    Don't have an account?
                </x-underline-link>

                <x-button class="ml-3">
                    {{ __('Log in') }}
                </x-button>
            </div>
        </form>
    </x-auth-card>
@endsection
