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
        // Add foreign key column and constraint to examen table
        Schema::table('examen', function (Blueprint $table) {
            $table->unsignedBigInteger('id_salle')->nullable()->after('heure_fin');
            $table->foreign('id_salle')->references('id_salle')->on('salle')->onDelete('set null');
        });

        // Add foreign key column and constraint to groupe table
        Schema::table('groupe', function (Blueprint $table) {
            $table->unsignedBigInteger('id_salle')->nullable()->after('niveau');
            $table->foreign('id_salle')->references('id_salle')->on('salle')->onDelete('set null');
        });

        // Add foreign key columns and constraints to salle table
        Schema::table('salle', function (Blueprint $table) {
            $table->unsignedBigInteger('id_examen')->nullable()->after('capacite');
            $table->unsignedBigInteger('id_groupe')->nullable()->after('id_examen');
            
            $table->foreign('id_examen')->references('id_examen')->on('examen')->onDelete('set null');
            $table->foreign('id_groupe')->references('id_groupe')->on('groupe')->onDelete('set null');
        });

        // Add foreign key constraint to module table (column already exists)
        Schema::table('module', function (Blueprint $table) {
            $table->foreign('id_examen')->references('id_examen')->on('examen')->onDelete('set null');
        });

        // Add foreign key columns and constraints to sessionexamen table
        Schema::table('sessionexamen', function (Blueprint $table) {
            $table->unsignedBigInteger('id_examen')->nullable()->after('date_fin');
            $table->unsignedBigInteger('id_groupe')->nullable()->after('id_examen');
            $table->unsignedBigInteger('id_utilisateur')->nullable()->after('id_groupe');
            
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
            $table->dropColumn('id_salle');
        });

        Schema::table('groupe', function (Blueprint $table) {
            $table->dropForeign(['id_salle']);
            $table->dropColumn('id_salle');
        });

        Schema::table('salle', function (Blueprint $table) {
            $table->dropForeign(['id_examen']);
            $table->dropForeign(['id_groupe']);
            $table->dropColumn(['id_examen', 'id_groupe']);
        });

        Schema::table('module', function (Blueprint $table) {
            $table->dropForeign(['id_examen']);
        });

        Schema::table('sessionexamen', function (Blueprint $table) {
            $table->dropForeign(['id_examen']);
            $table->dropForeign(['id_groupe']);
            $table->dropForeign(['id_utilisateur']);
            $table->dropColumn(['id_examen', 'id_groupe', 'id_utilisateur']);
        });
    }
};