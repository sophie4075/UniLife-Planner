<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class ToDoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this['id'],
            'course' => new KursResource($this-> kurs),
            'name' => $this['name'],
            'description' => $this['description'],
            'due_date' => (new Carbon($this -> due_date)) -> format('Y-m-d'),
            'status' => $this['status'],
            'priority' => $this['priority'],
            'image_path' => $this['image_path'] ? Storage::url($this['image_path']) : $this->getRandomImageUrl(),

        ];





    }

    private function getRandomImageUrl():string
    {
        $srcOptions = [
            "https://media1.tenor.com/m/zNVPV_TvdlUAAAAd/spongebob-an-intellectual-library.gif",
            "https://media1.tenor.com/m/OODNaEnLolMAAAAC/cat-procrastinate.gif",
        ];

        // Calculation for a random index within the array based on time
        $index = time() % count($srcOptions);

        return $srcOptions[$index];
    }
}
