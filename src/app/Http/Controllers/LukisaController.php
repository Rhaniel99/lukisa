<?php

namespace App\Http\Controllers;

class LukisaController extends Controller
{
    public function index()
    {
        return inertia('Auth/Lukisa/Index');
    }
}
