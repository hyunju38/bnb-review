<?php

use Laravel\Lumen\Testing\DatabaseTransactions;

class ProductsTest extends TestCase
{
    /**
     * Test show method of ProductsController
     *
     * @return void
     */
    public function testShow()
    {
        // returns JSON structure
        $this->get('/products')
            ->seeJsonStructure([
                [
                    'name',
                    'desc',
                    'reviews' => [
                        [
                            '_id',
                            'comment',
                            'score'
                        ]
                    ]
                ]
            ]);
    }
}
