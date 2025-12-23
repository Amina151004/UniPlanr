<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // Get all users
    public function index()
    {
        $users = User::with(['groupe', 'sessionExamen'])->get();
        return response()->json($users);
    }

    // Get single user
    public function show($id)
    {
        $user = User::with(['groupe', 'sessionExamen'])->findOrFail($id);
        return response()->json($user);
    }


    // Update user
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->update($request->all());
        return response()->json($user);
    }

    // Delete user
    public function destroy($id)
    {
        User::destroy($id);
        return response()->json(['message' => 'User deleted']);
    }
}