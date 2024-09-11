<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Http\Resources\ToDoResource;
use App\Models\Kurs;
use App\Models\Task;
use App\Models\ToDo;
use Carbon\Carbon;


class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->id();
//        $user = new UserResource(auth()->id());
//        dd($user);

        // Course IDs of the courses that belong to the authenticated user
        $kursIds = Kurs::query()->where('user_id', $user)->pluck('id')->toArray();

        $allMyToDos = ToDo::query()
            ->whereIn('kurs_id', $kursIds)
            ->count();

        $myPendingToDos = ToDo::query()
            ->whereIn('kurs_id', $kursIds)
            ->where('status', 'pending')
            ->count();


        $myProgressTodos = ToDo::query()
            ->whereIn('kurs_id', $kursIds)
            ->where('status', 'in_progress')
            ->count();


        $myCompletedTodos = ToDo::query()
            ->whereIn('kurs_id', $kursIds)
            ->where('status', 'completed')
            ->count();



        // Current Date + within two weeks
        $now = Carbon::today();
        $twoWeeksLater = Carbon::today()->addWeeks(2)->endOfDay();

        $activeTodos = ToDo::query()
            ->whereIn('kurs_id', $kursIds)
            ->whereIn('status', ['pending', 'in_progress'])
            //->whereBetween('due_date', [$now, $twoWeeksLater])
            -> where(function ($query) use ($now, $twoWeeksLater) {
                $query->whereDate('due_date', '=', $now)
                ->orWhereBetween('due_date', [$now, $twoWeeksLater]);
            })
            ->limit(10)
            ->get();
        $activeTodos = ToDoResource::collection($activeTodos);


        return inertia(
            'Dashboard',
            compact(
                'allMyToDos',
                'myPendingToDos',
                'myProgressTodos',
                'myCompletedTodos',
                'activeTodos',
            )
        );
    }
}



