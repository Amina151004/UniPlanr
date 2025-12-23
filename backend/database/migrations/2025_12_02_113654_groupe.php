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
        Schema::create('groupe', function (Blueprint $table) {
            $table->id('id_groupe'); // primary key
            $table->integer('num_groupe');
            $table->string('niveau');
             // Foreign keys
           // $table->unsignedBigInteger('id_salle')->nullable();

           // $table->foreign('id_salle')->references('id_salle')->on('salle')->onDelete('set null');
            $table->timestamps(); // created_at & updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('groupe');
    }
};
