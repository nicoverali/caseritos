@extends('layouts.app')

@section('body')

    <x-auth-card>

        <p class="mt-4">{{$exception->getMessage()}}</p>

        <div class="flex items-center justify-end mt-4">
            <a href="{{route('home')}}">
                <x-button class="ml-3">
                    {{ __('misc.go_back') }}
                </x-button>
            </a>
        </div>
    </x-auth-card>
@endsection
