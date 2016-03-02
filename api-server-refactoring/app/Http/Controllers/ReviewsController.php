<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Review;

class ReviewsController extends Controller
{
    public function show()
    {
        return [ 'test' => 'test' ];
    }
    /**
     *
     */
    public function store(Request $request)
    {
        $input = $request->all();

        // Review::create($input);
        $review = new Review;
        $review->comment = $input['comment'];
        $review->score = $input['score'];
        $review->user_id = $input['user_id'];
        $review->product_id = $input['product_id'];
        $review->save();

        return [
            'status' => 'success',
            'data' => $review
        ];
    }
}
