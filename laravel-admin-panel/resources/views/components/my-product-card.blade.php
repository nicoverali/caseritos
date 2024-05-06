@props(['img', 'title', 'stars', 'reviewCount', 'price', 'publishedAt', 'stock'])

<div class="h-32 p-4 shadow-sm border border-gray-150 rounded-md group flex sm:flex-col sm:h-full ">

    {{--  IMAGE WITH HIDE BACKGROUND  --}}
    <div class="flex-shrink-0 w-24 h-full relative sm:w-full sm:h-48">
        <div class="absolute top-0 left-0 w-full h-full bg-red-400"></div>
        <img class="relative w-full h-full object-cover shadow-sm sm:group-hover:p-1 transition-all"
             src="{{$img}}" alt="{{$title}}">
    </div>

    {{--  DESCRIPTION AND PRICE  --}}
    <div class="ml-4 sm:ml-auto sm:mt-2 flex-grow flex flex-col w-full overflow-hidden">
        <p class="text-xs opacity-60">{{__('product.published')}}: {{$publishedAt}}</p>
        <h3 class="mt-2 flex-grow text-base font-semibold leading-5 line-clamp-2" >{{$title}}</h3>
        <div>
            <p class="self-end sm:self-auto mt-1 font-semibold"><span class="text-red-400 font-bold mr-1">$</span>{{$price}}</p>
            <p class="opacity-60">{{__('product.stock')}}: {{$stock}}</p>
        </div>
    </div>
</div>
