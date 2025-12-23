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
        Schema::create('salle', function (Blueprint $table) {
            $table->id('id_salle'); // primary key
            $table->string('type_salle');
            $table->integer('num_salle');
            $table->integer('capacite');
             // Foreign keys
            //$table->unsignedBigInteger('id_examen')->nullable();
            //$table->unsignedBigInteger('id_groupe')->nullable();

            //$table->foreign('id_examen')->references('id_examen')->on('examen')->onDelete('set null');
            //$table->foreign('id_groupe')->references('id_groupe')->on('groupe')->onDelete('set null');
            $table->timestamps(); // created_at & updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('salle');
    }
};
