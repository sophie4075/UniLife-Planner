<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreToDoRequest;
use App\Http\Requests\UpdateToDoRequest;
use App\Http\Resources\KursResource;
use App\Http\Resources\ToDoResource;
use App\Models\Kurs;
use App\Models\ToDo;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ToDoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        /*$query = ToDo::query();*/

        $userId = auth()->id();

        $kursIds = Kurs::query()
            ->where('user_id', $userId)
            ->pluck('id')
            ->toArray();


        $query = ToDo::query()
            ->whereIn('kurs_id', $kursIds);


        $sortField = request("sort_field", "due_date");
        $sortDirection = request("sort_direction", "asc");

        if (request('name')) {
            $query
                ->where('name', 'like', '%' . request('name') . '%');
        }
        if(request('status')){
            $query
                ->where('status', request('status'));
        }
        if(request('priority')){
            $query
                ->where('priority', request('priority'));
        }

        $todos = $query
            ->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia("ToDo/Index", [
            "todos" => ToDoResource::collection($todos),
            //if empty array parse null (will be parsed into an object)
            "queryParams" => request()->query() ?: null,
            "success" => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //$kurs = Kurs::query()->orderBy('name')->get();

        $userId = auth()
            ->id();

        $kursIds = Kurs::query()
            ->where('user_id', $userId)
            ->pluck('id')
            ->toArray();

        $kurs = Kurs::query()
            ->whereIn('id', $kursIds)
            ->orderBy('name')
            ->get();


        return inertia("ToDo/Create", [
            'kurs' => KursResource::collection($kurs),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreToDoRequest $request)
    {
        $data = $request
            ->validated();

        $image = $data['image'] ?? null;
        $data['user_id'] = Auth::id();

        if ($image) {
            $data['image_path'] = $image
                ->store('todos/' . Str::random(), 'public');
        }
        /*dd($data);*/
        ToDo::create($data);

        return to_route('todo.index')
            ->with("success", "Course created successfully!");
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $todo = ToDo::query()->findOrFail($id);
        return inertia('ToDo/Show', [
            'todo' => (new ToDoResource($todo))->toArray(request()),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {

        $userId = auth()->id();

        $kursIds = Kurs::query()
            ->where('user_id', $userId)
            ->pluck('id')
            ->toArray();

        $kurs = Kurs::query()
            ->whereIn('id', $kursIds)
            ->orderBy('name')
            ->get();

        $todo = ToDo::query()->findOrFail($id);

        return inertia("ToDo/Edit", [
            'kurs' => KursResource::collection($kurs),
            'todo' => (new ToDoResource($todo))->toArray(request()),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateToDoRequest $request, $id)
    {
        $todo = ToDo::query()->findOrFail($id);
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();
        if ($image) {

            if ($todo->image_path) {
                Storage::disk('public')
                    ->deleteDirectory(dirname($todo->image_path));
            }

            $data['image_path'] = $image
                ->store('todos/' . Str::random(), 'public');
        }

        $todo
            ->update($data);

        return to_route('todo.index')
            ->with('success', "To-Do \"$todo->name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $todo= ToDo::query()
            ->findOrFail($id);

        if ($todo->image_path) {
            // Bild löschen, falls vorhanden
            Storage::disk('public')->deleteDirectory(dirname($todo->image_path));
        }

        $name = $todo->name;
        $todo
            ->delete();

        return to_route('todo.index')
            ->with('success', "To-Do \"$name\" was deleted successfully!");
    }


}
