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
        $users = User::with(['groupe', 'sessionExamen', 'module'])->get();
        return response()->json($users);
    }

    // Get single user
    public function show($id)
    {
        $user = User::with(['groupe', 'sessionExamen', 'module'])->findOrFail($id);
        return response()->json($user);
    }

    // Update user
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        
        $validatedData = $request->validate([
            'nom' => 'sometimes|string|max:255',
            'prenom' => 'sometimes|string|max:255',
            'tel' => 'sometimes|string|max:20',
            'email' => 'sometimes|email|unique:users,email,' . $id . ',id_utilisateur',
            'role' => 'sometimes|string',
            'id_groupe' => 'sometimes|nullable|exists:groupe,id_groupe',
            'id_module' => 'sometimes|nullable|exists:module,id_module',
            'profile_picture' => 'sometimes|nullable|string',
        ]);
        
        $user->update($validatedData);
        
        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user->load(['groupe', 'sessionExamen', 'module'])
        ]);
    }

    // Delete user
    public function destroy($id)
    {
        User::destroy($id);
        return response()->json(['message' => 'User deleted']);
    }

    // Get users by role
    public function getUsersByRole($role)
    {
        $users = User::with(['groupe', 'sessionExamen', 'module'])
                     ->where('role', $role)
                     ->get();
        
        return response()->json($users);
    }

    // Get teachers by module
    public function getTeachersByModule($moduleId)
    {
        $teachers = User::with('module')
                        ->where('role', 'Enseignant')
                        ->where('id_module', $moduleId)
                        ->get();
        
        return response()->json(['teachers' => $teachers]);
    }
}