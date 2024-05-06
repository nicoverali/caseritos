@extends('layouts.app')

@section('body')
    @include('includes.navigation')

    <x-app-container>

        <x-banner/>

        <h1 class="text-3xl mt-6 px-6">{{__('pages/sales.your_sales')}}</h1>

        <div class="p-6">
            <table class="w-full">
                <thead class="hidden sm:table-header-group uppercase">
                    <tr class="text-red-400 h-12 text-left">
                        <th>{{__('pages/sales.name')}}</th>
                        <th class="hidden md:table-cell">{{__('pages/sales.date')}}</th>
                        <th>{{__('pages/sales.quantity')}}</th>
                        <th>{{__('pages/sales.price')}}</th>
                        <th>{{__('pages/sales.total')}}</th>
                    </tr>
                </thead>
                <tbody class="pt-2">
                @foreach($orders as $order)
                    <tr class=" border-b border-gray-50 first:border-t ">
                        <td class="py-4 flex items-top sm:items-center sm:max-w-sm">
                            <img class="w-24 h-24 sm:w-16 sm:h-16 object-cover" src="{{$order->product->thumbnail}}" alt="">
                            <div class="ml-6 flex-grow flex flex-col">
                                <p class="text-base font-semibold line-clamp-2">{{$order->product->name}}</p>
                                <p class="sm:hidden">
                                    <span class="text-red-400">$</span>
                                    {{$order->quantity*$order->price}}
                                    <span class="ml-1 -mt-2 text-sm opacity-60 inline align-baseline">
                                        {{$order->quantity}} x ${{$order->price}}
                                    </span>
                                </p>
                                <div class="mt-1 sm:hidden">
                                    <a href="{{route('sale-client', $order)}}" class="p-2 w-auto rounded-md shadow-sm border border-gray-100 text-red-400 inline-block">
                                        <x-svg-s-user class="w-4 h-4 -mt-1 inline align-middle"/>
                                        See buyer
                                    </a>
                                </div>
                            </div>
                            <p class="ml-4 sm:hidden text-sm opacity-60 mt-0.5">{{$order->created_at->diffForHumans()}}</p>

                        </td>
                        <td class="py-4 hidden md:table-cell">
                            {{$order->created_at->format("d/m/Y")}}
                            <p class="text-sm opacity-60 mt-0.5">{{$order->created_at->diffForHumans()}}</p>
                        </td>
                        <td class="py-4 hidden sm:table-cell">{{$order->quantity}}</td>
                        <td class="py-4 hidden sm:table-cell font-semibold"><span class="text-red-400">$</span>{{$order->price}}</td>
                        <td class="py-4 hidden sm:table-cell font-semibold"><span class="text-red-400">$</span>{{$order->quantity*$order->price}}</td>
                        <td class="hidden sm:table-cell">
                            <a href="{{route('sale-client', $order)}}" class="p-2 rounded-md shadow-sm border border-gray-100 text-red-400 inline-block">
                                <x-svg-s-user class="w-4 h-4"/>
                            </a>
                        </td>
                    </tr>
                @endforeach



                </tbody>
            </table>
        </div>
    </x-app-container>

@endsection
