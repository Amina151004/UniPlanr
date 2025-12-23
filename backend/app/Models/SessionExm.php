<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SessionExm extends Model
{
    use HasFactory;

    protected $table = 'sessionexm';  // Table name in DB
    protected $primaryKey = 'id';     // Primary key
    protected $fillable = [
        // Add columns later if needed, e.g. 'nom', 'date_debut', 'date_fin'
    ];

    // Relation with Utilisateurs
    public function utilisateurs()
    {
        return $this->hasMany(Utilisateur::class, 'id_sessionexamen', 'id');
    }

    // Relation with Examens (if applicable)
    public function examens()
    {
        return $this->hasMany(Examen::class, 'id_sessionexamen', 'id');
    }
}