<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Semester extends Model
{
    use HasFactory;

    protected $table = 'semester';
    protected $primaryKey = 'id_semester';

    protected $fillable = [
        'numero_semester',
        'annee_universitaire',
        'est_actif'
    ];

    protected $casts = [
        'est_actif' => 'boolean',
    ];

    /**
     * Get modules for this semester
     */
    public function modules()
    {
        return $this->hasMany(Module::class, 'id_semester', 'id_semester');
    }

    /**
     * Get groupes for this semester
     */
    public function groupes()
    {
        return $this->hasMany(Groupe::class, 'id_semester', 'id_semester');
    }

    /**
     * Scope to get active semester
     */
    public function scopeActive($query)
    {
        return $query->where('est_actif', true);
    }

    /**
     * Get the full semester name
     */
    public function getFullNameAttribute()
    {
        return "Semester {$this->numero_semester} - {$this->annee_universitaire}";
    }
}