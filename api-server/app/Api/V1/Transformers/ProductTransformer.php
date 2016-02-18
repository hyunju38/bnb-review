<?php

namespace App\Api\V1\Transformers;

use League\Fractal\TransformerAbstract;
// use Dingo\Api\Http\Request;
// use Dingo\Api\Transformer\Binding;
// use Dingo\Api\Contract\Transformer\Adapter;

use App\Api\V1\Models\Product;

class ProductTransformer extends TransformerAbstract
{
    public function transform(Product $product)
    {
        return $product;
        // return [
        //     'id' => $product->_id,
        //     'name' => utf8_decode($product->name),
        //     'desc' => $product->desc,
        //     'reviews' => $product->reviews
        // ];
    }
}
