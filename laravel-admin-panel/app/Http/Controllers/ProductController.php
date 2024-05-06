<?php

namespace App\Http\Controllers;

use App\Helpers\ImageFileHelper;
use App\Models\Product;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Redirector;
use Intervention\Image\Facades\Image;

class ProductController extends Controller
{
    private static $STOCK_MAX = 100;
    private static $PRICE_MAX = 50000;

    public static function maxStock(): int
    {
        return self::$STOCK_MAX;
    }

    public static function maxPrice(): int
    {
        return self::$PRICE_MAX;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Application|Factory|View|Response
     */
    public function index(Request $request)
    {
        return view('home', [
            'products' => Product::search($request['search'])
                ->exceptOwnedBy($request->user())
                ->withStock()
                ->latest()
                ->with('owner')
                ->get(),
            'search' => $request['search']
        ]);
    }

    /**
     * Display a listing of the resource but only those
     * own by the current user.
     *
     * @return Application|Factory|View|Response
     */
    public function sellerIndex(Request $request)
    {
        $seller = $request->user()->sellerProfile;
        return view('products')
            ->with('products', $seller->products()
                ->latest('updated_at')
                ->get());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Application|Factory|View
     */
    public function create()
    {
        return view('create-product');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Application|Redirector|RedirectResponse
     */
    public function store(Request $request)
    {
        $attributes = $request->validate([
            'name' => 'required|max:255',
            'picture' => 'required|image|max:10240',
            'description' => 'required',
            'price' => 'required|numeric|gt:0|lte:'.self::$PRICE_MAX,
            'stock' => 'required|numeric|gt:0|lte:'.self::$STOCK_MAX,
        ]);


        $imageFile = $attributes['picture'];
        $attributes['picture'] = $this->imageToBase64($imageFile);
        $attributes['thumbnail'] = $this->thumbnail($imageFile);
        $request->user()->sellerProfile->products()->create($attributes);
        return redirect(route('products'));
    }

    private function imageToBase64($imageFile): string
    {
        $type = $imageFile->getMimeType();
        $picture = utf8_encode(base64_encode(file_get_contents($imageFile)));
        return "data:$type;base64,$picture";
    }

    private function thumbnail($imageFile): string
    {
        return Image::make($imageFile)
            ->resize(512, 512, function($constraint) {$constraint->aspectRatio();})
            ->encode('data-url', 80)
            ->getEncoded();
    }

    /**
     * Display the specified resource.
     *
     * @param Product $product
     * @return Application|Factory|View
     */
    public function show(Product $product)
    {
        if ($product->stock < 1){
            abort(404);
        }

        return view('product')
            ->with('product', $product);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Product $product
     * @return Application|Factory|View
     */
    public function edit(Product $product, Request $request)
    {
        if ($request->user()->cannot('updateAndDelete', $product)){
            abort(403);
        }

        return view('edit-product')
            ->with('product', $product);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Product $product
     * @return RedirectResponse
     */
    public function update(Request $request, Product $product)
    {
        if ($request->user()->cannot('updateAndDelete', $product)){
            abort(403);
        }

        $attributes = $request->validate([
            'name' => 'required|max:255',
            'picture' => 'nullable|image',
            'description' => 'required',
            'price' => 'required|numeric|gt:0',
            'stock' => 'required|numeric|gt:0'
        ]);

        if ($attributes['picture']??false){
            $imageFile = $attributes['picture'];
            $attributes['picture'] = ImageFileHelper::imageToBase64($imageFile);
            $attributes['thumbnail'] = ImageFileHelper::thumbnail($imageFile);
        }
        $product->update($attributes);
        return redirect(route('product', $product->id));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Product $product
     * @return Application|Redirector|RedirectResponse
     */
    public function destroy(Product $product, Request $request)
    {
        if ($request->user()->cannot('updateAndDelete', $product)){
            abort(403);
        }

        $product->delete();
        return redirect(route('products'));
    }
}
