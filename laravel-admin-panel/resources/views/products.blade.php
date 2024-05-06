@extends('layouts.app')

@section('body')
    @include('includes.navigation')

    <x-app-container>

        <x-banner/>

        <div class="flex px-6 mt-6 items-baseline justify-between">
            <h1 class="text-3xl">{{__('pages/products.your_products')}}</h1>
            <a href="{{route('create-product')}}" class="text-red-400 align-middle">
                <x-svg-o-plus class="w-6 h-6 inline align-top"/>
                <p class="text-lg inline">{{__('pages/products.add_product')}}</p>
            </a>
        </div>

        <div class="p-6 grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            @foreach($products as $product)
            <a href="{{route('edit-product', $product->id)}}"><x-my-product-card
                    img="{{$product->thumbnail}}"
                    title="{{$product->name}}"
                    price="{{$product->price}}"
                    publishedAt="{{$product->created_at->format('d/m/Y')}}"
                    stock="{{$product->stock}}"/></a>
            @endforeach


        </div>

    </x-app-container>

@endsection
