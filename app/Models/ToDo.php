<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ToDo extends Model
{
    use HasFactory;

    protected $fillable = ['kurs_id', 'name', 'description', 'due_date', 'status','priority', 'image_path'];

    public function kurs(): BelongsTo
    {
        return $this->belongsTo(Kurs::class, 'kurs_id');
    }
}
