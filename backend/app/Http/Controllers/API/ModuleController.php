<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Module;
use Illuminate\Http\Request;

class ModuleController extends Controller
{
    // Get all modules
    public function index()
    {
        $modules = Module::with('examen')->get();
        return response()->json($modules);
    }

    // Get single module
    public function show($id)
    {
        $module = Module::with('examen')->findOrFail($id);
        return response()->json($module);
    }

    // Create module
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom_module' => 'required|string|max:255',
            'id_examen' => 'nullable|exists:examen,id_examen',
        ]);

        $module = Module::create($validated);
        return response()->json($module, 201);
    }

    // Update module
    public function update(Request $request, $id)
    {
        $module = Module::findOrFail($id);
        $module->update($request->all());
        return response()->json($module);
    }

    // Delete module
    public function destroy($id)
    {
        Module::destroy($id);
        return response()->json(['message' => 'Module deleted']);
    }
}