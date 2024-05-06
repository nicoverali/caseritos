@props(['href' => url()->previous(), 'arrowColor' => 'red-400'])

<div {{$attributes->merge(['class' => "w-full text-".$arrowColor])}}>
    <a href="{{$href}}" class="inline-block">
        <x-svg-o-arrow-left class="w-7 h-7 inline-block"/>
        @isset($slot)
            <h1 class="inline-block align-middle ml-2 text-xl">{{$slot}}</h1>
        @endisset
    </a>
</div>
