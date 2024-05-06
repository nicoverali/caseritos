@props(['img', 'seller', 'title', 'price'])

<div class="h-32 p-4 shadow-sm border border-gray-150 rounded-md group flex sm:flex-col sm:h-full">

    {{--  IMAGE WITH HIDE BACKGROUND  --}}
    <div class="flex-shrink-0 w-24 h-full relative sm:w-full sm:h-64">
        <div class="absolute top-0 left-0 w-full h-full bg-red-400"></div>
        <img class="relative w-full h-full object-cover shadow-sm sm:group-hover:p-1 transition-all"
             src="{{$img}}" alt="{{$title}}">
    </div>

    {{--  DESCRIPTION AND PRICE  --}}
    <div class="flex flex-grow ml-4 mt-1 flex-col sm:ml-0 sm:mt-3">
        <div class="pr-2 flex-grow flex flex-col w-full overflow-hidden">
            <p class="text-sm">{{$seller}}</p>
            <h3 class="text-base font-semibold leading-5 line-clamp-3 sm:line-clamp-2">{{$title}}</h3>
        </div>
        <p class="font-semibold self-end sm:self-start sm:mt-2"><span class="text-red-400 font-bold mr-1">$</span>{{$price}}</p>
    </div>
</div>
