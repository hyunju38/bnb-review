<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    // tables below will be:
    // 1. truncated / deleted
    // 2. seeded
    protected $tables = [
        'collections',
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        // DB::table('collections')->delete();
        // $this->call('CollectionsTableSeeder');

        // // $this->call('UserTableSeeder');
        foreach ($this->tables as $table) {
            // empty table
            DB::table($table)->delete();
            // seed table
            // $this->call(ucfirst($table) . 'TableSeeder');
            $this->call(CollectionsTableSeeder::class);
        }

        Model::reguard();
    }
}
