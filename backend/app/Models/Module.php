<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    use HasFactory;

    protected $table = 'module';  // Table name in DB
    protected $primaryKey = 'id';  // Primary key
    protected $fillable = [
        // Add columns later when you expand the table, e.g. 'nom', 'description'
    ];

    // Optional: relation with Group (if a group can have many modules)
    public function groups()
    {
        return $this->hasMany(Group::class, 'id_module', 'id');
    }

    // Optional: relation with Utilisateur (if needed)
    public function utilisateurs()
    {
        return $this->hasMany(Utilisateur::class, 'id_module', 'id');
    }
}