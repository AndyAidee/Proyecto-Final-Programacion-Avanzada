<sec:authentication var="principal" property="principal" />
<style>
    #main-content {
        border: 1px solid gray;                
        overflow: scroll;
    }
</style>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CRM LANIA</title>
    <!-- Bootstrap -->
    <link href="../tema/css/font-awesome.min.css" rel="stylesheet">    
    <link href="http://fonts.googleapis.com/css?family=Lato:100italic,100,300italic,300,400italic,400,700italic,700,900italic,900" rel="stylesheet" type="text/css">
    <link href="../tema/css/hoe.css" rel="stylesheet">
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->


    <title>Menu Principal <sitemesh:write property='title'/></title>
<sitemesh:write property='head'/>
</head>
<body hoe-navigation-type="vertical" hoe-nav-placement="left" theme-layout="wide-layout" theme-bg="bg8">
    <div id="hoeapp-wrapper" class="hoe-hide-lpanel" hoe-device-type="desktop">
        <header id="hoe-header" hoe-lpanel-effect="shrink" hoe-color-type="logo-bg8">
            <div class="hoe-left-header">
                <a href="#"><i class="fa fa-graduation-cap"></i> <span>CRM LANIA</span></a>
                <span class="hoe-sidebar-toggle"><a href="#"></a></span>
            </div>


            <div class="hoe-right-header" hoe-position-type="relative" hoe-color-type="header-bg8">
                <span class="hoe-sidebar-toggle"><a href="#"></a></span>

                <ul class="right-navbar">
                    <li class="dropdown hoe-rheader-submenu hoe-header-profile">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <span><img class="img-circle " src="../tema/images/avatar-1.png"></span>                            
                        </a> 
                        <ul class="dropdown-menu ">                            
                            <li><a id="drpCerrarSesion" href="#"><i class="fa fa-power-off"></i>Salir</a></li>
                        </ul>
                    </li>
                    <li class="dropdown hoe-rheader-submenu hidden-xs">
                        <a href="#" class="dropdown-toggle icon-circle" data-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></a> 
                    </li> 
                </ul>

            </div>
        </header>
        <div id="hoeapp-container" hoe-color-type="lpanel-bg8" hoe-lpanel-effect="shrink">
            <aside id="hoe-left-panel" hoe-position-type="absolute">
                <div class="profile-box">
                    <div class="media">
                        <a class="pull-left" href="user-profile.html">
                            <img class="img-circle" src="../tema/images/a.jpg">
                        </a>
                        <div class="media-body">
                            <h5 class="media-heading">Bienvenido</h5>                            
                        </div>
                    </div>
                </div>
                <ul class="nav panel-list">
                    <li class="nav-level">Menú</li>
                    <li class="nav-level"></li>

                    <li>
                        <a href="../Paginas/index.jsp">
                            <i class="fa fa-home"></i>
                            <span class="menu-text">Inicio</span>                             
                            <span class="selected"></span>                            
                        </a>
                    </li>               


                </ul>
            </aside>
            <section id="main-content" style="height: 100vh;">                
                <div class="inner-content">
                    <div class="panel theme-panel">

                        <div class="panel-body">
                            <sitemesh:write property='body'/>



                        </div>
                    </div>
                </div>  
            </section>
            <div id="styleSelector">
                <div class="selector-toggle">
                    <a href="javascript:void(0)"></a>
                </div>
                <ul>
                    <li>
                        <p class="selector-title">Style Selector</p>
                    </li>
                    <li class="theme-option">
                        <span class="sub-title">Header BG Color Option</span>
                        <div id="theme-color">
                            <a href="#" class="header-bg" hoe-color-type="header-bg1">&nbsp;</a>
                            <a href="#" class="header-bg" hoe-color-type="header-bg2">&nbsp;</a>
                            <a href="#" class="header-bg" hoe-color-type="header-bg3">&nbsp;</a>
                            <a href="#" class="header-bg" hoe-color-type="header-bg4">&nbsp;</a>
                            <a href="#" id="h1" class="header-bg" hoe-color-type="header-bg5">&nbsp;</a>
                            <a href="#" class="header-bg" hoe-color-type="header-bg6">&nbsp;</a>
                            <a href="#" class="header-bg" hoe-color-type="header-bg7">&nbsp;</a>
                            <a href="#" class="header-bg" hoe-color-type="header-bg8">&nbsp;</a>
                            <a href="#" class="header-bg" hoe-color-type="header-bg9">&nbsp;</a>
                        </div>
                    </li>
                    <li class="theme-option">
                        <span class="sub-title">Left Panel BG Color Option</span>
                        <div id="theme-color">
                            <a href="#" class="lpanel-bg" hoe-color-type="lpanel-bg1">&nbsp;</a>
                            <a href="#" class="lpanel-bg" hoe-color-type="lpanel-bg2">&nbsp;</a>
                            <a href="#" class="lpanel-bg" hoe-color-type="lpanel-bg3">&nbsp;</a>
                            <a href="#" class="lpanel-bg" hoe-color-type="lpanel-bg4">&nbsp;</a>
                            <a href="#" id="i1" class="lpanel-bg" hoe-color-type="lpanel-bg5">&nbsp;</a>
                            <a href="#" class="lpanel-bg" hoe-color-type="lpanel-bg6">&nbsp;</a>
                            <a href="#" class="lpanel-bg" hoe-color-type="lpanel-bg7">&nbsp;</a>
                            <a href="#" class="lpanel-bg" hoe-color-type="lpanel-bg8">&nbsp;</a>
                            <a href="#" class="lpanel-bg" hoe-color-type="lpanel-bg9">&nbsp;</a>
                        </div>
                    </li>
                    <li class="theme-option">
                        <span class="sub-title">Logo Color BG Option</span>
                        <div id="theme-color">
                            <a href="#" class="logo-bg" hoe-color-type="logo-bg1">&nbsp;</a>
                            <a href="#" class="logo-bg" hoe-color-type="logo-bg2">&nbsp;</a>
                            <a href="#" class="logo-bg" hoe-color-type="logo-bg3">&nbsp;</a>
                            <a href="#" class="logo-bg" hoe-color-type="logo-bg4">&nbsp;</a>
                            <a href="#" id="j1" class="logo-bg" hoe-color-type="logo-bg5">&nbsp;</a>
                            <a href="#" class="logo-bg" hoe-color-type="logo-bg6">&nbsp;</a>
                            <a href="#" class="logo-bg" hoe-color-type="logo-bg7">&nbsp;</a>
                            <a href="#" class="logo-bg" hoe-color-type="logo-bg8">&nbsp;</a>
                            <a href="#" class="logo-bg" hoe-color-type="logo-bg9">&nbsp;</a>
                        </div>
                    </li>
                    <li class="theme-option">
                        <span class="sub-title">Theme Background BG Option</span>
                        <div id="theme-color">
                            <a href="#" class="theme-bg" hoe-themebg-type="bg1">&nbsp;</a>
                            <a href="#" class="theme-bg" hoe-themebg-type="bg2">&nbsp;</a>
                            <a href="#" class="theme-bg" hoe-themebg-type="bg3">&nbsp;</a>
                            <a href="#" class="theme-bg" hoe-themebg-type="bg4">&nbsp;</a>
                            <a href="#" id="k1" class="theme-bg" hoe-themebg-type="bg5">&nbsp;</a>
                            <a href="#" class="theme-bg" hoe-themebg-type="bg6">&nbsp;</a>
                            <a href="#" class="theme-bg" hoe-themebg-type="bg7">&nbsp;</a>
                            <a href="#" class="theme-bg" hoe-themebg-type="bg8">&nbsp;</a>
                            <a href="#" class="theme-bg" hoe-themebg-type="bg9">&nbsp;</a>
                        </div>
                    </li>
                    <li class="theme-option">
                        <span class="sub-title">Theme Layout</span>
                        <select id="theme-layout" class="form-control minimal input-sm">
                            <option name="theme-layout" value="wide-layout">Wide Layout</option>
                            <option name="theme-layout" value="box-layout">Boxed Layout</option> 
                        </select>
                    </li>
                    <li class="theme-option">
                        <span class="sub-title">SideBar Effect</span>
                        <select id="leftpanel-effect" class="form-control minimal input-sm">
                            <option name="lpanel-effect" value="shrink">Default</option>
                            <option name="lpanel-effect" value="overlay">Overlay</option>
                            <option name="lpanel-effect" value="push">Push</option>
                        </select>
                    </li>
                    <li class="theme-option">
                        <span class="sub-title">Navigation Type</span>
                        <select id="navigation-type" class="form-control minimal input-sm">
                            <option name="navigation-type" value="vertical">Vertical</option>
                            <option name="navigation-type" value="vertical-compact">Vertical Compact</option>
                            <option name="navigation-type" value="horizontal">Horizontal</option>
                            <option name="navigation-type" value="horizontal-compact">Horizontal compact</option>
                        </select>
                    </li>
                    <li class="theme-option">
                        <span class="sub-title">Navigation Side</span>
                        <select id="navigation-side" class="form-control minimal input-sm">
                            <option name="navigation-side" value="leftside">Left</option>
                            <option name="navigation-side" value="rightside">Right</option>
                        </select>
                    </li>
                    <li class="theme-option">
                        <span class="sub-title">Sidebar Position</span>
                        <select id="sidebar-position" class="form-control minimal input-sm">
                            <option name="sidebar-position" value="default">Default</option>
                            <option name="sidebar-position" value="fixed">Fixed</option>
                        </select>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->

    <script src="../bootstrap/js/jquery.js" type="text/javascript"></script>
    <script src="../bootstrap/js/jquery-ui.js"></script>
    <script src="../bootstrap/js/jquery.tinymce.min.js"></script>
    <script src="../dist/jquery.grideditor.js"></script>
    <script src="../dist/notify.js"></script>
    <script src="../dist/styles/metro/notify-metro.js"></script>


    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="../tema/js/bootstrap.min.js"></script>
    <script src="../tema/js/bootstrap-confirmation.js"></script>


    <script src="../tema/js/hoe.js"></script>
    <!-- Menu Toggle Script -->

    <script>
        $("#menu-toggle").click(function (e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled");
        });
    </script>
    <script>
        var userName = '';
        var nombreUsuario = '';
        var id_usuario = '';
        var userData = {};
        $(document).ready(function () {
            userName = '${pageContext.request.userPrincipal.name}';
            getNombreUsuario(userName);
            getIdUsuario(userName);

            $("#spnNombreUsuario").text('Usuario: ' + nombreUsuario);

            $("#mytable #checkall").click(function () {
                if ($("#mytable #checkall").is(':checked')) {
                    $("#mytable input[type=checkbox]").each(function () {
                        $(this).prop("checked", true);
                    });

                } else {
                    $("#mytable input[type=checkbox]").each(function () {
                        $(this).prop("checked", false);
                    });
                }
            });

            $("[data-toggle=tooltip]").tooltip();

        });


        function getNombreUsuario(xUserName) {
            var variables = {userName: xUserName};
            $.ajax({
                type: "post",
                url: "../usuarios/getNombreUsuario",
                data: variables,
                async: false,
                success: function (data) {
                    nombreUsuario = data;
                }
            });


        }

        function getIdUsuario(xUserName) {
            var variables = {userName: xUserName};
            $.ajax({
                type: "post",
                url: "../usuarios/getIdUsuario",
                data: variables,
                async: false,
                success: function (data) {
                    var usu = JSON.parse(data);
                    userData = JSON.parse(data);
                    id_usuario = usu.idUsuario;



                }
            });
        }
        function cerrarSesion() {
            //     console.log('Llamando el log out');
            $.ajax({
                url: "../usuarios/setLogout",
                type: "post",
                async: false,
                success: function (data) {
                    //console.log('Success');
                    location.reload();
                }
            });
        }


        $("#drpCerrarSesion").click(function () {
            cerrarSesion();
        });

    

    </script>

</body>

</html>