@extends('layouts.app')

@section('body')
    @include('includes.navigation')

    <x-app-container>

        <x-banner/>

        <h1 class="text-3xl mt-6 px-6">{{__('pages/orders.your_orders')}}</h1>

        <div class="p-6">
            <table class="w-full">
                <thead class="hidden sm:table-header-group uppercase">
                    <tr class="text-red-400 h-12 text-left">
                        <th>{{__('pages/orders.name_and_seller')}}</th>
                        <th class="hidden md:table-cell">{{__('pages/orders.date')}}</th>
                        <th>{{__('pages/orders.quantity')}}</th>
                        <th>{{__('pages/orders.price')}}</th>
                        <th>{{__('pages/orders.total')}}</th>
                    </tr>
                </thead>
                <tbody class="pt-2">
                    @foreach($orders as $order)
                    <tr class=" border-b border-gray-50 first:border-t">
                        <td class="py-4 flex items-top sm:items-center sm:max-w-sm sm:mr-0">
                            <img class="w-16 h-16 object-cover" src="{{$order->product->thumbnail}}" alt="">
                            <div class="ml-6 flex-grow flex flex-col">
                                <p class="text-base font-semibold line-clamp-2">{{$order->product->name}}</p>
                                <div class="order-first sm:order-none flex justify-between">
                                    <p class="text-sm line-clamp-1 pr-4">{{$order->product->owner->store_name}}</p>
                                    <p class="sm:hidden text-sm opacity-60">{{$order->created_at->diffForHumans()}}</p>
                                </div>
                                <p class="sm:hidden">
                                    <span class="text-red-400">$</span>
                                    {{$order->quantity*$order->price}}
                                    <span class="ml-1 -mt-2 text-sm opacity-60 inline align-baseline">
                                        {{$order->quantity}} x ${{$order->price}}
                                    </span>
                                </p>
                            </div>
                        </td>
                        <td class="py-4 hidden md:table-cell">
                            {{$order->created_at->format("d/m/Y")}}
                            <p class="text-sm opacity-60">{{$order->created_at->diffForHumans()}}</p>
                        </td>
                        <td class="py-4 hidden sm:table-cell">{{$order->quantity}}</td>
                        <td class="py-4 hidden sm:table-cell font-semibold"><span class="text-red-400">$</span>{{$order->price}}</td>
                        <td class="py-4 hidden sm:table-cell font-semibold"><span class="text-red-400">$</span>{{$order->quantity*$order->price}}</td>
                    </tr>
                    @endforeach



                </tbody>
            </table>
        </div>
    </x-app-container>

@endsection
