<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\SessionExamen;
use Illuminate\Http\Request;

class SessionExamenController extends Controller
{
    // Get all sessions
    public function index()
    {
        $sessions = SessionExamen::with(['examen', 'groupe', 'utilisateur'])->get();
        return response()->json($sessions);
    }

    // Get single session
    public function show($id)
    {
        $session = SessionExamen::with(['examen', 'groupe', 'utilisateur'])->findOrFail($id);
        return response()->json($session);
    }

    // Create session
    public function store(Request $request)
    {
        $validated = $request->validate([
            'type_session' => 'required|string|max:255',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after_or_equal:date_debut',
            'id_examen' => 'nullable|exists:examen,id_examen',
            'id_groupe' => 'nullable|exists:groupe,id_groupe',
            'id_utilisateur' => 'nullable|exists:users,id_utilisateur',
        ]);

        $session = SessionExamen::create($validated);
        return response()->json($session, 201);
    }

    // Update session
    public function update(Request $request, $id)
    {
        $session = SessionExamen::findOrFail($id);
        
        $validated = $request->validate([
            'type_session' => 'sometimes|string|max:255',
            'date_debut' => 'sometimes|date',
            'date_fin' => 'sometimes|date',
            'id_examen' => 'nullable|exists:examen,id_examen',
            'id_groupe' => 'nullable|exists:groupe,id_groupe',
            'id_utilisateur' => 'nullable|exists:users,id_utilisateur',
        ]);
        
        $session->update($validated);
        return response()->json($session);
    }

    // Delete session
    public function destroy($id)
    {
        SessionExamen::destroy($id);
        return response()->json(['message' => 'Session deleted']);
    }

    // Get active sessions
    public function getActive()
    {
        $today = now()->toDateString();
        $sessions = SessionExamen::where('date_debut', '<=', $today)
            ->where('date_fin', '>=', $today)
            ->with(['examen', 'groupe'])
            ->get();
        return response()->json($sessions);
    }
}