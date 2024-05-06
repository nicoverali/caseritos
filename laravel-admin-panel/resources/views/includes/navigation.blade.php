<nav x-data="{ open: false }" class="bg-white border-b border-gray-100 shadow">
    <!-- Primary Navigation Menu -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
            <div class="flex">
                <!-- Logo -->
                <div class="flex-shrink-0 flex items-center">
                    <a href="{{ route('home') }}">
                        <x-application-logo class="block h-10 w-auto fill-current text-gray-600" />
                    </a>
                </div>

                <!-- Navigation Links -->
                <div class="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                    @role('client')
                    <x-nav-link :href="route('home')" :active="request()->routeIs('home')">
                        {{ __('pages/names.home') }}
                    </x-nav-link>
                    <x-nav-link :href="route('orders')" :active="request()->routeIs('orders')">
                        {{ __('pages/names.orders') }}
                    </x-nav-link>
                    @endrole
                    @role('seller')
                    <x-nav-link :href="route('products')" :active="request()->routeIs('products')">
                        {{ __('pages/names.products') }}
                    </x-nav-link>
                    <x-nav-link :href="route('sales')" :active="request()->routeIs('sales')">
                        {{ __('pages/names.sales') }}
                    </x-nav-link>
                    @endrole
                    @role('admin')
                    <x-nav-link :href="route('users')" :active="request()->routeIs('users')">
                        {{ __('pages/names.users') }}
                    </x-nav-link>
                    @endrole
                </div>
            </div>

            <!-- Right side -->
            <div class="hidden md:flex md:items-center md:ml-6">
                @unlessrole('seller')
                <a href="{{route('become-a-seller')}}" class="text-red-400 hover:text-red-600 transition-colors">
                    <div class="mr-6 p-2">
                        <x-svg-o-light-bulb class="inline-block stroke-current w-6 h -6 -mt-1"/>
                        <p class="inline-block ">{{__('navigation.sell_products')}}</p>
                    </div>
                </a>
                @endunlessrole

                <!-- Settings Dropdown -->
                <x-dropdown align="right" width="48">
                    <x-slot name="trigger">
                        <button class="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out">
                            <div>{{ Auth::user()->name }}</div>

                            <div class="ml-1">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                </svg>
                            </div>
                        </button>
                    </x-slot>

                    <x-slot name="content">
                        @unlessrole('admin')
                        <x-dropdown-link :href="route('request-admin')">
                            {{ __('navigation.request_admin') }}
                        </x-dropdown-link>
                        @endunlessrole
                        <!-- Authentication -->
                        <form method="POST" action="{{ route('logout') }}">
                            @csrf

                            <x-dropdown-link :href="route('logout')"
                                    onclick="event.preventDefault();
                                                this.closest('form').submit();">
                                {{ __('Log out') }}
                            </x-dropdown-link>
                        </form>
                    </x-slot>
                </x-dropdown>
            </div>

            <!-- Hamburger -->
            <div class="-mr-2 flex items-center md:hidden">
                <button @click="open = ! open" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
                    <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path :class="{'hidden': open, 'inline-flex': ! open }" class="inline-flex" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        <path :class="{'hidden': ! open, 'inline-flex': open }" class="hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    </div>

    <!-- Responsive Navigation Menu -->
    <div :class="{'block': open, 'hidden': ! open}" class="hidden md:hidden">
        <div class="sm:hidden pt-2 pb-3 space-y-1">
            @role('client')
            <x-responsive-nav-link :href="route('home')" :active="request()->routeIs('home')">
                {{ __('pages/names.home') }}
            </x-responsive-nav-link>
            <x-responsive-nav-link :href="route('orders')" :active="request()->routeIs('orders')">
                {{ __('pages/names.orders') }}
            </x-responsive-nav-link>
            @endrole
            @role('seller')
            <x-responsive-nav-link :href="route('products')" :active="request()->routeIs('products')">
                {{ __('pages/names.products') }}
            </x-responsive-nav-link>
            <x-responsive-nav-link :href="route('sales')" :active="request()->routeIs('sales')">
                {{ __('pages/names.sales') }}
            </x-responsive-nav-link>
            @endrole
            @role('admin')
            <x-responsive-nav-link :href="route('users')" :active="request()->routeIs('users')">
                {{ __('pages/names.users') }}
            </x-responsive-nav-link>
            @endrole
        </div>

        <!-- Responsive Settings Options -->
        <div class="pt-4 pb-1 border-t border-gray-200">
            <div class="flex items-center px-4">
                <div class="flex-shrink-0">
                    <svg class="h-10 w-10 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>

                <div class="ml-3">
                    <div class="font-medium text-base text-gray-800">{{ Auth::user()->name }}</div>
                    <div class="font-medium text-sm text-gray-500">{{ Auth::user()->email }}</div>
                </div>
            </div>

            <div class="mt-3 space-y-1">
                @unlessrole('seller')
                <x-responsive-nav-link href="{{route('become-a-seller')}}">
                    <div class="text-red-400 hover:text-red-600 transition-colors">
                        <p class="inline-block ">{{__('navigation.sell_products')}}</p>
                        <x-svg-o-light-bulb class="inline-block stroke-current w-6 h -6 -mt-1"/>
                    </div>
                </x-responsive-nav-link>
                @endunlessrole
                @unlessrole('admin')
                <x-responsive-nav-link href="{{route('request-admin')}}">
                    {{ __('navigation.request_admin') }}
                </x-responsive-nav-link>
                @endunlessrole
                <!-- Authentication -->
                <form method="POST" action="{{ route('logout') }}">
                    @csrf

                    <x-responsive-nav-link :href="route('logout')"
                            onclick="event.preventDefault();
                                        this.closest('form').submit();">
                        {{ __('Log out') }}
                    </x-responsive-nav-link>
                </form>
            </div>
        </div>
    </div>
</nav>
