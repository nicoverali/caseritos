@extends('layouts.app-bg')

@section('body')

    <div class="sm:py-12 h-full">
        <div class="max-w-2xl mx-auto sm:px-6 lg:px-8 h-full flex items-center">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg border-b border-gray-200 w-full">
                <div class="p-12 flex flex-col items-center">
                    <img class="sm:w-3/4" src="{{asset('/images/logo.png')}}" alt="">
                    <a href="{{route('login')}}" class="mt-16 text-lg hover:bg-gray-50 border border-gray-100 shadow hover:shadow-md rounded-md py-4 w-3/4 text-center uppercase font-semibold transition-all">
                        Log in
                    </a>
                    <a href="{{route('register')}}" class="mt-6 text-lg bg-gray-900 hover:bg-gray-800 text-white border border-gray-800 shadow hover:shadow-md rounded-md py-4 w-3/4 text-center uppercase font-semibold transition-all">
                        Register
                    </a>
                </div>
            </div>
        </div>
    </div>
@endsection
