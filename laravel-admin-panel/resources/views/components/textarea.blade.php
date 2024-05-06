@props(['disabled' => false, 'errorName' => $attributes['name']])

@error($errorName)

<div>
    <textarea {{ $disabled ? 'disabled' : '' }} {{ $attributes->merge(['class' => 'rounded-md shadow-sm border-red-500 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 resize-none']) }}}
    >{{$slot}}</textarea>
    <p class="mt-1 text-red-500">{{$message}}</p>
</div>
@else
    <div>
        <textarea {{ $disabled ? 'disabled' : '' }} {{ $attributes->merge(['class' => 'rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 resize-none']) }}
        >{{$slot}}</textarea>
    </div>
@enderror
