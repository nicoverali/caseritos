<div class="my-auto flex flex-col sm:justify-center items-center pt-6 sm:pt-0">

    <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
        @isset($logo)
            <div class="text-center mb-4">
                {{ $logo }}
            </div>
        @endisset

        {{ $slot }}
    </div>
</div>
