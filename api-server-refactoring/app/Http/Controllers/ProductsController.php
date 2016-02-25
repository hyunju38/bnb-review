<?php

namespace App\Http\Controllers;

use DB;
use App\Product;

class ProductsController extends Controller
{
    public function show()
    {
        $limit = 5;
        $products = Product::paginate($limit, ['name', 'desc']);
        return $products;
    }
}
