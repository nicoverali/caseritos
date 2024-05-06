@props(['selected'])

<div x-data="{open: false}" class="text-gray-400 hover:text-gray-500 relative select-none">
    <div @click="open = !open" class="cursor-pointer">
        <p class="text inline transition-all" >{{$selected}}</p>
        <x-svg-o-chevron-down x-bind:class="{'rotate-180':open}" class="w-4 h-4 inline transform transition-all" />
    </div>
    <div x-show.transition="open" class="text-black mt-1 bg-white shadow-md rounded-md absolute z-40 w-48 right-0 top-full border border-gray-100" x-cloak>
        {{$slot}}
    </div>
</div>
