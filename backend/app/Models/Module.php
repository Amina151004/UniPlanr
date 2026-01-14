<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    use HasFactory;

    protected $table = 'module';
    protected $primaryKey = 'id_module'; // Changed from 'id'

    protected $fillable = [
        'nom_module',
        'code_module',
        'id_examen',
        'id_semester', // Added
    ];

    /**
     * Get the examen for this module
     */
    public function examen()
    {
        return $this->belongsTo(Examen::class, 'id_examen', 'id_examen');
    }

    /**
     * Get the semester for this module
     */
    public function semester()
    {
        return $this->belongsTo(Semester::class, 'id_semester', 'id_semester');
    }

    /**
     * Get session examens for this module
     */
    public function sessionExamens()
    {
        return $this->hasManyThrough(
            SessionExamen::class,
            Examen::class,
            'id_examen', // Foreign key on examen table
            'id_examen', // Foreign key on sessionexamen table
            'id_examen', // Local key on module table
            'id_examen'  // Local key on examen table
        );
    }

    /**
     * Get teachers who teach this module
     */
    public function teachers()
    {
        return $this->hasMany(User::class, 'id_module', 'id_module')
                    ->where('role', 'Enseignant');
    }

    /**
     * Get users (teachers) for this module
     * Alias for teachers() for backward compatibility
     */
    public function utilisateurs()
    {
        return $this->hasMany(User::class, 'id_module', 'id_module');
    }

    /**
     * Get groupes that have this module (through sessionexamen)
     */
    public function groupes()
    {
        return $this->hasManyThrough(
            Groupe::class,
            SessionExamen::class,
            'id_examen',  // Foreign key on sessionexamen table
            'id_groupe',  // Foreign key on groupe table
            'id_examen',  // Local key on module table
            'id_groupe'   // Local key on sessionexamen table
        );
    }
}