<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StudentDashboardController extends Controller
{
    /**
     * Get dashboard data for student
     */
    public function getDashboardData(Request $request)
    {
        try {
            $user = $request->user();
            
            if (!$user || $user->role !== 'Étudiant') {
                return response()->json([
                    'message' => 'Access denied. Student role required.'
                ], 403);
            }

            // Get upcoming exams
            $exams = $this->getUpcomingExams($user);
            
            // Get modules for the student's group
            $modules = $this->getModules($user);
            
            // Get teachers who teach modules for this student's group
            $teachers = $this->getTeachers($user);

            return response()->json([
                'exams' => $exams,
                'teachers' => $teachers,
                'modules' => $modules,
                'student_info' => [
                    'nom' => $user->nom,
                    'prenom' => $user->prenom,
                    'groupe' => $user->id_groupe,
                ]
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Dashboard data error', [
                'message' => $e->getMessage(),
                'user_id' => $request->user()->id_utilisateur ?? null,
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'message' => 'Failed to fetch dashboard data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get upcoming exams for student
     */
    private function getUpcomingExams($user)
    {
        if (!$user->id_groupe) {
            return [];
        }

        $exams = DB::table('examen')
            ->join('sessionexamen', 'examen.id_examen', '=', 'sessionexamen.id_examen')
            ->leftJoin('module', 'examen.id_examen', '=', 'module.id_examen')
            ->leftJoin('salle', 'examen.id_salle', '=', 'salle.id_salle')
            ->where('sessionexamen.id_groupe', $user->id_groupe)
            ->where('examen.date', '>=', now()->toDateString())
            ->select(
                'examen.id_examen',
                'module.nom_module as subject',
                'module.id_module',
                'examen.type as status',
                'examen.date',
                'examen.heure_debut',
                'examen.heure_fin',
                'salle.num_salle as code'
            )
            ->orderBy('examen.date', 'asc')
            ->limit(10)
            ->get();

        return $exams->map(function($exam) {
            return [
                'id' => $exam->id_examen,
                'subject' => $exam->subject ?? 'Unknown',
                'module_id' => $exam->id_module,
                'date' => date('d M Y', strtotime($exam->date)),
                'status' => $exam->status,
                'code' => $exam->code ? 'S' . $exam->code : 'TBA',
                'color' => $this->getRandomColor(),
                'time' => substr($exam->heure_debut, 0, 5) . ' - ' . substr($exam->heure_fin, 0, 5)
            ];
        });
    }

    /**
     * Get teachers who teach modules for student's group
     */
    private function getTeachers($user)
    {
        if (!$user->id_groupe) {
            return [];
        }

        // Get module IDs for this student's group
        $moduleIds = DB::table('module')
            ->join('examen', 'module.id_examen', '=', 'examen.id_examen')
            ->join('sessionexamen', 'examen.id_examen', '=', 'sessionexamen.id_examen')
            ->where('sessionexamen.id_groupe', $user->id_groupe)
            ->distinct()
            ->pluck('module.id_module');

        // Get teachers who teach these modules
        $teachers = User::where('role', 'Enseignant')
            ->whereIn('id_module', $moduleIds)
            ->select(
                'id_utilisateur',
                'nom',
                'prenom',
                'email',
                'tel',
                'profile_picture',
                'id_module'
            )
            ->get();

        return $teachers->map(function($teacher) {
            return [
                'id' => $teacher->id_utilisateur,
                'name' => $teacher->prenom . ' ' . $teacher->nom,
                'email' => $teacher->email,
                'phone' => $teacher->tel,
                'module_id' => $teacher->id_module,
                'profile_picture' => $teacher->profile_picture && $teacher->profile_picture !== 'user.png'
                    ? asset('storage/' . $teacher->profile_picture)
                    : null
            ];
        });
    }

    /**
     * Get modules for student's group
     */
    private function getModules($user)
    {
        if (!$user->id_groupe) {
            return [];
        }

        $modules = DB::table('module')
            ->join('examen', 'module.id_examen', '=', 'examen.id_examen')
            ->join('sessionexamen', 'examen.id_examen', '=', 'sessionexamen.id_examen')
            ->where('sessionexamen.id_groupe', $user->id_groupe)
            ->select('module.id_module', 'module.nom_module')
            ->distinct()
            ->get();

        return $modules->map(function($module) {
            return [
                'id' => $module->id_module,
                'name' => $module->nom_module
            ];
        });
    }

    /**
     * Get exams filtered by module
     */
    public function getExamsByModule(Request $request, $moduleId)
    {
        try {
            $user = $request->user();
            
            if (!$user || $user->role !== 'Étudiant' || !$user->id_groupe) {
                return response()->json([
                    'message' => 'Access denied'
                ], 403);
            }

            $exams = DB::table('examen')
                ->join('sessionexamen', 'examen.id_examen', '=', 'sessionexamen.id_examen')
                ->join('module', 'examen.id_examen', '=', 'module.id_examen')
                ->leftJoin('salle', 'examen.id_salle', '=', 'salle.id_salle')
                ->where('sessionexamen.id_groupe', $user->id_groupe)
                ->where('module.id_module', $moduleId)
                ->where('examen.date', '>=', now()->toDateString())
                ->select(
                    'examen.id_examen',
                    'module.nom_module as subject',
                    'module.id_module',
                    'examen.type as status',
                    'examen.date',
                    'examen.heure_debut',
                    'examen.heure_fin',
                    'salle.num_salle as code'
                )
                ->orderBy('examen.date', 'asc')
                ->get();

            $transformedExams = $exams->map(function($exam) {
                return [
                    'id' => $exam->id_examen,
                    'subject' => $exam->subject,
                    'module_id' => $exam->id_module,
                    'date' => date('d M Y', strtotime($exam->date)),
                    'status' => $exam->status,
                    'code' => $exam->code ? 'S' . $exam->code : 'TBA',
                    'color' => $this->getRandomColor(),
                    'time' => substr($exam->heure_debut, 0, 5) . ' - ' . substr($exam->heure_fin, 0, 5)
                ];
            });

            return response()->json([
                'exams' => $transformedExams
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Get exams by module error', [
                'message' => $e->getMessage(),
                'module_id' => $moduleId
            ]);
            
            return response()->json([
                'message' => 'Failed to fetch exams',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get teachers filtered by module
     */
    public function getTeachersByModule(Request $request, $moduleId)
    {
        try {
            $user = $request->user();
            
            if (!$user || $user->role !== 'Étudiant') {
                return response()->json([
                    'message' => 'Access denied'
                ], 403);
            }

            $teachers = User::where('role', 'Enseignant')
                ->where('id_module', $moduleId)
                ->select(
                    'id_utilisateur',
                    'nom',
                    'prenom',
                    'email',
                    'tel',
                    'profile_picture',
                    'id_module'
                )
                ->get();

            $transformedTeachers = $teachers->map(function($teacher) {
                return [
                    'id' => $teacher->id_utilisateur,
                    'name' => $teacher->prenom . ' ' . $teacher->nom,
                    'email' => $teacher->email,
                    'phone' => $teacher->tel,
                    'module_id' => $teacher->id_module,
                    'profile_picture' => $teacher->profile_picture && $teacher->profile_picture !== 'user.png'
                        ? asset('storage/' . $teacher->profile_picture)
                        : null
                ];
            });

            return response()->json([
                'teachers' => $transformedTeachers
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Get teachers by module error', [
                'message' => $e->getMessage(),
                'module_id' => $moduleId
            ]);
            
            return response()->json([
                'message' => 'Failed to fetch teachers',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Generate random color for exam cards
     */
    private function getRandomColor()
    {
        $colors = [
            'bg-blue-500',
            'bg-purple-500',
            'bg-gray-800',
            'bg-cyan-400',
            'bg-green-500',
            'bg-red-500',
            'bg-yellow-500',
            'bg-pink-500',
        ];
        
        return $colors[array_rand($colors)];
    }
}