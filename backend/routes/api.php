<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\ExamenController;
use App\Http\Controllers\API\ModuleController;
use App\Http\Controllers\API\SalleController;
use App\Http\Controllers\API\SessionExamenController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\API\StudentProfileController;
use App\Http\Controllers\API\UserSettingsController;
use App\Http\Controllers\API\ExamenFilesController;
use App\Http\Controllers\API\CalendarController;
use App\Http\Controllers\API\StudentDashboardController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes - ALL protected routes go inside this group
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    
    // Student Profile routes - MOVE THESE INSIDE!
    Route::get('/student/profile', [StudentProfileController::class, 'getProfile']);
    Route::get('/student/exams', [StudentProfileController::class, 'getGroupExams']);
    Route::get('/student/exam/{examId}', [StudentProfileController::class, 'getExamDetails']);


    Route::put('/user/profile', [UserSettingsController::class, 'updateProfile']);
    Route::put('/user/password', [UserSettingsController::class, 'updatePassword']);
    Route::post('/user/profile-picture', [UserSettingsController::class, 'uploadProfilePicture']);

    // Student Dashboard routes
    Route::get('/student/dashboard', [StudentDashboardController::class, 'getDashboardData']);
    Route::get('/student/exams/module/{moduleId}', [StudentDashboardController::class, 'getExamsByModule']);

    Route::get('/users/role/{role}', [UserController::class, 'getUsersByRole']);
    Route::get('/teachers/module/{moduleId}', [UserController::class, 'getTeachersByModule']);
    
    // Users Routes
    Route::apiResource('users', UserController::class);

    Route::get('/calendar/events', [CalendarController::class, 'getEvents']);
    Route::get('/calendar/events/range', [CalendarController::class, 'getEventsByDateRange']);
    
    // Examens Routes
    Route::apiResource('examens', ExamenController::class);
    Route::get('users/{id}/examens', [ExamenController::class, 'getStudentExams']);

    // Exam files routes
    Route::post('/examen/{examId}/sujet', [ExamenFilesController::class, 'uploadSujet']);
    Route::post('/examen/{examId}/correction', [ExamenFilesController::class, 'uploadCorrection']);
    Route::get('/examen/{examId}/sujet/download', [ExamenFilesController::class, 'downloadSujet']);
    Route::get('/examen/{examId}/correction/download', [ExamenFilesController::class, 'downloadCorrection']);
    
    // Modules Routes
    Route::apiResource('modules', ModuleController::class);
    
    // Salles Routes
    Route::apiResource('salles', SalleController::class);
    
    // Session Examens Routes
    Route::apiResource('sessions', SessionExamenController::class);
});