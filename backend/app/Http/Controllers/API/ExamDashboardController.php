<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Examen;
use App\Models\Module;
use Carbon\Carbon;

class ExamDashboardController extends Controller
{
    /**
     * Get all exam types
     */
    public function getExamTypes()
    {
        $types = [
            ['id' => 1, 'name' => 'Controle continue'],
            ['id' => 2, 'name' => 'Examen'],
            ['id' => 3, 'name' => 'Test Tp'],
            ['id' => 4, 'name' => 'Examen de remplacement'],
            ['id' => 5, 'name' => 'Rattrapage']
        ];

        return response()->json($types);
    }

    /**
     * Get teacher's exams
     */
    public function getTeacherExams()
    {
        $user = Auth::user();
        
        if ($user->role !== 'enseignant') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Get all exams and format them
        $exams = Examen::with(['module', 'salle'])
            ->orderBy('date', 'asc')
            ->get()
            ->map(function($exam) {
                return [
                    'id' => $exam->id_examen,
                    'subject' => $exam->module->nom_module ?? 'UX',
                    'date' => Carbon::parse($exam->date)->format('d M Y'),
                    'status' => $exam->type,
                    'code' => 'S204',
                    'heure_debut' => $exam->heure_debut,
                    'heure_fin' => $exam->heure_fin,
                    'salle' => $exam->salle ? 'Salle ' . $exam->salle->num_salle : 'Non assignée',
                    'color' => $this->getExamColor($exam->type)
                ];
            });

        return response()->json($exams);
    }

    /**
     * Get exams by type
     */
    public function getExamsByType($type)
    {
        $user = Auth::user();
        
        if ($user->role !== 'enseignant') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $exams = Examen::where('type', $type)
            ->with(['module', 'salle'])
            ->orderBy('date', 'asc')
            ->get()
            ->map(function($exam) {
                return [
                    'id' => $exam->id_examen,
                    'subject' => $exam->module->nom_module ?? 'UX',
                    'date' => Carbon::parse($exam->date)->format('d M Y'),
                    'status' => $exam->type,
                    'code' => 'S204',
                    'heure_debut' => $exam->heure_debut,
                    'heure_fin' => $exam->heure_fin,
                    'salle' => $exam->salle ? 'Salle ' . $exam->salle->num_salle : 'Non assignée',
                    'color' => $this->getExamColor($exam->type)
                ];
            });

        return response()->json($exams);
    }

    /**
     * Get upcoming exams (next 30 days)
     */
    public function getUpcomingExams()
    {
        $user = Auth::user();
        
        if ($user->role !== 'enseignant') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $now = Carbon::now();
        $thirtyDaysLater = Carbon::now()->addDays(30);

        $exams = Examen::whereBetween('date', [$now, $thirtyDaysLater])
            ->with(['module', 'salle'])
            ->orderBy('date', 'asc')
            ->get()
            ->map(function($exam) {
                return [
                    'id' => $exam->id_examen,
                    'subject' => $exam->module->nom_module ?? 'UX',
                    'date' => Carbon::parse($exam->date)->format('d M Y'),
                    'status' => $exam->type,
                    'code' => 'S204',
                    'heure_debut' => $exam->heure_debut,
                    'heure_fin' => $exam->heure_fin,
                    'salle' => $exam->salle ? 'Salle ' . $exam->salle->num_salle : 'Non assignée',
                    'color' => $this->getExamColor($exam->type)
                ];
            });

        return response()->json($exams);
    }

    /**
     * Create a new exam
     */
    public function createExam(Request $request)
    {
        $user = Auth::user();
        
        if ($user->role !== 'enseignant') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $request->validate([
            'type' => 'required|string',
            'date' => 'required|date',
            'heure_debut' => 'required',
            'heure_fin' => 'required',
            'id_salle' => 'nullable|exists:salle,id_salle'
        ]);

        $exam = Examen::create($request->all());
        $exam->load(['module', 'salle']);

        return response()->json([
            'message' => 'Examen créé avec succès',
            'exam' => $exam
        ], 201);
    }

    /**
     * Update an exam
     */
    public function updateExam(Request $request, $id)
    {
        $user = Auth::user();
        
        if ($user->role !== 'enseignant') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $exam = Examen::findOrFail($id);

        $request->validate([
            'type' => 'sometimes|string',
            'date' => 'sometimes|date',
            'heure_debut' => 'sometimes',
            'heure_fin' => 'sometimes',
            'id_salle' => 'nullable|exists:salle,id_salle'
        ]);

        $exam->update($request->all());
        $exam->load(['module', 'salle']);

        return response()->json([
            'message' => 'Examen mis à jour avec succès',
            'exam' => $exam
        ]);
    }

    /**
     * Delete an exam
     */
    public function deleteExam($id)
    {
        $user = Auth::user();
        
        if ($user->role !== 'enseignant') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $exam = Examen::findOrFail($id);
        $exam->delete();

        return response()->json([
            'message' => 'Examen supprimé avec succès'
        ]);
    }

    /**
     * Helper function to assign colors to exam types
     */
    private function getExamColor($type)
    {
        $colors = [
            'Controle continue' => 'bg-blue-500',
            'Examen' => 'bg-purple-500',
            'Test Tp' => 'bg-gray-800',
            'Examen de remplacement' => 'bg-cyan-400',
            'Rattrapage' => 'bg-cyan-600'
        ];

        return $colors[$type] ?? 'bg-gray-500';
    }
}