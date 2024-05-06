@extends('layouts.app')

@section('body')
    @include('includes.navigation')

    <x-app-container>

        <x-banner/>

        <h1 class="text-3xl mt-6 px-6">{{__('pages/users.users')}}</h1>

        <div class="p-6">
            <table class="w-full text-left">
                <thead class="hidden sm:table-header-group">
                    <tr class="text-red-400 h-12 uppercase">
                        <th>{{__('pages/users.basic_info')}}</th>
                        <th>{{__('pages/users.created_date')}}</th>
                    </tr>
                </thead>
                <tbody class="pt-2">
                @foreach($users as $user)
                    <tr class=" border-b border-gray-50 first:border-t">
                        <td class="py-4 text-left ">
                            <div class="flex items-start sm:items-center">
                                <img class="w-16 h-16 rounded-full object-cover" src="{{$user->clientProfile->thumbnail}}" alt="">
                                <div class="ml-6 flex flex-col">
                                    <div>
                                        <p class="text-base font-semibold">{{$user->name}}</p>
                                        <p class="opacity-60 overflow-ellipsis">{{$user->email}}</p>
                                    </div>
                                    <div class="sm:hidden mt-1">
                                        <p class="opacity-60">{{__('pages/users.created_date')}}: {{$user->created_at->diffForHumans()}}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="sm:hidden flex mt-4">
                                <a href="{{route('edit-user', $user->id)}}" class="py-2 flex-grow rounded-md shadow-sm border border-gray-100 text-red-400 inline-block text-center">
                                    <x-svg-o-pencil class="w-4 h-4 inline-block"/>
                                    <p class="inline-block">{{__('misc.edit')}}</p>
                                </a>
                                <form class="inline-block flex-grow" action="{{route('edit-user-delete', $user->id)}}" method="POST">
                                    @csrf
                                    <button class="ml-2 py-2 w-full rounded-md shadow-sm border border-gray-100 text-red-400 inline-block">
                                        <x-svg-o-trash class="w-4 h-4 inline-block"/>
                                        <p class="inline-block">{{__('misc.delete')}}</p>
                                    </button>
                                </form>
                            </div>
                        </td>
                        <td class="py-4 hidden sm:table-cell">{{$user->created_at->format("d/m/Y")}}</td>
                        <td class="text-right hidden sm:table-cell">
                            <a href="{{route('edit-user', $user->id)}}" class="p-2 rounded-md shadow-sm border border-gray-100 text-red-400 inline-block align-middle">
                                <x-svg-o-pencil class="w-4 h-4"/>
                            </a>
                            <form class="inline-block align-middle" action="{{route('edit-user-delete', $user->id)}}" method="POST">
                                @csrf
                                <button href="#" class="ml-2 p-2 rounded-md shadow-sm border border-gray-100 text-red-400">
                                    <x-svg-o-trash class="w-4 h-4"/>
                                </button>
                            </form>
                        </td>
                    </tr>
                @endforeach

                </tbody>
            </table>
        </div>
    </x-app-container>

@endsection
