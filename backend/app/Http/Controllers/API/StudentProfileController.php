<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StudentProfileController extends Controller
{
    /**
     * Get student profile with their exams
     */
    public function getProfile(Request $request)
    {
        try {
            $user = $request->user();
            
            \Log::info('Student profile request', [
                'user_id' => $user->id_utilisateur ?? 'null',
                'role' => $user->role ?? 'null'
            ]);
            
            if (!$user) {
                return response()->json([
                    'message' => 'User not authenticated'
                ], 401);
            }
            
            // Check if user is a student
            if ($user->role !== 'Étudiant') {
                return response()->json([
                    'message' => 'Access denied. Student role required.',
                    'user_role' => $user->role
                ], 403);
            }

            // Get student info with groupe
            $studentInfo = DB::table('users')
                ->leftJoin('groupe', 'users.id_groupe', '=', 'groupe.id_groupe')
                ->where('users.id_utilisateur', $user->id_utilisateur)
                ->select(
                    'users.id_utilisateur',
                    'users.nom',
                    'users.prenom',
                    'users.email',
                    'users.tel',
                    'users.role',
                    'groupe.niveau',
                    'groupe.num_groupe'
                )
                ->first();

            // Get student's exams
            $exams = [];
            
            if ($user->id_groupe) {
                $exams = DB::table('examen')
                    ->join('sessionexamen', 'examen.id_examen', '=', 'sessionexamen.id_examen')
                    ->leftJoin('module', 'examen.id_examen', '=', 'module.id_examen')
                    ->leftJoin('salle', 'examen.id_salle', '=', 'salle.id_salle')
                    ->where('sessionexamen.id_groupe', $user->id_groupe)
                    ->select(
                        'examen.id_examen',
                        'module.nom_module as subject',
                        'examen.type',
                        'examen.date',
                        'examen.heure_debut',
                        'examen.heure_fin',
                        'salle.num_salle as room',
                        'examen.sujet_file',
                        'examen.correction_file'
                    )
                    ->orderBy('examen.date', 'desc')
                    ->get();
            }

            // Get active semester
            $activeSemester = DB::table('semester')
                ->where('est_actif', true)
                ->select('id_semester', 'numero_semester', 'annee_universitaire', 'est_actif')
                ->first();

            return response()->json([
                'student' => $studentInfo,
                'exams' => $exams,
                'semester' => $activeSemester,
                'total_exams' => count($exams)
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Profile fetch error', [
                'message' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'message' => 'Failed to fetch profile',
                'error' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => basename($e->getFile())
            ], 500);
        }
    }

    /**
     * Get exam details with subject and correction files
     */
    public function getExamDetails($examId, Request $request)
    {
        try {
            $user = $request->user();

            // Check if student has access to this exam
            $hasAccess = DB::table('sessionexamen')
                ->where('id_examen', $examId)
                ->where('id_groupe', $user->id_groupe)
                ->exists();

            if (!$hasAccess) {
                return response()->json([
                    'message' => 'You do not have access to this exam'
                ], 403);
            }

            // Get exam details
            $exam = DB::table('examen')
                ->leftJoin('salle', 'examen.id_salle', '=', 'salle.id_salle')
                ->leftJoin('module', 'examen.id_examen', '=', 'module.id_examen')
                ->where('examen.id_examen', $examId)
                ->select(
                    'examen.*',
                    'module.nom_module',
                    'salle.num_salle',
                    'salle.type_salle',
                    'salle.capacite'
                )
                ->first();

            if (!$exam) {
                return response()->json([
                    'message' => 'Exam not found'
                ], 404);
            }

            return response()->json([
                'exam' => $exam
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch exam details',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all exams for a student's group
     */
    public function getGroupExams(Request $request)
    {
        try {
            $user = $request->user();

            if (!$user->id_groupe) {
                return response()->json([
                    'message' => 'Student is not assigned to a group',
                    'exams' => []
                ], 200);
            }

            $exams = DB::table('examen')
                ->join('sessionexamen', 'examen.id_examen', '=', 'sessionexamen.id_examen')
                ->leftJoin('module', 'examen.id_examen', '=', 'module.id_examen')
                ->leftJoin('salle', 'examen.id_salle', '=', 'salle.id_salle')
                ->where('sessionexamen.id_groupe', $user->id_groupe)
                ->select(
                    'examen.id_examen',
                    'module.nom_module as subject',
                    'examen.type',
                    'examen.date',
                    'examen.heure_debut',
                    'examen.heure_fin',
                    'salle.num_salle as room',
                    'sessionexamen.type_session'
                )
                ->orderBy('examen.date', 'desc')
                ->get();

            return response()->json([
                'exams' => $exams,
                'total' => $exams->count()
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch exams',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}