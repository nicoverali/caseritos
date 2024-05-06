@extends('layouts.app')

@section('body')
    @include('includes.navigation')

    <x-app-container>

        <x-banner height="56" class="p-6 flex flex-col justify-between">
            <x-back-header arrowColor="white">Edit user</x-back-header>
        </x-banner>
        <div class="px-6 flex flex-col sm:flex-row relative">
            <img class="w-64 h-64 absolute sm:relative self-center sm:self-starttop-0 transform -translate-y-1/2 -mt-1/2 border-8 border-white shadow-md rounded-full object-cover"
                 src="{{$user->clientProfile->picture}}" alt="">
            <div class="sm:ml-16 w-full pb-16 pt-40 sm:pt-8 text-left sm:text-left">
                <form class="w-full" action="{{route('edit-user-save',$user->id)}}" method="POST">
                    @csrf
                    <div>
                        <x-label for="name" :value="__('client.name')"/>
                        <x-input id="name" class="w-full sm:w-3/4" type="text" name="name" value="{{$user->name}}" required autofocus/>
                    </div>
                    <div class="mt-6">
                        <x-label for="email" :value="__('client.email')"/>
                        <x-input id="email" class="w-full sm:w-3/4" type="text" name="email" value="{{$user->email}}" required autofocus/>
                    </div>
                    <button type="submit" class="w-full py-4 mt-6 text-center text-white bg-red-400 rounded sm:w-48 hover:bg-red-300">
                        {{__('pages/edit-product.save')}}
                    </button>
                </form>
            </div>
        </div>
    </x-app-container>

@endsection
