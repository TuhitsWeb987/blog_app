<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [
        'usersPost' => Auth::user()->posts()->with('author')->latest()->get()
    ]);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
