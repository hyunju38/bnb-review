<?php

use Laravel\Lumen\Testing\DatabaseTransactions;

class ReviewsTest extends TestCase
{
    public function testStore()
    {
        $data = [
            'comment' => 'something',
            'score' => 1,
            'user_id' => 1,
            'product_id' => 1
        ];

        $json = $this->json('POST', '/reviews', $data);
        $json->seeJsonStructure([
            'status',
            'data'
        ]);
        $json->seeJson([
            'status' => 'success'
        ]);
    }
}
