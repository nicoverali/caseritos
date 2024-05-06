@props(['icon', 'selected' => false])

@php
$stateClasses = $selected
    ? "bg-white shadow-inner text-red-400"
    : "bg-gray-100 hover:bg-gray-50 cursor-pointer";
@endphp

<div {{$attributes->merge(['class' => "py-1.5 px-4 text-center first:rounded-l-md last:rounded-r-md
border border-gray-200  transition-all ".$stateClasses])}}>
    @isset($icon)
        <x-icon name="{{$icon}}" class="fill-current w-4 h-4 inline"/>
    @endisset
    <p class="ml-1 inline align-middle">{{$slot}}</p>
</div>
