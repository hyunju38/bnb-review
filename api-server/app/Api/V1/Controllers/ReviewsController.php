<?php

namespace App\Api\V1\Controllers;

use App\Api\V1\Models\Review;
use App\Api\V1\Transformers\ReviewTransformer;

use Illuminate\Http\Request;

class ReviewsController extends ApiController
{
    public function show()
    {
        $reviews = Review::all();
        return $this->response->collection($reviews, new ReviewTransformer);
    }

    public function store(Request $request)
    {
        $review = new Review;

        $review->_id = Review::max('_id') + 1;
        $review->comment = $request['comment'];
        $review->score = intVal($request['score']);
        $review->user_id = intVal($request['user_id']);

        $review->save();

        return [
            'status' => 201,
            'messages' => 'POST request success',
            'updatedData' => $review
        ];
    }

    public function update(Request $request, $id)
    {
        $review = Review::find(intval($id));
        $review->comment = $request['comment'];
        $review->score = intVal($request['score']);
        $review->save();

        return [
            'status' => 202,
            'messages' => 'PUT request success',
            'updatedData' => $review
        ];
    }

    public function destroy(Request $request, $id)
    {
        $review = Review::find(intval($id));
        $review->delete();

        return [
            'status' => 203,
            'messages' => 'DELETE success'
        ];
    }
}
