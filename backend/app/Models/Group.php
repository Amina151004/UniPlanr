<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Groupe extends Model
{
    use HasFactory;

    protected $table = 'groupe'; // Changed from 'groupes'
    protected $primaryKey = 'id_groupe'; // Changed from 'id'

    protected $fillable = [
        'num_groupe',
        'niveau',
        'id_semester', // Added
    ];

    /**
     * Get users (students) in this groupe
     */
    public function utilisateurs()
    {
        return $this->hasMany(User::class, 'id_groupe', 'id_groupe');
    }

    /**
     * Get students in this groupe
     */
    public function students()
    {
        return $this->hasMany(User::class, 'id_groupe', 'id_groupe')
                    ->where('role', 'Étudiant');
    }

    /**
     * Get the semester for this groupe
     */
    public function semester()
    {
        return $this->belongsTo(Semester::class, 'id_semester', 'id_semester');
    }

    /**
     * Get session examens for this groupe
     */
    public function sessionExamens()
    {
        return $this->hasMany(SessionExamen::class, 'id_groupe', 'id_groupe');
    }

    /**
     * Get modules for this groupe (through sessionexamen and examen)
     */
    public function modules()
    {
        return $this->hasManyThrough(
            Module::class,
            SessionExamen::class,
            'id_groupe',  // Foreign key on sessionexamen table
            'id_examen',  // Foreign key on module table
            'id_groupe',  // Local key on groupe table
            'id_examen'   // Local key on sessionexamen table
        );
    }

    /**
     * Get exams for this groupe
     */
    public function examens()
    {
        return $this->hasManyThrough(
            Examen::class,
            SessionExamen::class,
            'id_groupe',  // Foreign key on sessionexamen table
            'id_examen',  // Foreign key on examen table
            'id_groupe',  // Local key on groupe table
            'id_examen'   // Local key on sessionexamen table
        );
    }
}