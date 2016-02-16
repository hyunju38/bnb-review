<?php

/**
 *
 */
class CollectionTest extends TestCase
{
    /**
     *  @test
     */
    public function get_a_collection_by_name()
    {
        $response = $this->client->get('/collections/travel');
        // var_dump($this->getResponseArray($response));

        // $this->assertEquals(
        //     self::HTTP_OK,
        //     $response->getStatusCode()
        // );

        $expected = [
            'id' => 'string',
            'type' => 'in:travel,news',
            'attributes' => [
                'page_id' => 'string',
                'position' => 'integer',
            ]
        ];

        $this->assertValidArray($expected, $this->getResponseArray($response)['data'][0]);

        $this->markTestInComplete('add expected return data.');
    }
}
