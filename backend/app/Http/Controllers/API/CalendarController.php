<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CalendarController extends Controller
{
    /**
     * Get calendar events for authenticated user
     */
    public function getEvents(Request $request)
    {
        try {
            $user = $request->user();
            
            if (!$user) {
                return response()->json([
                    'message' => 'User not authenticated'
                ], 401);
            }

            $events = [];

            // Get events based on user role
            switch ($user->role) {
                case 'Étudiant':
                    $events = $this->getStudentEvents($user);
                    break;
                    
                case 'Enseignant':
                    $events = $this->getTeacherEvents($user);
                    break;
                    
                case 'Chef':
                case 'Responsable':
                    $events = $this->getAllEvents();
                    break;
                    
                default:
                    $events = [];
            }

            return response()->json([
                'events' => $events,
                'total' => count($events)
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Calendar events error', [
                'message' => $e->getMessage(),
                'line' => $e->getLine()
            ]);
            
            return response()->json([
                'message' => 'Failed to fetch calendar events',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get events for a student
     */
    private function getStudentEvents($user)
    {
        if (!$user->id_groupe) {
            return [];
        }

        $exams = DB::table('examen')
            ->join('sessionexamen', 'examen.id_examen', '=', 'sessionexamen.id_examen')
            ->leftJoin('module', 'examen.id_examen', '=', 'module.id_examen')
            ->leftJoin('salle', 'examen.id_salle', '=', 'salle.id_salle')
            ->where('sessionexamen.id_groupe', $user->id_groupe)
            ->select(
                'examen.id_examen',
                'examen.type',
                'examen.date',
                'examen.heure_debut',
                'examen.heure_fin',
                'module.nom_module',
                'salle.num_salle'
            )
            ->get();

        return $this->transformExamsToEvents($exams);
    }

    /**
     * Get events for a teacher
     */
    private function getTeacherEvents($user)
    {
        // Get all exams for modules the teacher is responsible for
        // For now, return all exams (you can customize this based on your needs)
        $exams = DB::table('examen')
            ->leftJoin('module', 'examen.id_examen', '=', 'module.id_examen')
            ->leftJoin('salle', 'examen.id_salle', '=', 'salle.id_salle')
            ->select(
                'examen.id_examen',
                'examen.type',
                'examen.date',
                'examen.heure_debut',
                'examen.heure_fin',
                'module.nom_module',
                'salle.num_salle'
            )
            ->get();

        return $this->transformExamsToEvents($exams);
    }

    /**
     * Get all events (for admin/chef/responsable)
     */
    private function getAllEvents()
    {
        $exams = DB::table('examen')
            ->leftJoin('module', 'examen.id_examen', '=', 'module.id_examen')
            ->leftJoin('salle', 'examen.id_salle', '=', 'salle.id_salle')
            ->leftJoin('sessionexamen', 'examen.id_examen', '=', 'sessionexamen.id_examen')
            ->leftJoin('groupe', 'sessionexamen.id_groupe', '=', 'groupe.id_groupe')
            ->select(
                'examen.id_examen',
                'examen.type',
                'examen.date',
                'examen.heure_debut',
                'examen.heure_fin',
                'module.nom_module',
                'salle.num_salle',
                'groupe.num_groupe',
                'groupe.niveau'
            )
            ->distinct()
            ->get();

        return $this->transformExamsToEvents($exams, true);
    }

    /**
     * Transform exam data to calendar event format
     */
    private function transformExamsToEvents($exams, $includeGroup = false)
    {
        $events = [];

        foreach ($exams as $exam) {
            // Create title
            $title = $exam->nom_module ?? 'Exam';
            if ($exam->type) {
                $title .= ' - ' . $exam->type;
            }
            if ($includeGroup && isset($exam->num_groupe)) {
                $title .= ' (G' . $exam->num_groupe . ')';
            }

            // Create description
            $description = '';
            if ($exam->num_salle) {
                $description .= 'Room: ' . $exam->num_salle;
            }
            if ($includeGroup && isset($exam->niveau)) {
                $description .= ' | ' . $exam->niveau;
            }

            // Format start and end times
            $start = $exam->date . ' ' . ($exam->heure_debut ?? '00:00:00');
            $end = $exam->date . ' ' . ($exam->heure_fin ?? '23:59:59');

            $events[] = [
                'id' => (string)$exam->id_examen,
                'title' => $title,
                'start' => $start,
                'end' => $end,
                'description' => $description,
                'calendarId' => 'exams',
            ];
        }

        return $events;
    }

    /**
     * Get events by date range
     */
    public function getEventsByDateRange(Request $request)
    {
        try {
            $user = $request->user();
            
            $validated = $request->validate([
                'start_date' => 'required|date',
                'end_date' => 'required|date|after_or_equal:start_date',
            ]);

            $events = [];

            // Get events based on user role
            switch ($user->role) {
                case 'Étudiant':
                    $events = $this->getStudentEventsByDateRange($user, $validated['start_date'], $validated['end_date']);
                    break;
                    
                case 'Enseignant':
                    $events = $this->getTeacherEventsByDateRange($user, $validated['start_date'], $validated['end_date']);
                    break;
                    
                case 'Chef':
                case 'Responsable':
                    $events = $this->getAllEventsByDateRange($validated['start_date'], $validated['end_date']);
                    break;
                    
                default:
                    $events = [];
            }

            return response()->json([
                'events' => $events,
                'total' => count($events)
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Calendar date range error', [
                'message' => $e->getMessage()
            ]);
            
            return response()->json([
                'message' => 'Failed to fetch events',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    private function getStudentEventsByDateRange($user, $startDate, $endDate)
    {
        if (!$user->id_groupe) {
            return [];
        }

        $exams = DB::table('examen')
            ->join('sessionexamen', 'examen.id_examen', '=', 'sessionexamen.id_examen')
            ->leftJoin('module', 'examen.id_examen', '=', 'module.id_examen')
            ->leftJoin('salle', 'examen.id_salle', '=', 'salle.id_salle')
            ->where('sessionexamen.id_groupe', $user->id_groupe)
            ->whereBetween('examen.date', [$startDate, $endDate])
            ->select(
                'examen.id_examen',
                'examen.type',
                'examen.date',
                'examen.heure_debut',
                'examen.heure_fin',
                'module.nom_module',
                'salle.num_salle'
            )
            ->get();

        return $this->transformExamsToEvents($exams);
    }

    private function getTeacherEventsByDateRange($user, $startDate, $endDate)
    {
        $exams = DB::table('examen')
            ->leftJoin('module', 'examen.id_examen', '=', 'module.id_examen')
            ->leftJoin('salle', 'examen.id_salle', '=', 'salle.id_salle')
            ->whereBetween('examen.date', [$startDate, $endDate])
            ->select(
                'examen.id_examen',
                'examen.type',
                'examen.date',
                'examen.heure_debut',
                'examen.heure_fin',
                'module.nom_module',
                'salle.num_salle'
            )
            ->get();

        return $this->transformExamsToEvents($exams);
    }

    private function getAllEventsByDateRange($startDate, $endDate)
    {
        $exams = DB::table('examen')
            ->leftJoin('module', 'examen.id_examen', '=', 'module.id_examen')
            ->leftJoin('salle', 'examen.id_salle', '=', 'salle.id_salle')
            ->leftJoin('sessionexamen', 'examen.id_examen', '=', 'sessionexamen.id_examen')
            ->leftJoin('groupe', 'sessionexamen.id_groupe', '=', 'groupe.id_groupe')
            ->whereBetween('examen.date', [$startDate, $endDate])
            ->select(
                'examen.id_examen',
                'examen.type',
                'examen.date',
                'examen.heure_debut',
                'examen.heure_fin',
                'module.nom_module',
                'salle.num_salle',
                'groupe.num_groupe',
                'groupe.niveau'
            )
            ->distinct()
            ->get();

        return $this->transformExamsToEvents($exams, true);
    }
}