<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    use HasFactory;

    protected $table = 'groupes'; // table name in DB

    protected $primaryKey = 'id'; // change if your PK is different

    protected $fillable = [
        'nom', // put here all columns in your groupes table
        'description', // example
    ];

    // Optional: Relation with utilisateurs
    public function utilisateurs()
    {
        return $this->hasMany(Utilisateur::class, 'id_groupe', 'id');
    }
}