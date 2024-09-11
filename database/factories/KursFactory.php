<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Kurs>
 */
class KursFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => 1,
            'name' => fake()->randomElement([
                'Introduction to Multimedia Systems',
                'Advanced Web Development',
                'Digital Media Design',
                'Programming for Interactive Applications',
                'Introduction to Computer Graphics',
                'Human-Computer Interaction'
            ]),
            'description' => fake()->randomElement([
                'This course provides an in-depth understanding of the core concepts and practices within the field.',
                'An interactive and hands-on course designed to develop practical skills and theoretical knowledge.',
                'Students will explore both foundational theories and practical applications through various projects and assignments.',
                'This course emphasizes real-world applications, with a strong focus on project-based learning.',
                'A comprehensive introduction to the key concepts and techniques needed to succeed in this field.',
                'This course covers the fundamental principles and provides students with hands-on experience in applying them.',
                'Students will collaborate on group projects to apply the learned techniques in real-world scenarios.'
            ]),
            'exam_date' => fake()->dateTimeBetween('now', '+1 year'),
            'status' => fake()->randomElement(['attending','completed','pending']),
            'image_path' => null
        ];
    }
}
