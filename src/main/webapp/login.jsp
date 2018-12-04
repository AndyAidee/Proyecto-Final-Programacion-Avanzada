<%-- 
    Document   : loggin
    Created on : 15-jul-2015, 15:00:10
    Author     : Daz
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Login</title>

        <link href="cssLogin.css" rel="stylesheet" type="text/css"/>

        <link href="bootstrap/css/cssLogin.css" rel="stylesheet" type="text/css"/>

        <style>


        </style>
    </head>
    <body>

        <div class="wrapper">
            <div class="container">
                <img src="bootstrap/images/LogoBETA.png" alt="" style="width: 60%; height: 60%"/>
                <form action="<c:url value='j_spring_security_check'/>" method="POST">
                    <input type="text" placeholder="Nombre de Usuario" name="j_username">
                    <input type="password" placeholder="Contraseña" name="j_password">
                    <button type="submit">Iniciar sesión</button>
                </form>
            </div>

            <!--ul class="bg-bubbles">
                 <li></li>
                 <li></li>
                 <li></li>
                 <li></li>
                 <li></li>
                 <li></li>
                 <li></li>
                 <li></li>
                 <li></li>
                 <li></li>
            </ul-->   

            <script src="bootstrap/js/jquery.js" type="text/javascript"></script>
            <!--script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script-->          
        </div>
        <script>
            $("input[name=j_username]").keyup(function () {
                var test = $("input[name=j_username]").val();
                test = test.toLowerCase();
                $("input[name=j_username]").val(test);
            });
            $("input[name=j_password]").keyup(function () {
                var test = $("input[name=j_password]").val();
                test = normalize(test);
                $("input[name=j_password]").val(test);
            });

            var normalize = (function () {
                var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
                        to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
                        mapping = {};

                for (var i = 0, j = from.length; i < j; i++)
                    mapping[ from.charAt(i) ] = to.charAt(i);

                return function (str) {
                    var ret = [];
                    for (var i = 0, j = str.length; i < j; i++) {
                        var c = str.charAt(i);
                        if (mapping.hasOwnProperty(str.charAt(i)))
                            ret.push(mapping[ c ]);
                        else
                            ret.push(c);
                    }
                    return ret.join('');
                }

            })();
        </script>
    </body>
</html>


