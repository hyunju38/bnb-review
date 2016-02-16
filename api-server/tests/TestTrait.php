<?php

// namespace Lukasoppermann\Testing;

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
                if (array_key_exists($rule, $resourceData)) {
                    $this->validateArray($rule, $resourceData[$key]);
                }
            }
        }

        // run validator
        $validator = Validator::make($resourceData, $rules);
        // store errors
        foreach ($validator->messages()->toArray() as $error) {
            $this->errors[] = "\e1;31mx \033[0m" . $error[0];
        }
    }
}
