<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('examen', function (Blueprint $table) {
            $table->string('sujet_file')->nullable()->after('id_salle');
            $table->string('correction_file')->nullable()->after('sujet_file');
        });
    }

    public function down(): void
    {
        Schema::table('examen', function (Blueprint $table) {
            $table->dropColumn(['sujet_file', 'correction_file']);
        });
    }
};