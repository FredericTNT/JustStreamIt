const modal = document.getElementById("myModal");

document
	.getElementById("meilleurFilm")
	.addEventListener('click', function(event) {
		askDetail(document.getElementById("meilleurFilm").getAttribute("refId"));
	});

document
	.getElementById("moreInfo")
	.addEventListener('click', function(event) {
		askDetail(document.getElementById("meilleurFilm").getAttribute("refId"));
	});

document
	.getElementsByClassName("cadre 1")[0]
	.addEventListener('click', function(event) {
		askDetail(document.getElementsByClassName("cadre 1")[0].getAttribute("refId"));
	});

document
	.getElementsByClassName("cadre 2")[0]
	.addEventListener('click', function(event) {
		askDetail(document.getElementsByClassName("cadre 2")[0].getAttribute("refId"));
	});

document
	.getElementsByClassName("cadre 3")[0]
	.addEventListener('click', function(event) {
		askDetail(document.getElementsByClassName("cadre 3")[0].getAttribute("refId"));
	});

document
	.getElementsByClassName("cadre 4")[0]
	.addEventListener('click', function(event) {
		askDetail(document.getElementsByClassName("cadre 4")[0].getAttribute("refId"));
	});

document
	.getElementsByClassName("cadre 5")[0]
	.addEventListener('click', function(event) {
		askDetail(document.getElementsByClassName("cadre 5")[0].getAttribute("refId"));
	});

document
	.getElementsByClassName("cadre 6")[0]
	.addEventListener('click', function(event) {
		askDetail(document.getElementsByClassName("cadre 6")[0].getAttribute("refId"));
	});

document
	.getElementsByClassName("cadre 7")[0]
	.addEventListener('click', function(event) {
		askDetail(document.getElementsByClassName("cadre 7")[0].getAttribute("refId"));
	});

document
	.getElementsByClassName("cadre 1")[1]
	.addEventListener('click', function(event) {
		askDetail(document.getElementsByClassName("cadre 1")[1].getAttribute("refId"));
	});

document
	.getElementsByClassName("cadre 2")[1]
	.addEventListener('click', function(event) {
		askDetail(document.getElementsByClassName("cadre 2")[1].getAttribute("refId"));
	});

document
	.getElementsByClassName("cadre 3")[1]
	.addEventListener('click', function(event) {
		askDetail(document.getElementsByClassName("cadre 3")[1].getAttribute("refId"));
	});

document
	.getElementsByClassName("cadre 4")[1]
	.addEventListener('click', function(event) {
		askDetail(document.getElementsByClassName("cadre 4")[1].getAttribute("refId"));
	});

document
	.getElementsByClassName("cadre 5")[1]
	.addEventListener('click', function(event) {
		askDetail(document.getElementsByClassName("cadre 5")[1].getAttribute("refId"));
	});

document
	.getElementsByClassName("cadre 6")[1]
	.addEventListener('click', function(event) {
		askDetail(document.getElementsByClassName("cadre 6")[1].getAttribute("refId"));
	});

document
	.getElementsByClassName("cadre 7")[1]
	.addEventListener('click', function(event) {
		askDetail(document.getElementsByClassName("cadre 7")[1].getAttribute("refId"));
	});

document
	.getElementsByClassName("cadre 1")[2]
	.addEventListener('click', function(event) {
		askDetail(document.getElementsByClassName("cadre 1")[2].getAttribute("refId"));
	});

document
	.getElementsByClassName("cadre 2")[2]
	.addEventListener('click', function(event) {
		askDetail(document.getElementsByClassName("cadre 2")[2].getAttribute("refId"));
	});

document
	.getElementsByClassName("cadre 3")[2]
	.addEventListener('click', function(event) {
		askDetail(document.getElementsByClassName("cadre 3")[2].getAttribute("refId"));
	});

