<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;
use Inertia\Inertia;

class PostController extends Controller
{
    public function create(): Response {
        if(!Auth::check()){
            abort(403);
        }
        return Inertia::render('Posts/Create'); 
    }

    public function store(Request $request) {
        if(!Auth::check()) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|string:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:png,jpg,jpeg,svg,gif|max:2048',
        ]);

        $post = new Post();
        $post->title = $validated['title'];
        $post->description = $validated['description'];
        $post->user_id = Auth::id();

        if($request->hasFile('image')) {
            $path = $request->file('image')->store('posts', 'public');
            $post->image = $path;
        }

        $post->save();

        return redirect()->route('dashboard')->with('sucess', 'Post crée avec succès');
    }

    public function show(Post $post): Response {
        return Inertia::render('Posts/Show', [
            'post' => $post->load('author')
        ]);
    }

    public function edit(Post $post): Response {
        return Inertia::render('Posts/Edit', [
            'post' => $post->load('author')
        ]);
    }

}
