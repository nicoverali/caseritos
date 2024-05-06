@extends('layouts.app')

@section('body')
    @include('includes.navigation')

    <x-app-container>
        <section class="w-full bg-red-400 px-6 py-12 text-center bg-home-hero bg-cover">
            <h1 class="text-white font-bold text-3xl">{{__('pages/home.hero')}}</h1>
            <form class="mx-auto relative sm:w-3/4 mt-4" action="{{route('home')}}">
                <x-input type="search" name="search" placeholder="{{__('search.products')}}" value="{{$search??''}}" class="w-full pl-12"/>
                <x-svg-o-search class="w-5 h-5 opacity-30 absolute left-4 top-translate-center"/>
            </form>
        </section>

        <section class="p-6">

            <div class="flex flex-col sm:flex-row mt-6 justify-between">
                <div class="flex justify-between sm:justify-start items-baseline w-full sm:w-auto">
                    <h1 class="text-2xl font-bold sm:mr-4">{{__('pages/home.food')}}</h1>
{{--                    <x-simple-dropdown selected="{{__('search.best_rated')}}">--}}
{{--                        <x-simple-dropdown-link href="#">{{__('search.best_rated')}}</x-simple-dropdown-link>--}}
{{--                        <x-simple-dropdown-link href="#">{{__('search.trending')}}</x-simple-dropdown-link>--}}
{{--                        <x-simple-dropdown-link href="#">{{__('search.newest')}}</x-simple-dropdown-link>--}}
{{--                    </x-simple-dropdown>--}}
                </div>

{{--                <div class="flex relative mt-4 sm:mt-0 w-full sm:w-auto">--}}
{{--                    <x-selection-button class="flex-grow sm:py-1.5 " icon="salt">{{__('food.salty')}}</x-selection-button>--}}
{{--                    <x-selection-button class="flex-grow sm:py-1.5" icon="muffin" selected>{{__('food.sweet')}}</x-selection-button>--}}
{{--                </div>--}}
            </div>

            <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                @foreach($products as $product)
                    <a href="{{route('product', [$product->id])}}">
                        <x-product-card
                            :img="$product->thumbnail"
                            :seller="$product->owner->store_name"
                            :title="$product->name"
                            :price="$product->price"
                        />
                    </a>
                @endforeach
            </div>
        </section>

    </x-app-container>
@endsection