document
	.getElementsByClassName("cadre 4")[2]
	.addEventListener('click', function(event) {
		askDetail(document.getElementsByClassName("cadre 4")[2].getAttribute("refId"));
	});

document
	.getElementsByClassName("cadre 5")[2]
	.addEventListener('click', function(event) {
		askDetail(document.getElementsByClassName("cadre 5")[2].getAttribute("refId"));
	});

document
	.getElementsByClassName("cadre 6")[2]
	.addEventListener('click', function(event) {
		askDetail(document.getElementsByClassName("cadre 6")[2].getAttribute("refId"));
	});

document
	.getElementsByClassName("cadre 7")[2]
	.addEventListener('click', function(event) {
		askDetail(document.getElementsByClassName("cadre 7")[2].getAttribute("refId"));
	});

document
	.getElementsByClassName("cadre 1")[3]
	.addEventListener('click', function(event) {
		askDetail(document.getElementsByClassName("cadre 1")[3].getAttribute("refId"));
	});

document
	.getElementsByClassName("cadre 2")[3]
	.addEventListener('click', function(event) {
		askDetail(document.getElementsByClassName("cadre 2")[3].getAttribute("refId"));
	});

document
	.getElementsByClassName("cadre 3")[3]
	.addEventListener('click', function(event) {
		askDetail(document.getElementsByClassName("cadre 3")[3].getAttribute("refId"));
	});

document
	.getElementsByClassName("cadre 4")[3]
	.addEventListener('click', function(event) {
		askDetail(document.getElementsByClassName("cadre 4")[3].getAttribute("refId"));
	});

document
	.getElementsByClassName("cadre 5")[3]
	.addEventListener('click', function(event) {
		askDetail(document.getElementsByClassName("cadre 5")[3].getAttribute("refId"));
	});

document
	.getElementsByClassName("cadre 6")[3]
	.addEventListener('click', function(event) {
		askDetail(document.getElementsByClassName("cadre 6")[3].getAttribute("refId"));
	});

document
	.getElementsByClassName("cadre 7")[3]
	.addEventListener('click', function(event) {
		askDetail(document.getElementsByClassName("cadre 7")[3].getAttribute("refId"));
	});

document
	.getElementsByClassName("fleche gauche")[0]
	.addEventListener('click', function(event) {
		filmOne(document.getElementsByClassName("fleche gauche")[0].getAttribute("urlGauche"), 0, false);
	});

document
	.getElementsByClassName("fleche droite")[0]
	.addEventListener('click', function(event) {
		filmOne(document.getElementsByClassName("fleche droite")[0].getAttribute("urlDroite"), 0, true);
	});

document
	.getElementsByClassName("fleche droite")[1]
	.addEventListener('click', function(event) {
		filmOne(document.getElementsByClassName("fleche droite")[1].getAttribute("urlDroite"), 1, true);
	});

document
	.getElementsByClassName("close")[0]
	.addEventListener('click', function() {modal.style.display = "none";});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
  }
});

function topScore(requete) {
	fetch(requete)
		.then(function(res){
			if (res.ok) {
				return res.json();
			}
		})
		.then(function(value) {
			fetch("http://localhost:8000/api/v1/titles/" + value.results[0].id.toString())
				.then(function(res){
					if (res.ok) {
						return res.json();
					}
				})
				.then(function(value) {
					document
						.getElementById("meilleurFilm")
						.setAttribute("src", value.image_url);
					document
						.getElementById("meilleurFilm")
						.setAttribute("refId", value.id.toString());
					document
						.getElementById("topTitre")
						.textContent = value.title;
					document
						.getElementById("topResume")
						.textContent = value.description;
				})
				.catch(function(err) {
					console.log("Erreur");
				})
		})
		.catch(function(err) {
			console.log("Erreur");
		})
};


