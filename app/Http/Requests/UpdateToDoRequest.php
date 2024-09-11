<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateToDoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'kurs_id' => ['required', Rule::exists('kurs', 'id')],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['string', 'nullable'],
            'due_date' => ['required' ,'date'],
            'status' => ['required', Rule::in('pending','in_progress','completed', 'cancelled')],
            'priority' => ['required', Rule::in('low','medium','high')],
            'image' => ['nullable', 'image'],
        ];

    }
}
