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
        $this->json('GET', '/products', [ 'page' => 1, 'keyword' => '' ])
            ->seeJsonStructure([
                'data' => [
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
                ],
                'paginate'
            ]);
    }
}
