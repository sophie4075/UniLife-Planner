<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Kurs extends Model
{
    use HasFactory;


    protected $fillable = ['user_id', 'name', 'description', 'status', 'exam_date', 'image_path' ];



    public function to_dos(): HasMany
    {
        return $this->hasMany(ToDo::class, 'kurs_id', 'id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

}
