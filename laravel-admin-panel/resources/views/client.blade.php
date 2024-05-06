@extends('layouts.app')

@section('body')
    @include('includes.navigation')

    <x-app-container>

        <x-banner height="56" class="p-6 flex flex-col justify-between">
            <x-back-header arrowColor="white"/>
        </x-banner>
        <div class="px-6 flex flex-col sm:flex-row relative">
            <img class="w-64 h-64 absolute sm:relative self-center sm:self-starttop-0 transform -translate-y-1/2 -mt-1/2 border-8 border-white shadow-md rounded-full object-cover"
                 src="{{$client->picture}}" alt="">
            <div class="sm:ml-16 pb-16 pt-40 sm:pt-8 text-center sm:text-left">
                <h1 class="text-5xl font-semibold">{{$client->user->name}}</h1>
                <div class="mt-16 sm:mt-8 grid gap-x-16 gap-y-16 sm:gap-y-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                    <div class="col-span-auto">
                        <p class="text-red-400 uppercase">Email</p>
                        <p>{{$client->user->email}}</p>
                    </div>
                    <div>
                        <p class="text-red-400 uppercase">Phone</p>
                        <p>{{$client->phone}}</p>
                    </div>
                    <div>
                        <p class="text-red-400 uppercase">Address</p>
                        <p>{{$client->address}}</p>
                    </div>
                </div>
            </div>
        </div>
    </x-app-container>

@endsection
