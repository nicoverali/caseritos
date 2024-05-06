@props(['isFirst'])

@php
    $classes = 'block mx-auto text-left py-6 w-full border-gray-200 border-opacity-30 border-b-2';
    $classes = $isFirst ? $classes.' border-t-2' : $classes;
@endphp

<a {{$attributes->merge(['class'=> $classes])}}>
    {{$slot}}
</a>


