<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserSettingsController extends Controller
{
    /**
     * Update user profile information
     */
    public function updateProfile(Request $request)
    {
        try {
            $user = $request->user();
            
            $validated = $request->validate([
                'nom' => 'required|string|max:255',
                'prenom' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email,' . $user->id_utilisateur . ',id_utilisateur',
                'tel' => 'required|string|max:20',
            ]);

            $user->update([
                'nom' => $validated['nom'],
                'prenom' => $validated['prenom'],
                'email' => $validated['email'],
                'tel' => $validated['tel'],
            ]);

            \Log::info('Profile updated', ['user_id' => $user->id_utilisateur]);

            return response()->json([
                'message' => 'Profile updated successfully',
                'user' => [
                    'id' => $user->id_utilisateur,
                    'nom' => $user->nom,
                    'prenom' => $user->prenom,
                    'email' => $user->email,
                    'tel' => $user->tel,
                    'role' => $user->role,
                    'profile_picture' => $user->profile_picture,
                    'id_groupe' => $user->id_groupe,
                    'id_sessionexamen' => $user->id_sessionexamen,
                ],
            ], 200);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Profile update error', [
                'message' => $e->getMessage(),
                'user_id' => $request->user()->id_utilisateur ?? null
            ]);
            
            return response()->json([
                'message' => 'Failed to update profile',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update user password
     */
    public function updatePassword(Request $request)
    {
        try {
            $user = $request->user();
            
            $validated = $request->validate([
                'current_password' => 'required|string',
                'new_password' => 'required|string|min:6',
                'new_password_confirmation' => 'required|same:new_password',
            ]);

            // Check if current password is correct
            if (!Hash::check($validated['current_password'], $user->motdepasse)) {
                return response()->json([
                    'message' => 'Validation failed',
                    'errors' => [
                        'current_password' => ['The current password is incorrect.']
                    ]
                ], 422);
            }

            // Update password
            $user->update([
                'motdepasse' => Hash::make($validated['new_password'])
            ]);

            \Log::info('Password updated', ['user_id' => $user->id_utilisateur]);

            return response()->json([
                'message' => 'Password updated successfully'
            ], 200);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Password update error', [
                'message' => $e->getMessage(),
                'user_id' => $request->user()->id_utilisateur ?? null
            ]);
            
            return response()->json([
                'message' => 'Failed to update password',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Upload profile picture
     */
    public function uploadProfilePicture(Request $request)
    {
        try {
            $user = $request->user();
            
            $request->validate([
                'profile_picture' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // 2MB max
            ]);

            if ($request->hasFile('profile_picture')) {
                $image = $request->file('profile_picture');
                $imageName = 'profile_' . $user->id_utilisateur . '_' . time() . '.' . $image->getClientOriginalExtension();
                
                // Store in public/storage/profiles directory
                $path = $image->storeAs('profiles', $imageName, 'public');

                // Update user's profile picture path
                $user->update([
                    'profile_picture' => $path
                ]);
                
                // Refresh user data
                $user->refresh();

                return response()->json([
                    'message' => 'Profile picture uploaded successfully',
                    'profile_picture_url' => asset('storage/' . $path),
                    'user' => [
                        'id' => $user->id_utilisateur,
                        'nom' => $user->nom,
                        'prenom' => $user->prenom,
                        'email' => $user->email,
                        'tel' => $user->tel,
                        'role' => $user->role,
                        'profile_picture' => $user->profile_picture,
                        'id_groupe' => $user->id_groupe,
                        'id_sessionexamen' => $user->id_sessionexamen,
                    ],
                ], 200);
            }

            return response()->json([
                'message' => 'No file uploaded'
            ], 400);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Profile picture upload error', [
                'message' => $e->getMessage(),
                'user_id' => $request->user()->id_utilisateur ?? null
            ]);
            
            return response()->json([
                'message' => 'Failed to upload profile picture',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}