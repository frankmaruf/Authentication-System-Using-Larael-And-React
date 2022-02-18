<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MyTestMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        // return $this->view('view.name');
        // return $this->subject('Mail From marufpy@gmail.com')->view('mail.myTestMail');
        // return $this->subject('Mail From Maruf' . env('MAIL_FROM_ADDRESS'))->view('mail.myTestMail');
        return $this->subject('Mail From Maruf' . env('MAIL_FROM_ADDRESS'))->view('reset');
    }
}