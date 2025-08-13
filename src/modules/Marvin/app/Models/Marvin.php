<?php

namespace Modules\Marvin\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Modules\Marvin\Database\Factories\MarvinFactory;

class Marvin extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [];

    // protected static function newFactory(): MarvinFactory
    // {
    //     // return MarvinFactory::new();
    // }
}
