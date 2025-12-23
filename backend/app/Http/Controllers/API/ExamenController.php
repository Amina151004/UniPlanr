<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Examen;
use Illuminate\Http\Request;

class ExamenController extends Controller
{
    public function index()
    {
        $examens = Examen::with('salle')->get();
        return response()->json($examens);
    }

    public function show($id)
    {
        $examen = Examen::with('salle')->findOrFail($id);
        return response()->json($examen);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|string',
            'date' => 'required|date',
            'heure_debut' => 'required',
            'heure_fin' => 'required',
            'id_salle' => 'nullable|exists:salle,id_salle',
        ]);

        $examen = Examen::create($validated);
        return response()->json($examen, 201);
    }

    public function update(Request $request, $id)
    {
        $examen = Examen::findOrFail($id);
        $examen->update($request->all());
        return response()->json($examen);
    }

    public function destroy($id)
    {
        Examen::destroy($id);
        return response()->json(['message' => 'Exam deleted']);
    }

    // Get exams for a specific student
    public function getStudentExams($userId)
    {
        $user = User::with(['groupe.examens'])->findOrFail($userId);
        return response()->json($user->groupe->examens ?? []);
    }
}