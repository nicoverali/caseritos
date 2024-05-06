@php use App\Http\Controllers\ProductController; @endphp

@extends('layouts.app')

@section('body')
    @include('includes.navigation')

    <x-app-container>

        <x-banner/>

        <x-back-header class="px-6 mt-6">{{__('pages/edit-product.new_product')}}</x-back-header>

        <div class="p-6 flex flex-col sm:flex-row">

            <img class="h-64 w-full sm:h-auto sm:w-3/6 hidden object-cover sm:block" src="{{$product->picture??''}}" alt=""/>

            <form class="sm:ml-16 flex-grow" action="{{route('create-product-save')}}" method="post" enctype="multipart/form-data">
                @csrf
                <div>
                    <x-label for="name" :value="__('pages/edit-product.title')"/>
                    <x-input id="name" class="w-full" type="text" name="name"  required autofocus/>
                </div>
                <img class="mt-6 h-64 w-full sm:h-2/5 sm:w-2/5 sm:hidden object-cover" src="{{$product->picture??''}}" alt=""/>
                <div class="w-full mt-4 relative">
                    <input type="file" id="picture" name="picture" accept="image/*" class="absolute opacity-0 bottom-0" required>
                    <label for="picture" class="block w-full">
                        <span role="button" aria-controls="filename" tabindex="0"
                        class="block w-full py-4 text-center text-red-400 rounded border border-red-400 cursor-pointer hover:bg-red-400 hover:text-white">
                            {{__('pages/edit-product.change_image')}}
                            <x-svg-s-pencil class="inline ml-2 w-4 h-4"/>
                        </span>
                    </label>
                    @error('picture')
                    <p class="text-sm text-red-400 mt-1">{{$message}}</p>
                    @enderror
                </div>

                <div class="mt-4">
                    <x-label for="description" :value="__('pages/edit-product.description')"/>
                    <x-textarea id="description" class="w-full h-48" type="text" name="description" required autofocus/>
                </div>
                <div class="flex w-full mt-4">
                    <div class="w-1/2 pr-4">
                        <x-label for="price" :value="__('pages/edit-product.price')"/>
                        <x-input id="price" class="w-full" type="number" min="1" max="{{ProductController::maxPrice()}}" name="price" required autofocus/>
                    </div>
                    <div class="w-1/2 pl-4">
                        <x-label for="stock" :value="__('pages/edit-product.stock')"/>
                        <x-input id="stock" class="w-full" type="number" min="1" max="{{ProductController::maxStock()}}" name="stock" required autofocus/>
                    </div>
                </div>
                <button type="submit" class="w-full py-4 mt-4 text-center text-white bg-red-400 rounded sm:w-48 hover:bg-red-500 border border-red-400">
                    {{__('misc.save')}}
                </button>
            </form>
        </div>
    </x-app-container>


@endsection
