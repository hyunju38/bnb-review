<?php

/**
 *
 */
class ProductsTest extends TestCase
{
    /**
     *  @test
     */
    public function testShow()
    {
        $response = $this->client->get('/products');
        $products = $this->getResponseArray($response)['data'];
        // var_dump($this->getResponseArray($response));

        $expected = [
            'id' => 'string',
            'type' => 'in:travel,news',
            'attributes' => [
                'page_id' => 'string',
                'position' => 'integer',
            ]
        ];

        // $this->assertValidArray($expected, $this->getResponseArray($response)['data'][0]);

        // $this->markTestInComplete('add expected return data.');
    }
}
