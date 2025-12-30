<?php

namespace Modules\Phamani\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Modules\Phamani\Models\Account;
use Modules\Phamani\Models\Category;

class PhamaniController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth::id();


        return inertia('Auth/Phamani/Index', [
            'categories' => Category::query()
                ->whereNull('user_id') // defaults
                ->orWhere('user_id', $userId)
                ->orderBy('name')
                ->get(['id', 'name', 'type', 'color', 'icon']),

            'accounts' => Account::query()
                ->where('user_id', $userId)
                ->orderBy('name')
                ->get(['id', 'name', 'type']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('phamani::create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {}

    /**
     * Show the specified resource.
     */
    public function show($id)
    {
        return view('phamani::show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        return view('phamani::edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id) {}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id) {}
}
