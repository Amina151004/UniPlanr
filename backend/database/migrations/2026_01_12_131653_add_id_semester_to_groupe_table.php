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
        Schema::table('groupe', function (Blueprint $table) {
            $table->unsignedBigInteger('id_semester')->nullable()->after('id_groupe');
            
            $table->foreign('id_semester')
                  ->references('id_semester')
                  ->on('semester')
                  ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('groupe', function (Blueprint $table) {
            $table->dropForeign(['id_semester']);
            $table->dropColumn('id_semester');
        });
    }
};