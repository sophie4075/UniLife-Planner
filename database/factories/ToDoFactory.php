<?php

namespace Database\Factories;

use App\Models\Kurs;
use App\Models\ToDo;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ToDo>
 */
class ToDoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [

            'name' => fake()->randomElement([
                'Complete Assignment',
                'Submit Final Project',
                'Prepare for Midterm Exam',
                'Work on Group Project',
                'Review Course Materials',
                'Finalize Presentation'
            ]),
            'description' => fake()->randomElement([
                'Complete the assigned task with a focus on attention to detail and meeting the specified requirements.',
                'Ensure that the project is submitted by the deadline and follows all guidelines provided in the brief.',
                'Work collaboratively with peers to achieve the desired outcomes of the assignment.',
                'Review and refine the project, making sure all key elements are addressed and any feedback has been incorporated.',
                'Prepare and finalize the assignment, ensuring that all deliverables are in line with the course objectives.',
                'Test and debug the project to ensure it meets all functionality and quality standards.',
                'Submit the final version of the project after performing a thorough quality check and review.'
            ]),
            'due_date' => fake()->dateTimeBetween('now', '+1 year'),
            'status' => fake()->randomElement(['pending','in_progress','completed','cancelled']),
            'priority' => fake()->randomElement(['low','medium','high']),
            'image_path' => null,
            'kurs_id' => Kurs::factory()

        ];
    }
}
