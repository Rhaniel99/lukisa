<?php

namespace Modules\Phamani\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Modules\Phamani\Interfaces\Services\IAccountService;
use Modules\Phamani\Interfaces\Services\ICategoryService;
use Modules\Phamani\Interfaces\Services\IDashboardService;

class PhamaniController extends Controller
{
    public function __construct(
        protected ICategoryService $categoryService,
        protected IAccountService $accountService,
        protected IDashboardService $dashboardService,
    ) {}

    public function index(Request $request)
    {
        $userId = Auth::id();

        $period = $request->get('period', 'yearly');

        return inertia('Auth/Phamani/Index', [
            'kpis' => $this->dashboardService->kpis($userId),

            'cashFlow' => $this->dashboardService->cashFlow($userId, $period),

            'period' => $period,

            'categories' => Inertia::lazy(
                fn() =>
                $this->categoryService->listForUser($userId)
            ),
            'accounts' => Inertia::lazy(
                fn() =>
                $this->accountService->listForUser($userId)
            ),
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
