/*  

TRABAJO PRACTICO FINAL: NETFLIX ROULETTE

En el siguiente trabajo practico utilizaremos la api de Netflix Roulette para traer información peliculas o series sugeridas de un director.

Consignas:

HEADER:
- La página debe contar con un header con una imagen que al clickearla nos recargue la página.

BODY
- Debemos contar con un input en donde el usuario pueda ingresar el nombre del director.
- Tambien habrá un boton de "Buscar" o una lupa, el cual al presionarlo realizará nuestra busqueda de peliculas del director en la api de netflix.
- Cuando estemos buscando, deberemos mostrar un icono de "Cargando resultados..." en la pagina, el cual desaparecera cuando aparezca el resultado.
- Por cada resultado obtenido deberemos renderizar:
	- Nombre de la pelicula o serie
	- Imagen
	- Sinopsis
	- Si es pelicula o serie
	- Ranking de netflix
	- Año


FOOTER
- En el footer debemos tener informacion relevante con respecto al: autor, año, links a redes sociales
- El footer tambien debe contar con un ancla que nos lleve hacia arriba de todo de la página.


URLS de ejemplo para hacer Ajax Requests:
http://netflixroulette.net/api/api.php?director=quentin%20tarantino
http://netflixroulette.net/api/api.php?director=George%20Lucas

BONUS: crear 1 input mas donde pueda ingresar el nombre del actor.
Este input funcionara como filtro para nuestra busqueda ajax:
Ej: http://netflixroulette.net/api/api.php?director=quentin%20tarantino&actor=waltz

*/

var button = $('#search');
var infoSection = $('.information');

button.on('click', function(e) {

	e.preventDefault();

	infoSection.html('');

	var input = $('#director');
	var findDirector = input.val();
	var getDirectorUrl = "http://netflixroulette.net/api/api.php?director=" + findDirector
	var inputActor = $('#actor');
	var findActor = inputActor.val();
	var getActorUrl = 'http://netflixroulette.net/api/api.php?actor=' + findActor

	$.ajax({
		url: getDirectorUrl,
		dataType: 'json',
		success: function( dataReceived ) {

			var movieInfo = dataReceived;

			for (var i = 0; i < movieInfo.length; i++) {

				var movieTitle = '<h2>' + movieInfo[i].show_title + '</h2>';
				var movieImage = '<img src ="' + movieInfo[i].poster +'">';
				var movieSummary = '<p>' + movieInfo[i].summary; + '</p>';
				var movieRating = '<p class="rating">' + movieInfo[i].rating + '</p>';
				var movieYear = '<p> Release Year: ' + movieInfo[i].release_year + '</p>';
				var movieCategory = '<p> Category: ' + movieInfo[i].category + '</p>';
				var movieDirector = '<p> Director: ' + movieInfo[i].director + '</p>';

				infoSection.append(movieImage);
				infoSection.append(movieTitle);
				infoSection.append(movieSummary);
				infoSection.append(movieRating);
				infoSection.append(movieYear);
				infoSection.append(movieCategory);
				infoSection.append(movieDirector);
			}


			window.onscroll = function() {
				scrollFunction()
			};

			function scrollFunction() {
				if ( document.body.scrollTop > 20 || document.documentElement.scrollTop > 20 ) {
					document.getElementById('go-top').style.display = 'block';
				} else {
					document.getElementById('go-top').style.display = 'none';
				}
			}

			function topFunction() {
				document.body.scrollTop = 0;
				document.documentElement.scrollTop = 0;
			}

		},

		error: function(data) {

			var oError = '<p>' + 'No se han encontrado resultados. Pruebe ingresando otro nombre' + '</p>';

				infoSection.append(oError);
			}
	})

	$.ajax({
		url: getActorUrl,
		dataType: 'json',
		success: function ( dataReceived ) { 

			var actorInfo = dataReceived;

			for (var i = 0; i < actorInfo.length; i++) {

				var movieTitle = '<h2>' + actorInfo[i].show_title + '</h2>';
				var movieImage = '<img src ="' + actorInfo[i].poster +'">';
				var movieSummary = '<p>' + actorInfo[i].summary; + '</p>';
				var movieRating = '<p class="rating">' + actorInfo[i].rating + '</p>';
				var movieYear = '<p> Release Year: ' + actorInfo[i].release_year + '</p>';
				var movieCategory = '<p> Category: ' + actorInfo[i].category + '</p>';
				var movieDirector = '<p> Director: ' + actorInfo[i].director + '</p>';

				infoSection.append(movieImage);
				infoSection.append(movieTitle);
				infoSection.append(movieSummary);
				infoSection.append(movieRating);
				infoSection.append(movieYear);
				infoSection.append(movieCategory);
				infoSection.append(movieDirector);
			}

		}
	})


})
