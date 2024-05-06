@props(['height' => '12'])

<div {{$attributes->merge(['class' => "w-full bg-red-400 bg-home-hero bg-cover h-".$height])}}>
    {{$slot}}
</div>
