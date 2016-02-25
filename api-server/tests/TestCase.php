<?php

use Lukasoppermann\Httpstatus\Httpstatuscodes;
// use Lukasoppermann\Testing\TestTrait;

use PHPUnit_Framework_Assert as Assertion;
use Illuminate\Support\Facades\Validator;

class TestCase extends Laravel\Lumen\Testing\TestCase implements Httpstatuscodes
{
    use TestTrait;

    protected $client;

    public function setUp()
    {
        parent::setUp();

        $this->client = new GuzzleHttp\Client([
            'base_uri' => 'http://api.com',
            'exceptions' => false
        ]);
    }

    /**
     * Creates the application.
     *
     * @return \Laravel\Lumen\Application
     */
    public function createApplication()
    {
        return require __DIR__.'/../bootstrap/app.php';
    }

    /**
     *  Convert API response to array
     *
     *  @return array
     */
    public function getResponseArray($response)
    {
        return json_decode($response->getBody()->getContents(), true);
    }
}
