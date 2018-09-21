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

require("class.phpmailer.php");
require("class.smtp.php");

// Valores enviados desde el formulario
if ( !isset($_POST["name"]) || !isset($_POST["email"]) || !isset($_POST["phone"])  || !isset($_POST["messages"]) ) {
    die ("Es necesario completar todos los datos del formulario");
}



$nombre = $_POST["name"];

$email = $_POST["email"];

$telefono = $_POST["phone"];

$mensaje = $_POST["messages"];

$subject = "Formulario eviado desde el sitio";

$destinatario = "contacto@sigmapcs.com.mx";


// Datos de la cuenta de correo utilizada para enviar v�a SMTP
// $smtpHost = "mail.sigmapcs.com.mx";  // Dominio alternativo brindado en el email de alta
// $smtpUsuario = "tino@sigmapcs.com.mx";  // Mi cuenta de correo
// $smtpClave = "DiazN101875/";  // Mi contrase�a

$smtpHost = "mail.sigmapcs.com.mx";  // Dominio alternativo brindado en el email de alta
$smtpUsuario = "admin@sigmapcs.com.mx";  // Mi cuenta de correo
$smtpClave = "SigmaPCS2018*";  // Mi contrase�a


$mail = new PHPMailer();
// $mail->IsSMTP();
$mail->SMTPAuth = true;
$mail->Port = 26; //587;
$mail->IsHTML(true);
$mail->CharSet = "utf-8";
$mail->SMTPSecure = "ssl";//SSL security socket layer

// VALORES A MODIFICAR //
$mail->Host = $smtpHost;
$mail->Username = $smtpUsuario;
$mail->Password = $smtpClave;


$mail->From = $email; // Email desde donde env�o el correo.
$mail->FromName = $nombre;
$mail->AddAddress($destinatario); // Esta es la direcci�n a donde enviamos los datos del formulario

$mail->Subject = $subject; // Este es el titulo del email.
$mensajeHtml = nl2br($mensaje);
$mail->Body = "
<html>

<body>

<h1>Recibiste un nuevo mensaje desde el formulario de contacto</h1>

<p>Informacion enviada por el usuario de la web:</p>

<p>Nombre: {$nombre}</p>

<p>E-mail: {$email}</p>

<p>Teléfono: {$telefono}</p>

<p>Mensaje: {$mensaje}</p>

</body>

</html>

<br />"; // Texto del email en formato HTML
$mail->AltBody = "{$mensaje} \n\n "; // Texto sin formato HTML
// FIN - VALORES A MODIFICAR //

// $mail->SMTPOptions = array(
//     'ssl' => array(
//         'verify_peer' => false,
//         'verify_peer_name' => false,
//         'allow_self_signed' => true
//     )
// );

$estadoEnvio = $mail->Send(); 
if($estadoEnvio){

// if($mensaje){
    $datos = array(
        'status' => true,
        'text' => "Formulario enviado con éxito, en breve nos pondrémos en contacto con usted",
        );

    echo json_encode($datos, JSON_FORCE_OBJECT);
} else {
    $datos = array(
        'status' => false,
        'text' => "Error al enviar el formulario, por favor vuelva a intentarlo",
        'error' => $mail->ErrorInfo,
        );

    echo json_encode($datos, JSON_FORCE_OBJECT);
}







?>
