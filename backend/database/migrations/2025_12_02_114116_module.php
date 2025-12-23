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
        Schema::create('module', function (Blueprint $table) {
            $table->id('id_module'); // primary key
            $table->string('nom_module');
             // Foreign keys
            $table->unsignedBigInteger('id_examen')->nullable();

            //$table->foreign('id_examen')->references('id_examen')->on('examen')->onDelete('set null');
            $table->timestamps(); // created_at & updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('module');
    }
};
