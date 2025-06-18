<?php

namespace Modules\Lukisa\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Modules\Lukisa\Database\Factories\LukisaFactory;

class Lukisa extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [];

    // protected static function newFactory(): LukisaFactory
    // {
    //     // return LukisaFactory::new();
    // }
}
