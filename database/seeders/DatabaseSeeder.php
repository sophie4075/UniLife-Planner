<?php

namespace Database\Seeders;

use App\Models\Kurs;
use App\Models\ToDo;
use App\Models\User;
use Database\Factories\KursFactory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'TestUser',
            'email' => 'TestUser@test.com',
            'password' => bcrypt('.myTestUser#1'),
            'email_verified_at' => time()
        ]);

        // Erstelle 5 Kurse und jeweils 3 Todos pro Kurs
        Kurs::factory()->count(5)->create()->each(function ($kurs) {
            ToDo::factory()->count(3)->create(['kurs_id' => $kurs->id]);
        });


    }
}
