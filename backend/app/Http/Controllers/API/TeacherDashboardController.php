<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Module;
use App\Models\Groupe;

class TeacherDashboardController extends Controller
{
    /**
     * Get teacher profile information
     */
    public function getProfile()
    {
        $user = Auth::user();
        
        if ($user->role !== 'enseignant') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        return response()->json([
            'id' => $user->id_utilisateur,
            'nom' => $user->nom,
            'prenom' => $user->prenom,
            'email' => $user->email,
            'matricule' => $user->matricule,
            'departement' => $user->departement,
            'role' => $user->role,
            'profile_picture' => $user->profile_picture
        ]);
    }

    /**
     * Get all groups (niveaux) with their delegates
     */
    public function getNiveaux()
    {
        $niveaux = ['L1', 'L2', 'L3', 'M1', 'M2'];
        
        $niveauxData = [];
        
        foreach ($niveaux as $niveau) {
            // Get delegates (students with role 'delegue') for this niveau
            $delegues = User::where('role', 'delegue')
                ->select('id_utilisateur', 'nom', 'prenom')
                ->get()
                ->map(function($delegue) {
                    return [
                        'id' => $delegue->id_utilisateur,
                        'name' => $delegue->prenom . ' ' . $delegue->nom
                    ];
                });
            
            $niveauxData[] = [
                'niveau' => $niveau,
                'delegues' => $delegues
            ];
        }
        
        return response()->json($niveauxData);
    }

    /**
     * Get delegates for a specific niveau
     */
    public function getDeleguesByNiveau($niveau)
    {
        $delegues = User::where('role', 'delegue')
            ->select('id_utilisateur', 'nom', 'prenom', 'email')
            ->get()
            ->map(function($delegue) {
                return [
                    'id' => $delegue->id_utilisateur,
                    'name' => $delegue->prenom . ' ' . $delegue->nom,
                    'email' => $delegue->email
                ];
            });
        
        return response()->json($delegues);
    }

    /**
     * Get teacher's modules
     */
    public function getTeacherModules()
    {
        $user = Auth::user();
        
        // Get modules where teacher is assigned
        $modules = Module::select('id_module', 'nom_module')
            ->get();
        
        return response()->json($modules);
    }
}