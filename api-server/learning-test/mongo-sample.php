<?php
    require '../vendor/autoload.php';

    // var_dump(phpversion("mongodb"));
    $client = new MongoDB\Client('mongodb://localhost:27017');
    $collection = $client->pensionreview->products;

    $cursor = $collection->find();
    foreach ($cursor as $document) {
        echo $document['name'];
    }
