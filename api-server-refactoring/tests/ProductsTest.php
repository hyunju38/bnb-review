<?php

use Laravel\Lumen\Testing\DatabaseTransactions;

class ProductsTest extends TestCase
{
    /**
     * GET /products test
     *
     * @return void
     */
    public function testShow()
    {
        $this->get('/products')
            ->seeJson([
                'total' => 50,
                'per_page' => 5
            ])
            ->seeJsonStructure([
                'total',
                'data' => [
                    [
                        'name',
                        'desc'
                    ]
                ]
            ]);
    }
}
