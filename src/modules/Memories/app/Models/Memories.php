<?php

namespace Modules\Memories\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Modules\Memories\Database\Factories\MemoriesFactory;

class Memories extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [];

    // protected static function newFactory(): MemoriesFactory
    // {
    //     // return MemoriesFactory::new();
    // }
}
