	$(window).scroll(function() {


	/* SCROLLTO MÁS EVENTOS */

	var windscroll = $(window).scrollTop();
	    if (windscroll >= 600) {
	        $('.allnav').addClass('fixed');
	        $('.wrapper section').each(function(i) {
	            if ($(this).position().top <= windscroll - 74) {
	                $('#nav #contentnav ul#menu li.select').removeClass('select');
	                $('#nav #contentnav ul#menu li').eq(i).addClass('select');
	               	// $("#submenu").slideUp(); 
	            }
	        });

	    } else {
	        $('.allnav').removeClass('fixed');
	        $('#nav #contentnav ul#menu li.select').removeClass('select');
	       	$('#nav #contentnav ul#menu li:first').addClass('select');

		}
	}).scroll();



	$(document).ready(function(){

		/* PARALLAX */
		$(".imgslider1").parallax("0", 0.3);
		$(".imgslider2").parallax("0", 0.3);
		$(".imgslider3").parallax("0", 0.3);
		$(".titleslider").parallax("0", 0.5);


		/* SCROLLTO */

		$('.allnav #contentnav ul#menu li').on('click', function() {
		    var scrollAnchor = $(this).attr('data-scroll'),scrollPoint = $('section[data-anchor="' + scrollAnchor + '"]').offset().top - 74;
		    $('body,html').animate({
		    	scrollTop: scrollPoint
		    }, 800, 'swing');
		    return false;
		})

		$('a[href^="#"]').on('click',function (e) {
			    e.preventDefault();

			    var target = this.hash;
			    var $target = $(target);

			    $('html, body').stop().animate({
			        'scrollTop': $target.offset().top - 74
			    }, 800, 'swing', function () {
			        window.location.hash = $target;
			    });
		});

		/*   ajax   */
		inici();


		/* EVENTOS BOTONERA*/
		// los he movido, se activan al cargarse los productos 
	
	});


		
	/* BOTONERA MOVIL RESIZE */


	$(window).on("load resize scroll", function (e) {


	  if ($(window).width() <= 960) {

			var contador=1;
	    	$('#menu li#proyectos').unbind('mouseenter mouseleave hover');
	    	$('#submenu').slideUp=false;
	    	$('#submenu').slideDown=false;


			$('#menu_bar').click(function(){
				if(contador == 1){
					$('#contentnav').animate({left:'0'},{queue:false,duration:300,ease:"easeInQuad"});
					$("#wrapper").css("overflow","hidden");
					// $('#contentnav').css("height","100%");
					contador = 0;

				} else {
					$('#contentnav').animate({left:'-100%'},{queue:false,duration:300,ease:"easeInQuad"});
					$("#wrapper").css("overflow","scroll");
					// $('#contentnav').css("height","0");
					contador = 1;
				}
			});

			$('#menu li').click(function(){
				var contador=0;
				if(contador == 1){
					$('#contentnav').animate({left:'0'},{queue:false,duration:300,ease:"easeInQuad"});
					// $('#contentnav').css("height","100%");
					contador = 0;

				} else {
					$('#contentnav').animate({left:'-100%'},{queue:false,duration:300,ease:"easeInQuad"});
					// $('#contentnav').css("height","0");
					contador = 1;
				}
			});

			$('#submenu div').click(function(){
				var contador=0;
				if(contador == 1){
					$('#contentnav').animate({left:'0'},{queue:false,duration:300,ease:"easeInQuad"});
					// $('#contentnav').css("height","100%");
					contador = 0;

				} else {
					$('#contentnav').animate({left:'-100%'},{queue:false,duration:300,ease:"easeInQuad"});
					// $('#contentnav').css("height","0");
					contador = 1;
				}
			});
			
	  	} else {
	   		$('#menu li#proyectos').bind('mouseenter mouseleave hover');
	   		$('#submenu').slideUp=true;
	    	$('#submenu').slideDown=true;
	    	$('#contentnav').animate({left:'0'},{queue:false,duration:300,ease:"easeInQuad"});
	    	// $('#contentnav').css("left","0px");
	    	$('#menu li').click(function(){
	    		$('#contentnav').animate({left:'0'},{queue:false,duration:300,ease:"easeInQuad"});
	    		// $('#contentnav').css("left","0px");
			});
			$('#submenu div').click(function(){
				$('#contentnav').animate({left:'0'},{queue:false,duration:300,ease:"easeInQuad"});
	    		// $('#contentnav').css("left","0px");
			});	     	
	 	}

	});




