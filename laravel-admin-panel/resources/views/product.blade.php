@extends('layouts.app')

@section('body')
    @include('includes.navigation')

    <x-app-container>

        <x-banner/>

        <x-back-header class="px-6 mt-6"></x-back-header>

        <div class="px-6 py-4 sm:py-12 flex flex-col sm:flex-row">


            <div class="sm:hidden">
                <h1 class="mt-4 text-2xl ">{{$product->name}}</h1>
                <p class="mt-1 text-sm opacity-60">{{$product->owner->store_name}}</p>
            </div>

            <img class="h-64 mt-4 sm:mt-0 w-full sm:h-auto sm:w-3/6 object-cover sm:block" src="{{$product->picture}}" alt=""/>

            <div class="mt-4 sm:ml-24">
                <div class="hidden sm:flex sm:flex-col">
                    <h1 class="mt-4 sm:mt-0 text-2xl ">{{$product->name}}</h1>
                    <p class="mt-1 sm:mt-0 text-sm opacity-60 sm:order-first">{{$product->owner->store_name}}</p>
                </div>
                <p class="hidden text-2xl mt-4 sm:block"><span class="text-red-400">$</span>{{$product->price}}</p>
                <p class="mt-6">{{$product->description}}</p>
                <form action="{{route('product-buy', $product->id)}}" method="post">
                    @csrf
                    <div class="mt-8 flex flex-wrap items-center justify-between sm:justify-start sm:justify-items-start">
                        <p class="text-2xl sm:hidden"><span class="text-red-400">$</span>{{$product->price}}</p>
                        <div class="text-center inline-block">
                            @unless((Auth::user()->sellerProfile??false) && Auth::user()->sellerProfile->is($product->owner))
                            <p class="mt-1 mr-2 inline">{{__('pages/product.quantity')}}: </p>
                            <x-input class="w-24 pl-5 text-center" name="quantity" type="number" min="0" max="{{$product->stock}}" value="1" oninput="validity.valid||(value='');"/>
                            @endunless
                            <p class="opacity-60 text-left">{{__('pages/product.on_stock')}}: {{$product->stock}}</p>
                        </div>
                        @unless((Auth::user()->sellerProfile??false) && Auth::user()->sellerProfile->is($product->owner))
                        <button class="w-full py-4 mt-4 sm:mt-0 sm:ml-6 text-center text-white bg-red-400 rounded sm:w-48">{{__('pages/product.buy')}}</button>
                        @endunless
                    </div>
                </form>
            </div>
        </div>
    </x-app-container>

@endsection
