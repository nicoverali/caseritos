@extends('layouts.app')

@section('body')

    <x-auth-card>

        <x-slot name="logo">
        </x-slot>
        <p class="mt-4">You're about to become an Administrator of the application.</p>

        <div class="flex items-center justify-end mt-4">
            <a href="#">
                <x-button class="ml-3" secondary>
                    {{ __('misc.cancel') }}
                </x-button>
            </a>
            <form method="POST" action="{{ route('request-admin-save') }}">
            @csrf
                <x-button class="ml-3">
                    {{ __('misc.accept') }}
                </x-button>
            </form>
        </div>
    </x-auth-card>
@endsection
