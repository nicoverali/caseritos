@props(['links' => []])

<div x-data="{open: false}">
    <x-svg-o-menu @click="open = true" class="sm:hidden w-6 h-6"/>

    <div :class="{'-translate-x-full':!open}"
    class="fixed z-50 sm:hidden h-screen w-screen px-6 py-4 top-0 left-0 bg-gray-50 transition-all transform"
    x-cloak
    >

        <div class="text-right">
            <x-svg-o-x class="w-6 h-6" @click="open = false"/>
        </div>

        <div class="mt-6">
            @foreach($links as $name => $href)
                <x-guest.responsive-nav-link href="{{$href}}" :isFirst="$loop->first">
                    {{$name}}
                </x-guest.responsive-nav-link>
            @endforeach
        </div>

    </div>
</div>