/*	$(document).ready(inici);*/

	/* IMAGENES SLIDE */
	$(function(){
	    $('#slider div:gt(0)').hide();
	    setInterval(function(){
	      $('#slider div:first-child').fadeOut(1000)
	         .next('div').fadeIn(1000)
	         .end().appendTo('#slider');}, 6000);
	});	

	/* IMAGENES PROYECTOS */
	var image_cover=[];
	var image=[];
    var title=[];
    var description=[];
    var tipo=[];
    var news=[];
    var visualizables=[]; // lista visualizables (tras seleccion proyectos)
    var visualizados=[]; // lista visualizables por paginación;
    
    var indice;
   	var subsecciones=[]; // proyectos por tipo
   	var tipodeproyecto;

	/* paginador proyectos */
	var projectsPerPage = 8;
	var currentPage = 0;
	var totalPages = 0;

    function inici() {
        $.ajax({
            type: "GET",
            url: "proyectos.xml",
            dataType: "xml",
            success: function(xml) {
                $(xml).find('dato').each(function(){
                	image_cover.push($(this).find('image_cover').text());
                	image.push($(this).find('image').text());
                	title.push($(this).find('title').text());
                	description.push($(this).find('description').text());
                	tipo.push($(this).find('tipo').text());
                	news.push($(this).find('news').text());
                });                    
                empezar();
            }
        });
		
		$("#pag-prev").click(navPage);
		$("#pag-next").click(navPage);
    }


    function empezar(){
    		
    	// Creo subapartados // 
		$("#menu li#proyectos").append("<div id='submenu' class='subnav'></div>");
		for (k=0;k<tipo.length;k++){
			if(subsecciones.indexOf(tipo[k])<0){
				subsecciones.push(tipo[k]);
			}
    	}

    	// Creo los apartados en subsecciones ya filtardos// 
    	for (k=0;k<subsecciones.length;k++){
    		$("#submenu").append("<div id='a"+k+"' class='proyectoselect'>"+ subsecciones[k] +"</div>");
    		}

		//Eventos Submenu//

		$('#menu li#proyectos').hover(function(){
		     $('#submenu').stop().slideDown(300),"swing";        
		},
		function(){
		     $('#menu li#proyectos #submenu').stop().slideUp(300),"swing";          
		});


		//Eventos LI#PROYECTOSS//

		$("#menu li#proyectos #trip").click(function(){
			$('#menu li#proyectos #submenu').slideUp(300),"swing";
            $("#menu li").removeClass('select');
			$("#menu li#proyectos").addClass('select');			
			$("#contenido").html("");
			abrirotravez();

        });


        //Link de tipo//
    	$("#menu li#proyectos #submenu div").click(buscar);



		/* EVENTOS BOTONERA*/

		$('#nav #contentnav ul#menu li').on('mouseout', function(){
			$('#nav #contentnav ul#menu li').removeClass('active');
		});

		$('#nav #contentnav ul#menu li').on('mouseover', function(event){
			$('#nav #contentnav ul#menu li').removeClass('active');
			$(this).addClass('active');
		});

		$('#nav #contentnav ul#menu li').click(function () {
			$('#nav #contentnav ul#menu li').removeClass('select');
			$(this).addClass('select');
			$('#nav #contentnav ul#menu li.select').unbind('mouseover');
		});  


    	//IR A LA FUNCIÓN IMÁGENES//
    	imagenes();
    }

    function abrirotravez(){
    	/* CARGAR TODAS LAS IMÁGENES DE NUEVO*/
    	$("#contenido").html("");
    	$("#submenu").remove();
    	tipodeproyecto=undefined;
    	empezar();
    }

    function buscar(){
    	/* He hecho click en una subseccion*/
    	$('#submenu').stop().slideUp(300),"swing";  
    	var antiguo=$("#"+indice);
    	indice=$(this).index();
    	tipodeproyecto=subsecciones[indice];
    	imagenes();
    }


    function imagenes(){

    	visualizables=[];
	 	
    	visualizados=[];

    	// listamos todos los visualizables segun tipo seleccionado

	 	if (tipodeproyecto==undefined) {
    	//Carga de imagenes//  	
	    	for (k=0;k<tipo.length;k++){

	    		// $("#contenido").append("<li id='c"+(k+1)+"' class='images'><div class='imgs'><img src ='"+image_cover[k]+"'><div class='backg'></div><div class='titulo'>"+title[k]+"</div><div class='descripcion'>"+description[k]+"</div></div><div id='fle'><div id='tria'></div></div></li>")
	    			visualizables.push(k);		    			 			
			}
		} else {
			for (k=0;k<tipo.length;k++){
				    	   	if (tipodeproyecto==tipo[k]) {
				    	   		visualizables.push(k);
				    	   	}
			}
		    indice=undefined;
		};   	

		totalPages = Math.ceil(visualizables.length/projectsPerPage);

		iniciaPaginador();
		muestraImagenes();
	}


	function muestraImagenes(){

		$("#contenido").html("");	    	   
		
		visualizados.splice(0,visualizados.length);

		for (k=(currentPage-1)*projectsPerPage; k<currentPage*projectsPerPage && k<visualizables.length; k++){
			$("#contenido").append("<li id='c"+(k+1)+"' class='images'><div class='imgs'><img src ='"+image_cover[visualizables[k]]+"'><div class='backg'></div><div class='titulo'>"+title[visualizables[k]]+"</div><div class='descripcion'>"+description[visualizables[k]]+"</div></div><div id='fle'><div id='tria'></div></div></li>")
			visualizados.push(visualizables[k]);
		}

		$("#contenido").append("<div id='cc' data-anchor='cc'></div>");
	    $("#contenido .images").css("opacity","0");
	    $("#contenido .images:first-child").animate({"opacity":"1"},{queue:false,duration:250,complete:continuaAnimacion,ease:"easeInQuad"});

    }


    /* PAGINADOR */

	function iniciaPaginador() {
		//siempre reset de la current page

		currentPage = 1;
		if (totalPages<=1){
			// ocultar paginador (1 página o menos)
			$("#pag").css("display","none");
		}else{
			// generar números
			$("#pag-numbers").html("");
			for (page=1; page<=totalPages; page++){
				$("#pag-numbers").append ("<div class='number' id='pagenum-"+page+"'> "+page+" </div>");
			}
			$(".number").click(clickNumber);
			$("#pagenum-1").addClass ("select");
			$("#pag").css("display","block");

		}

	}

	function clickNumber (ev){
		$('html, body').animate({scrollTop:$('#proyects').offset().top - 74}, 'slow');
		$(".number").removeClass("select");
		$(this).addClass ("select");
		currentPage=$(this).attr("id").split("-")[1];
		muestraImagenes();
	}


	function navPage (ev){
		// mofificamos currentPage
		if ($(this).attr("id").split("-")[1]=="prev"){
			currentPage--;
		}else{
			currentPage++;
		}

		// comprobamos integridad de currentPage
		if (currentPage>totalPages){currentPage=1};
		if (currentPage<1){currentPage=totalPages};

		// pasamos la clase select al número que toque
		$(".number").removeClass("select");
		$("#pagenum-"+currentPage).addClass ("select");
		$('html, body').animate({scrollTop:$('#proyects').offset().top - 74}, 'slow');
		// movemospagina
		muestraImagenes();

	}


    function continuaAnimacion(){	
	var nextChild=$(this).index()+2;
	if (nextChild<$("#contenido").children().length){
		$("#contenido .images:nth-child("+nextChild+")").animate({"opacity":"1"},{queue:false,duration:200,complete:continuaAnimacion,ease:"easeInQuad"});
	}else{
		$("#contenido .images").click(clicarImagen);

		$("#contenido .images").mouseover(function(){
			$(this).find(".backg").animate({"opacity":"0.8"},{queue:false,duration:300,ease:"easeInQuad"});
			$(this).find(".titulo").animate({"opacity":"1"},{queue:false,duration:300,ease:"easeInQuad"});
			$(this).find(".descripcion").animate({"opacity":"1"},{queue:false,duration:300,ease:"easeInQuad"});
			});

		$("#contenido .images").mouseout(function(){
			$(this).find(".backg").animate({"opacity":"0"},{queue:false,duration:300,ease:"easeInQuad"});
			$(this).find(".titulo").animate({"opacity":"0"},{queue:false,duration:300,ease:"easeInQuad"});
			$(this).find(".descripcion").animate({"opacity":"0"},{queue:false,duration:300,ease:"easeInQuad"});
			});

		}
	}


	function clicarImagen(){
    	if (indice!=$(this).attr("id").substr(1,3) && indice!=undefined) {
    		cerrar(indice,$(this).attr("id").substr(1,3));
    	} else {	
	    	indice=$(this).attr("id").substr(1,3);
	    	abrir(indice);
    	}
    }


    function abrir(z){
    	$("#cc").html("");
		$("#c"+z).find("#fle").css("display","block");
    	
    	//Saber dónde colocar cc    	
    	var actual=$("#c"+z).position().top;
		for (k=Number(z)+1;k<=visualizables.length && k<=currentPage*projectsPerPage;k++) {
    		if(actual!=$("#c"+k).position().top){
    			$("#cc").insertBefore("#c"+k);
    			break;
    		};
    	};

    	if(k>currentPage*projectsPerPage){
    		$("#cc").insertAfter("#c"+currentPage*projectsPerPage);
    	} else {
  			$("#cc").insertBefore("#c"+k);	
    	}

    	indice=z;
    	z=z-1;
    	var cacho=image[visualizables[z]];
    	var imgss=cacho.split("*");
    	$("#cc").css("display","block");
    	$("#cc").append("<div id='generalproyect'></div>");
    	$("#generalproyect").css("display","inline-block"); 

    	$("#generalproyect").append("<div class='titleproyect'>"+title[visualizables[z]]+"</div><div id='cierra'><img src='images/cierra.png'></div>");
    	var suma=0;
    	var contador=0;
		for (k=0; k<imgss.length-1;k++){
			if (String(imgss[k]).substr(0,6)=="motion"){
	    		$("#generalproyect").append("<video controls>"+
	    			"<source id='pr"+k+"' src='"+imgss[k]+".mp4' type='video/mp4' >+"+
	    			"<source id='pr"+k+"' src='"+imgss[k]+".webm' type='video/webm'></video");
    				suma=suma+(600);
    				contador=contador+1;
    				acabado();   				
	    		} else {
	    		$("#generalproyect").append("<img id='pr"+k+"' src='"+imgss[k]+"'>");
	    		$("#pr"+k).load(function() {
    				suma=suma+($(this).height());
    				contador=contador+1;
    				if (contador>=imgss.length-1){
    					var altura=$("#generalproyect").height();
    					acabado();
    				}
    			});
	    		}
	    	
	    	}
	    	$('html, body').animate({scrollTop:$('#generalproyect').offset().top - 300}, "swing");
	    	$("#generalproyect").append("<div class='descriproyect'>"+description[visualizables[z]]+"</div><div class='newproyect'>"+news[visualizables[z]]+"</div>");    	
    }

    function acabado(){    
    	var altura=$("#generalproyect").height();	      	
    	$("#cc").animate({"height":altura},800,"swing");
    	$("#cierra").click(function(){
    		$('html, body').animate({scrollTop:$('#proyects').offset().top - 74}, "swing"); 
    	cerrar();
    	});  
    }


    function cerrar(z,w){
    	$("#cc").animate({"height":'0px'},600,"swing",function(){final(w);});
    }

    function final(w){
    	$("#contenido li").find("#fle").css("display","none");
    	$("#cc").css("display","none");
    	$("#cc").html("");
    	if (w!=undefined) {
    		abrir(w);
    	}
    }

    function sendmail(ev){

		var to="hola@conmuchococo.com";
		var subject="muchococo contact form";
		var name=$("#name").val();
		var email=$("#email").val();
		var message=$("#message").val();
		var human=$("#human").val();

		var datos="name="+name+"&email="+email+"&message="+message+"&human="+human;

		$.ajax({
            type: "POST",
            data: datos,
            url: "sendmail.php",
            dataType: "text",
            success: function(feedback) {
            	$("#contacto-result").html(feedback);
            },
	        error: function(feedback) {
            	alert ("AJAX ERROR: "+feedback);
            }
		});
	
}