<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Salle;
use Illuminate\Http\Request;

class SalleController extends Controller
{
    // Get all salles
    public function index()
    {
        $salles = Salle::with(['examens', 'groupes'])->get();
        return response()->json($salles);
    }

    // Get single salle
    public function show($id)
    {
        $salle = Salle::with(['examens', 'groupes'])->findOrFail($id);
        return response()->json($salle);
    }

    // Create salle
    public function store(Request $request)
    {
        $validated = $request->validate([
            'type_salle' => 'required|string|max:255',
            'num_salle' => 'required|integer',
            'capacite' => 'required|integer',
            'id_examen' => 'nullable|exists:examen,id_examen',
            'id_groupe' => 'nullable|exists:groupe,id_groupe',
        ]);

        $salle = Salle::create($validated);
        return response()->json($salle, 201);
    }

    // Update salle
    public function update(Request $request, $id)
    {
        $salle = Salle::findOrFail($id);
        $salle->update($request->all());
        return response()->json($salle);
    }

    // Delete salle
    public function destroy($id)
    {
        Salle::destroy($id);
        return response()->json(['message' => 'Salle deleted']);
    }

    // Get available salles (not assigned)
    public function getAvailable()
    {
        $salles = Salle::whereNull('id_examen')->get();
        return response()->json($salles);
    }
}