<?php

if (isset($_SERVER['HTTP_ORIGIN'])) {
    // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
    // you want to allow, and if so:
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        // may also be using PUT, PATCH, HEAD etc
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}


    $nombre = $_POST["name"];
    $telefono = $_POST["phone"];
    $email = $_POST["email"];
    $asunto = $_POST["subject"];
    $msg = $_POST["messages"];

    $mensaje = "Nombre:      ". $_POST['name'] . "\n\n";
    $mensaje .= "Telefono:    ". $_POST['phone'] . "\n\n";
    $mensaje .= "Email:       ". $_POST['email'] . "\n\n";
    $mensaje .= "Asunto:      ". $_POST['subject'] . "\n\n\n";
    $mensaje .= "Mensaje:     ". $_POST['messages'];

    include_once("class.phpmailer.php");
    include_once("class.smtp.php");
    
    $mail = new PHPMailer(); //creo un objeto de tipo PHPMailer
    $mail->IsSMTP(); //protocolo SMTP
    $mail->SMTPAuth = true;//autenticación en el SMTP
    $mail->SMTPSecure = "none";//SSL security socket layer
    $mail->Host = "smtp.gmail.com";//servidor de SMTP de gmail
    $mail->Port = 26;//puerto seguro del servidor SMTP de gmail
    $mail->From = $mail; //Remitente del correo
    $mail->AddAddress("contacto@sigmapcs.com.mx");// Destinatario
    $mail->Username = "tinonav@gmail.com";//Aqui pon tu correo de gmail
    $mail->Password = "DiazN101875/";//Aqui pon tu contraseña de gmail
    $mail->Subject = $asunto; //Asunto del correo
    $mail->Body = $mensaje; //Contenido del correo
    $mail->WordWrap = 50; //No. de columnas
    $mail->MsgHTML($mensaje);//Se indica que el cuerpo del correo tendrá formato html
    $mail->AddAttachment($destino); //accedemos al archivo que se subio al servidor y lo adjuntamos
    
    if($mail->Send()){ //enviamos el correo por PHPMailer
        $respuesta = "El mensaje ha sido enviado con la clase PHPMailer y tu cuenta de gmail =)";
    } else{
        $respuesta = "El mensaje no se pudo enviar con la clase PHPMailer y tu cuenta de gmail =(";
            $respuesta .= " Error: ".$mail->ErrorInfo;
    }
    

    

