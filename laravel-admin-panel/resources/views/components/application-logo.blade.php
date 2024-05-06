@props(['full' => false])

<img {{$attributes}}
     src="{{asset('images/'.($full ? 'logo' : 'logo-icon').'.png')}}"
     alt="caseritos-logo">
