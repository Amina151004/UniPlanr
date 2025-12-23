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
        Schema::create('examen', function (Blueprint $table) {
            $table->id('id_examen'); // primary key
            $table->string('type');
            $table->date('date');
            $table->time('heure_debut');
            $table->time('heure_fin');
             // Foreign keys
            //$table->unsignedBigInteger('id_salle')->nullable();

            //$table->foreign('id_salle')->references('id_salle')->on('salle')->onDelete('set null');
            $table->timestamps(); // created_at & updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('examen');
    }
};
