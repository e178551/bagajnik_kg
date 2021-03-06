<?php

namespace App\Http\Resources\TripResources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class TripsResourceCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'data' => $this->collection,
            'links' => [
                'self' => 'link-value',
            ],
        ];
    }

    public function with($request)
    {
        return [
            'version' => '1.0',
            'url' => url('/'),
        ];
    }
}
