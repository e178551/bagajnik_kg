<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App;
class OffersController extends Controller
{
//    public function index() {
//        $offers = App\Offer::trip();
//        return view('offers.index', compact('offers'));
//
//    }
    public function index(){
        $offerList  = App\Offer::all();
        return $offerList;
    }
    public function show($id){
//        $offer = App\Offer::find($id);
//
//        $user  = $offer->user()->get();

        return App\Offer::find($id)-> with(['user'])->get();
    }
}