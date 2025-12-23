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
        Schema::create('sessionexamen', function (Blueprint $table) {
            $table->id('id_session'); // primary key
            $table->string('type_session');
            $table->date('date_debut');
            $table->date('date_fin');
             // Foreign keys
           // $table->unsignedBigInteger('id_examen')->nullable();
            //$table->unsignedBigInteger('id_groupe')->nullable();
            //$table->unsignedBigInteger('id_utilisateur')->nullable();

            //$table->foreign('id_examen')->references('id_examen')->on('examen')->onDelete('set null');
            //$table->foreign('id_groupe')->references('id_groupe')->on('groupe')->onDelete('set null');
            //$table->foreign('id_utilisateur')->references('id_utilisateur')->on('users')->onDelete('set null');
            $table->timestamps(); // created_at & updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sessionexamen');
    }
};
