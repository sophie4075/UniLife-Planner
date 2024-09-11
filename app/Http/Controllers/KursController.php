<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreKursRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Http\Resources\KursResource;
use App\Http\Resources\ToDoResource;
use App\Models\Kurs;

use GuzzleHttp\Psr7\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;


class KursController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Kurs::query()
            ->where('user_id', Auth::id());

        $sortField = request("sort_field", "exam_date");
        $sortDirection = request("sort_direction", "asc");

        if (request('name')) {
            $query
                ->where('name', 'like', '%' . request('name') . '%');
        }
        if (request('status')) {
            $query
                ->where('status', request('status'));
        }

        $courses = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        return inertia("Kurs/Index", [
            "kurse" => KursResource::collection($courses),
            //if empty array parse null (will be parsed into an object)
            "queryParams" => request()->query() ?: null,
            "success" => session('success'),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $kurs = Kurs::query()
            ->findOrFail($id);

        $query = $kurs
            ->to_dos();

        $sortField = request("sort_field", 'due_date');
        $sortDirection = request("sort_direction", "asc");

        if (request("name")) {
            $query
                ->where("name", "like", "%" . request("name") . "%");
        }
        if (request("status")) {
            $query
                ->where("status", request("status"));
        }

        $todos = $query
            ->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia('Kurs/Show', [
            "kurs" => new KursResource($kurs),
            "todos" => ToDoResource::collection($todos),
            "queryParams" => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $kurs = Kurs::query()
            ->findOrFail($id);

        return inertia('Kurs/Edit', [
            "kurs" => new KursResource($kurs),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCourseRequest $request, $id)
    {

        $kurs = Kurs::query()
            ->findOrFail($id);

        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();

        if ($image) {

            if ($kurs->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($kurs->image_path));
            }

            $data['image_path'] = $image->store('courses/' . Str::random(), 'public');
        }

        $kurs->update($data);

        return to_route('kurs.index')->with('success', "Course \"$kurs->name\" was updated");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreKursRequest $request)
    {
        /** @var $image UploadedFile
         */
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['user_id'] = Auth::id();

        if ($image) {
            $data['image_path'] = $image->store('courses/' . Str::random(), 'public');
        }
        /*dd($data);*/
        Kurs::create($data);

        return to_route('kurs.index')->with("success", "Course created successfully!");
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Kurs/Create");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $kurs = Kurs::query()
            ->findOrFail($id);

        //check for image within each to-do before deleting
        foreach ($kurs->to_dos as $todo) {

            if ($todo->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($todo->image_path));
            }

        }

        //if Course Image exists, delete from dir
        if ($kurs->image_path) {
            // Bild löschen, falls vorhanden
            Storage::disk('public')->deleteDirectory(dirname($kurs->image_path));
        }

        $name = $kurs->name;
        $kurs->delete();
        return to_route('kurs.index')->with('success', "Course \"$name\" was deleted successfully!");
    }
}
