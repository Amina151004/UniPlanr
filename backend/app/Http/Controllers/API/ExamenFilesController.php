<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ExamenFilesController extends Controller
{
    /**
     * Upload sujet file for an exam
     */
    public function uploadSujet(Request $request, $examId)
    {
        try {
            $request->validate([
                'sujet_file' => 'required|file|mimes:pdf,doc,docx|max:10240', // 10MB max
            ]);

            $exam = DB::table('examen')->where('id_examen', $examId)->first();
            
            if (!$exam) {
                return response()->json([
                    'message' => 'Exam not found'
                ], 404);
            }

            if ($request->hasFile('sujet_file')) {
                // Delete old file if exists
                if ($exam->sujet_file) {
                    Storage::disk('public')->delete($exam->sujet_file);
                }

                $file = $request->file('sujet_file');
                $fileName = 'sujet_exam_' . $examId . '_' . time() . '.' . $file->getClientOriginalExtension();
                
                // Store in public/storage/examens directory
                $path = $file->storeAs('examens', $fileName, 'public');

                // Update exam record
                DB::table('examen')
                    ->where('id_examen', $examId)
                    ->update([
                        'sujet_file' => $path,
                        'updated_at' => now()
                    ]);

                \Log::info('Sujet uploaded', ['exam_id' => $examId, 'file' => $path]);

                return response()->json([
                    'message' => 'Sujet uploaded successfully',
                    'file_url' => asset('storage/' . $path)
                ], 200);
            }

            return response()->json([
                'message' => 'No file uploaded'
            ], 400);

        } catch (\Exception $e) {
            \Log::error('Sujet upload error', [
                'message' => $e->getMessage(),
                'exam_id' => $examId
            ]);
            
            return response()->json([
                'message' => 'Failed to upload sujet',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Upload correction file for an exam
     */
    public function uploadCorrection(Request $request, $examId)
    {
        try {
            $request->validate([
                'correction_file' => 'required|file|mimes:pdf,doc,docx|max:10240', // 10MB max
            ]);

            $exam = DB::table('examen')->where('id_examen', $examId)->first();
            
            if (!$exam) {
                return response()->json([
                    'message' => 'Exam not found'
                ], 404);
            }

            if ($request->hasFile('correction_file')) {
                // Delete old file if exists
                if ($exam->correction_file) {
                    Storage::disk('public')->delete($exam->correction_file);
                }

                $file = $request->file('correction_file');
                $fileName = 'correction_exam_' . $examId . '_' . time() . '.' . $file->getClientOriginalExtension();
                
                // Store in public/storage/examens directory
                $path = $file->storeAs('examens', $fileName, 'public');

                // Update exam record
                DB::table('examen')
                    ->where('id_examen', $examId)
                    ->update([
                        'correction_file' => $path,
                        'updated_at' => now()
                    ]);

                \Log::info('Correction uploaded', ['exam_id' => $examId, 'file' => $path]);

                return response()->json([
                    'message' => 'Correction uploaded successfully',
                    'file_url' => asset('storage/' . $path)
                ], 200);
            }

            return response()->json([
                'message' => 'No file uploaded'
            ], 400);

        } catch (\Exception $e) {
            \Log::error('Correction upload error', [
                'message' => $e->getMessage(),
                'exam_id' => $examId
            ]);
            
            return response()->json([
                'message' => 'Failed to upload correction',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Download sujet file
     */
    public function downloadSujet($examId)
    {
        try {
            $exam = DB::table('examen')->where('id_examen', $examId)->first();
            
            if (!$exam) {
                return response()->json([
                    'message' => 'Exam not found'
                ], 404);
            }

            if (!$exam->sujet_file || !Storage::disk('public')->exists($exam->sujet_file)) {
                return response()->json([
                    'message' => 'Sujet file not found'
                ], 404);
            }

            return Storage::disk('public')->download($exam->sujet_file);

        } catch (\Exception $e) {
            \Log::error('Sujet download error', [
                'message' => $e->getMessage(),
                'exam_id' => $examId
            ]);
            
            return response()->json([
                'message' => 'Failed to download sujet',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Download correction file
     */
    public function downloadCorrection($examId)
    {
        try {
            $exam = DB::table('examen')->where('id_examen', $examId)->first();
            
            if (!$exam) {
                return response()->json([
                    'message' => 'Exam not found'
                ], 404);
            }

            if (!$exam->correction_file || !Storage::disk('public')->exists($exam->correction_file)) {
                return response()->json([
                    'message' => 'Correction file not found'
                ], 404);
            }

            return Storage::disk('public')->download($exam->correction_file);

        } catch (\Exception $e) {
            \Log::error('Correction download error', [
                'message' => $e->getMessage(),
                'exam_id' => $examId
            ]);
            
            return response()->json([
                'message' => 'Failed to download correction',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}