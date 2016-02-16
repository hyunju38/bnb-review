<?php

use Lukasoppermann\Httpstatus\Httpstatuscodes;
// use Lukasoppermann\Testing\TestTrait;


use PHPUnit_Framework_Assert as Assertion;
use Illuminate\Support\Facades\Validator;

trait TestTrait
{
    /*
     *  Validation errors
     */
    private $errors = [];

    /*
     *  Validate an array against predefined rules.
     */
    protected function assertValidArray(array $rules, array $resourceData)
    {
        // validate rules
        $this->validateArray($rules, $resourceData);
        // log errors to console
        if (count($this->errors) >= 1) {
            Assertion::fail(implode(PHP_EOL, $this->errors));
        }
    }

    protected function validateArray($rules, $resourceData)
    {
        // set all rules to required
        foreach ($rules as $key => $rule) {
            // if the attribute has no children, validate it
            if (!is_array($rule)) {
                $rules[$key] = $rule . '|required';
            // if the attribute has children, do a sub-loop
            } else {
                $rules[$key] = 'required';
                if (array_key_exists($key, $resourceData)) {
                    $this->validateArray($rule, $resourceData[$key]);
                }
            }
        }

        // var_dump($rules);

        // run validator
        $validator = Validator::make($resourceData, $rules);
        // store errors
        foreach ($validator->messages()->toArray() as $error) {
            $this->errors[] = "\e1;31mx \033[0m" . $error[0];
        }
    }
}

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
