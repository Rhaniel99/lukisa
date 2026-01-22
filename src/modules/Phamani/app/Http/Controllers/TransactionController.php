<?php

namespace Modules\Phamani\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Phamani\DTOs\Transaction\StoreTransactionData;
use Modules\Phamani\Interfaces\Services\ITransactionService;

class TransactionController extends Controller
{
    public function __construct(
        protected ITransactionService $service
    ) {}

    public function index()
    {
        return inertia('Auth/Phamani/Transactions');;
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
    public function store(StoreTransactionData $r)
    {
        $this->service->create($r);
        return back()->with('success', 'Transação criada com sucesso!');
    }

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
