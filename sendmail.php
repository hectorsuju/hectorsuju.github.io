<?php
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $from = 'From: ' . $email; 
    $to = 'hola@interiorismodelatorre.com'; 
    $subject = 'Formulario';
    $human = $_POST['human'];

    $body = "From: $name\n E-Mail: $email\n Message:\n $message";

	    if ($name != '' && $email != '') {
	        if ($human == '4') {                 
	            if (mail ($to, $subject, $body, $from)) { 
	            echo '<p>¡Tu mensaje se ha enviado correctamente!</p>';
	        } else { 
	            echo '<p>¡Ups! Algo ha salido mal, porfavor vuelve a intentarlo.</p>'; 
	        } 
	    } else if ($human != '4') {
	        echo '<p>Has respondido de forma incorrecta la pregunta anti-spam</p>';
	    }
	    } else {
	        echo '<p>¡Todos los campos son requeridos!</p>';
	    }
?>