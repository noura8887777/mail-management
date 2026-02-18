<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CourrierController;
use App\Http\Controllers\StatutController;
use App\Http\Controllers\AffectationControler;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Routes protégées par Sanctum
|
*/ Route::prefix('courriers')->group(function () {
    Route::get('/', [CourrierController::class, 'index']);
    Route::get('/create', [CourrierController::class, 'create']);
    Route::post('/', [CourrierController::class, 'store']);
    Route::get('/{id}', [CourrierController::class, 'show']);
    Route::put('/{id}/update', [CourrierController::class, 'update']);
    Route::delete('/{id}', [CourrierController::class, 'destroy']);
    Route::get('/{id}/edit', [CourrierController::class, 'edit']);
    Route::get('/{id}/fichier', [CourrierController::class, 'showFile']);
    Route::post('/{courrier}/reponse', [CourrierController::class, 'storeReponse']);
    Route::get('/{courrier}/reponses', [CourrierController::class, 'getReponses']);
    Route::post('/{id}/envoye-email', [CourrierController::class, 'envoyeEmail']);
    Route::get('/{id}/editReponse', [CourrierController::class, 'editReponse']);
    Route::put('/{id}/updateReponse', [CourrierController::class, 'updateReponse']);

});
Route::prefix('affectations')->group(function() {
    Route::get('/create', [AffectationControler::class, 'create']);
    Route::post('/', [AffectationControler::class, 'store']);
    Route::delete('/{id}', [AffectationControler::class, 'destroy']);
});
Route::prefix('statuts')->group(function() {
    Route::get('/', [StatutController::class, 'index']);
    Route::post('/', [StatutController::class, 'store']);
    Route::get('/{id}', [StatutController::class, 'show']);
    Route::put('/{id}', [StatutController::class, 'update']);
    Route::delete('/{id}', [StatutController::class, 'destroy']);
    Route::get('/{id}/edit', [StatutController::class, 'edit']);
});
