<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('semester', function (Blueprint $table) {
            $table->id('id_semester');
            $table->integer('numero_semester'); // 1, 2, 3, etc.
            $table->string('annee_universitaire'); // e.g., "2024-2025"
            $table->boolean('est_actif')->default(false); // To mark current semester
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('semester');
    }
};