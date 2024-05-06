@props(['links' => []])

<div {{$attributes->merge(['class' => 'block px-6 py-4 text-right'])}}>
    @foreach($links as $name => $href)
        <x-underline-link href="{{$href}}" class="hidden sm:inline-block opacity-90 {{!$loop->first ? 'ml-4':''}}">
            {{$name}}
        </x-underline-link>
    @endforeach
    <x-guest.responsive-nav :links="$links"/>

</div>
