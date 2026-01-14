<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Semester;
use Illuminate\Http\Request;

class SemesterController extends Controller
{
    /**
     * Get all semesters
     */
    public function index()
    {
        $semesters = Semester::orderBy('annee_universitaire', 'desc')
                            ->orderBy('numero_semester', 'desc')
                            ->get();
        
        return response()->json($semesters);
    }

    /**
     * Get active semester
     */
    public function getActive()
    {
        $semester = Semester::where('est_actif', true)->first();
        
        if (!$semester) {
            return response()->json([
                'message' => 'No active semester found'
            ], 404);
        }
        
        return response()->json($semester);
    }

    /**
     * Get single semester
     */
    public function show($id)
    {
        $semester = Semester::with(['modules', 'groupes'])->findOrFail($id);
        return response()->json($semester);
    }

    /**
     * Create semester
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'numero_semester' => 'required|integer|min:1',
            'annee_universitaire' => 'required|string',
            'est_actif' => 'boolean'
        ]);

        // If setting as active, deactivate all other semesters
        if ($validated['est_actif'] ?? false) {
            Semester::where('est_actif', true)->update(['est_actif' => false]);
        }

        $semester = Semester::create($validated);
        
        return response()->json([
            'message' => 'Semester created successfully',
            'semester' => $semester
        ], 201);
    }

    /**
     * Update semester
     */
    public function update(Request $request, $id)
    {
        $semester = Semester::findOrFail($id);
        
        $validated = $request->validate([
            'numero_semester' => 'sometimes|integer|min:1',
            'annee_universitaire' => 'sometimes|string',
            'est_actif' => 'boolean'
        ]);

        // If setting as active, deactivate all other semesters
        if (($validated['est_actif'] ?? false) && !$semester->est_actif) {
            Semester::where('est_actif', true)->update(['est_actif' => false]);
        }

        $semester->update($validated);
        
        return response()->json([
            'message' => 'Semester updated successfully',
            'semester' => $semester
        ]);
    }

    /**
     * Delete semester
     */
    public function destroy($id)
    {
        $semester = Semester::findOrFail($id);
        
        // Check if semester has associated modules or groupes
        if ($semester->modules()->count() > 0 || $semester->groupes()->count() > 0) {
            return response()->json([
                'message' => 'Cannot delete semester with associated modules or groupes'
            ], 422);
        }
        
        $semester->delete();
        
        return response()->json([
            'message' => 'Semester deleted successfully'
        ]);
    }

    /**
     * Set semester as active
     */
    public function setActive($id)
    {
        // Deactivate all semesters
        Semester::where('est_actif', true)->update(['est_actif' => false]);
        
        // Activate the selected semester
        $semester = Semester::findOrFail($id);
        $semester->update(['est_actif' => true]);
        
        return response()->json([
            'message' => 'Semester activated successfully',
            'semester' => $semester
        ]);
    }
}