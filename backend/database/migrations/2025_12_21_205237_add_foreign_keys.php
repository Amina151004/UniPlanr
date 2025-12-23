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
        // Add foreign keys to examen table
        Schema::table('examen', function (Blueprint $table) {
            $table->foreign('id_salle')->references('id_salle')->on('salle')->onDelete('set null');
        });

        // Add foreign keys to groupe table
        Schema::table('groupe', function (Blueprint $table) {
            $table->foreign('id_salle')->references('id_salle')->on('salle')->onDelete('set null');
        });

        // Add foreign keys to salle table
        Schema::table('salle', function (Blueprint $table) {
            $table->foreign('id_examen')->references('id_examen')->on('examen')->onDelete('set null');
            $table->foreign('id_groupe')->references('id_groupe')->on('groupe')->onDelete('set null');
        });

        // Add foreign keys to module table
        Schema::table('module', function (Blueprint $table) {
            $table->foreign('id_examen')->references('id_examen')->on('examen')->onDelete('set null');
        });

        // Add foreign keys to sessionexamen table
        Schema::table('sessionexamen', function (Blueprint $table) {
            $table->foreign('id_examen')->references('id_examen')->on('examen')->onDelete('set null');
            $table->foreign('id_groupe')->references('id_groupe')->on('groupe')->onDelete('set null');
            $table->foreign('id_utilisateur')->references('id_utilisateur')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('examen', function (Blueprint $table) {
            $table->dropForeign(['id_salle']);
        });

        Schema::table('groupe', function (Blueprint $table) {
            $table->dropForeign(['id_salle']);
        });

        Schema::table('salle', function (Blueprint $table) {
            $table->dropForeign(['id_examen']);
            $table->dropForeign(['id_groupe']);
        });

        Schema::table('module', function (Blueprint $table) {
            $table->dropForeign(['id_examen']);
        });

        Schema::table('sessionexamen', function (Blueprint $table) {
            $table->dropForeign(['id_examen']);
            $table->dropForeign(['id_groupe']);
            $table->dropForeign(['id_utilisateur']);
        });
    }
};