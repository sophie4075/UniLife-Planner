<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class KursResource extends JsonResource
{
    public static $wrap = false;


    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this['id'],
            'user_id' => $this['user_id'],
            'name' => $this['name'],
            'description' => $this['description'],
            'exam_date' => (new Carbon($this -> exam_date)) -> format('Y-m-d'),
            'status' => $this['status'],
            'image_path' => $this['image_path'] ? Storage::url($this['image_path']) : $this->getRandomImageUrl(),
        ];
    }

    /**
     * Returns a random Image-URL, if no image path is available.
     *
     * @return string
     */

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
