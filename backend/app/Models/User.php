<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;
    
    protected $table = 'users';
    protected $primaryKey = 'id_utilisateur';

    protected $fillable = [
    'nom',
    'prenom',
    'tel',
    'email',
    'role',
    'motdepasse',
    'profile_picture', // ← Add this
    'id_sessionexamen',
    'id_groupe'
];

    protected $hidden = [
        'motdepasse',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // IMPORTANT: Override password accessor and mutator
    public function getAuthPassword()
    {
        return $this->motdepasse;
    }

    public function setMotdepasseAttribute($value)
    {
        $this->attributes['motdepasse'] = Hash::make($value);
    }

    // Relationships
    public function groupe()
    {
        return $this->belongsTo(Groupe::class, 'id_groupe', 'id_groupe');
    }

    public function sessionExamen()
    {
        return $this->belongsTo(SessionExamen::class, 'id_sessionexamen', 'id_sessionexamen');
    }
}