function askDetail(refId) {
	fetch("http://localhost:8000/api/v1/titles/" + refId)
		.then(function(res){
			if (res.ok) {
				return res.json();
			}
		})
		.then(function(value) {
			document
				.getElementById("pochette")
				.setAttribute("src", value.image_url);
			document
				.getElementById("titre")
				.textContent = value.title;
			document
				.getElementById("genres")
				.textContent = value.genres;
			document
				.getElementById("dateSortie")
				.textContent = value.date_published;
			document
				.getElementById("rated")
				.textContent = value.rated;
			document
				.getElementById("imdb")
				.textContent = value.imdb_score;
			document
				.getElementById("realisateurs")
				.textContent = value.directors;
			document
				.getElementById("acteurs")
				.textContent = value.actors;
			document
				.getElementById("duree")
				.textContent = value.duration;
			document
				.getElementById("pays")
				.textContent = value.countries;
			document
				.getElementById("boxOffice")
				.textContent = value.worldwide_gross_income;
			document
				.getElementById("resume")
				.textContent = value.long_description;
			modal.style.display = 'block';
		})
		.catch(function(err) {
			console.log("Erreur");
		})
};

function filmsPage(requete, categorie, cadre) {
	fetch(requete)
		.then(function(res){
			if (res.ok) {
				return res.json();
			}
		})
		.then(function(value) {
			document
				.getElementsByClassName("fleche droite")[categorie]
				.setAttribute("urlDroite", requete);
			for (let i = 0; i < value.results.length && cadre < 8; i++) {
				document
					.getElementsByClassName("cadre " + cadre.toString())[categorie]
					.setAttribute("refId", value.results[i].id.toString());
				document
					.getElementsByClassName("cadre " + cadre.toString())[categorie]
					.setAttribute("src", value.results[i].image_url);
				cadre++;
			};
			if (value.next != null && cadre < 8) {
				filmsPage(value.next, categorie, cadre);
			};
		})
		.catch(function(err) {
			console.log("Erreur");
		});
};

function filmOne(requete, categorie, droite) {
	let cadre = 2;
	for (let i = 1; i < 8; i++) {
		document
			.getElementsByClassName("cadre " + i.toString())[categorie]
			.setAttribute("src", document.getElementsByClassName("cadre " + cadre.toString())[categorie].getAttribute("src"));
		document
			.getElementsByClassName("cadre " + i.toString())[categorie]
			.setAttribute("refId", document.getElementsByClassName("cadre " + cadre.toString())[categorie].getAttribute("refId"));
		cadre++;
	};
	fetch(requete)
		.then(function(res){
			if (res.ok) {
				return res.json();
			}
		})
		.then(function(value) {
			document
				.getElementById("variable")
				.textContent = requete;
		})
		.catch(function(err) {
			console.log("Erreur");
		});
};

function onLoaded(event) {
	const requeteBest = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score";
	topScore(requeteBest);
	document
		.getElementsByClassName("fleche gauche")[0]
		.setAttribute("urlGauche", requeteBest);
	filmsPage(requeteBest, 0, 1);
	
	const requeteThriller = "http://localhost:8000/api/v1/titles/?genre=Thriller&sort_by=-imdb_score";
	document
		.getElementsByClassName("fleche gauche")[1]
		.setAttribute("urlGauche", requeteThriller);
	filmsPage(requeteThriller, 1, 1);
	
	const requeteComedy = "http://localhost:8000/api/v1/titles/?genre=Comedy&sort_by=-imdb_score";
	document
		.getElementsByClassName("fleche gauche")[2]
		.setAttribute("urlGauche", requeteComedy);
	filmsPage(requeteComedy, 2, 1);
	
	const requeteAction = "http://localhost:8000/api/v1/titles/?genre=Action&sort_by=-imdb_score"
	document
		.getElementsByClassName("fleche gauche")[3]
		.setAttribute("urlGauche", requeteAction);
	filmsPage(requeteAction, 3, 1);
}

document.addEventListener('DOMContentLoaded', onLoaded);

