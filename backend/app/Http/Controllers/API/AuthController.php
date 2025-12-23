<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
{
    try {
        \Log::info('Registration attempt', ['data' => $request->all()]);
        
        // Custom validation messages
        $validator = \Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'tel' => 'required|string|max:20',
            'email' => 'required|string|email|max:255|unique:users,email',
            'motdepasse' => 'required|string|min:6',
            'motdepasse_confirmation' => 'required|same:motdepasse',
            'role' => 'required|string|in:Chef,Responsable,Enseignant,Étudiant',
            'id_sessionexamen' => 'nullable',
            'id_groupe' => 'nullable',
        ]);

        if ($validator->fails()) {
            \Log::error('Validation failed', ['errors' => $validator->errors()]);
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $validated = $validator->validated();

        // Create user
        $user = User::create([
            'nom' => $validated['nom'],
            'prenom' => $validated['prenom'],
            'tel' => $validated['tel'],
            'email' => $validated['email'],
            'motdepasse' => $validated['motdepasse'],
            'role' => $validated['role'],
            'id_sessionexamen' => $validated['id_sessionexamen'] ?? null,
            'id_groupe' => $validated['id_groupe'] ?? null,
        ]);

        \Log::info('User created successfully', ['user_id' => $user->id_utilisateur]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Registration successful',
            'user' => [
                'id' => $user->id_utilisateur,
                'nom' => $user->nom,
                'prenom' => $user->prenom,
                'email' => $user->email,
                'tel' => $user->tel,
                'profile_picture' => $user->profile_picture,
                'role' => $user->role,
            ],
            'token' => $token,
        ], 201);

   } catch (\Exception $e) {
    \Log::error('Registration error', [
        'message' => $e->getMessage(),
        'line' => $e->getLine(),
        'file' => $e->getFile(),
    ]);
    
    return response()->json([
        'message' => 'Registration failed',
        'error' => $e->getMessage(),           
        'line' => $e->getLine(),               
        'file' => basename($e->getFile()),     
        'trace' => $e->getTraceAsString()      
    ], 500);
}
}
    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'motdepasse' => 'required',
            ]);

            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->motdepasse, $user->motdepasse)) {
                return response()->json([
                    'message' => 'Invalid credentials',
                    'errors' => ['email' => ['The provided credentials are incorrect.']]
                ], 422);
            }

            // Delete old tokens
            $user->tokens()->delete();

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Login successful',
                'user' => [
                    'id' => $user->id_utilisateur,
                    'nom' => $user->nom,
                    'prenom' => $user->prenom,
                    'email' => $user->email,
                    'tel' => $user->tel,
                    'role' => $user->role,
                ],
                'token' => $token,
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Login failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout successful',
        ], 200);
    }

    public function user(Request $request)
    {
        $user = $request->user();
        
        return response()->json([
            'user' => [
                'id' => $user->id_utilisateur,
                'nom' => $user->nom,
                'prenom' => $user->prenom,
                'email' => $user->email,
                'tel' => $user->tel,
                'role' => $user->role,
            ],
        ], 200);
    }
}
