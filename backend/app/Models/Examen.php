<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Examen extends Model
{
    use HasFactory;

    protected $table = 'examen';
    protected $primaryKey = 'id_examen';

    protected $fillable = [
        'type',
        'date',
        'heure_debut',
        'heure_fin',
        'id_salle',
        'niveau',
        'specialite',
        'invigilator',
        'status',      // pending / approved / rejected
        'published',   // boolean
    ];

    // Relation with Salle
    public function salle()
    {
        return $this->belongsTo(Salle::class, 'id_salle', 'id');
    }
}