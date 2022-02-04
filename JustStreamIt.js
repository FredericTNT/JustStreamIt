const modal = document.getElementById("myModal");

const flechesGauche = document.getElementsByClassName("fleche gauche");
const listeCadres1 = document.getElementsByClassName("cadre 1");
const listeCadres2 = document.getElementsByClassName("cadre 2");
const listeCadres3 = document.getElementsByClassName("cadre 3");
const listeCadres4 = document.getElementsByClassName("cadre 4");
const listeCadres5 = document.getElementsByClassName("cadre 5");
const listeCadres6 = document.getElementsByClassName("cadre 6");
const listeCadres7 = document.getElementsByClassName("cadre 7");
const flechesDroite = document.getElementsByClassName("fleche droite");

flechesGauche[0].addEventListener('click', function(event) {filmGauche(flechesGauche[0].getAttribute("urlGauche"), 0)});
listeCadres1[0].addEventListener('click', function(event) {askDetail(listeCadres1[0].getAttribute("refId"))});
listeCadres2[0].addEventListener('click', function(event) {askDetail(listeCadres2[0].getAttribute("refId"))});
listeCadres3[0].addEventListener('click', function(event) {askDetail(listeCadres3[0].getAttribute("refId"))});
listeCadres4[0].addEventListener('click', function(event) {askDetail(listeCadres4[0].getAttribute("refId"))});
listeCadres5[0].addEventListener('click', function(event) {askDetail(listeCadres5[0].getAttribute("refId"))});
listeCadres6[0].addEventListener('click', function(event) {askDetail(listeCadres6[0].getAttribute("refId"))});
listeCadres7[0].addEventListener('click', function(event) {askDetail(listeCadres7[0].getAttribute("refId"))});
flechesDroite[0].addEventListener('click', function(event) {filmDroite(flechesDroite[0].getAttribute("urlDroite"), 0)});

flechesGauche[1].addEventListener('click', function(event) {filmGauche(flechesGauche[1].getAttribute("urlGauche"), 1)});
listeCadres1[1].addEventListener('click', function(event) {askDetail(listeCadres1[1].getAttribute("refId"))});
listeCadres2[1].addEventListener('click', function(event) {askDetail(listeCadres2[1].getAttribute("refId"))});
listeCadres3[1].addEventListener('click', function(event) {askDetail(listeCadres3[1].getAttribute("refId"))});
listeCadres4[1].addEventListener('click', function(event) {askDetail(listeCadres4[1].getAttribute("refId"))});
listeCadres5[1].addEventListener('click', function(event) {askDetail(listeCadres5[1].getAttribute("refId"))});
listeCadres6[1].addEventListener('click', function(event) {askDetail(listeCadres6[1].getAttribute("refId"))});
listeCadres7[1].addEventListener('click', function(event) {askDetail(listeCadres7[1].getAttribute("refId"))});
flechesDroite[1].addEventListener('click', function(event) {filmDroite(flechesDroite[1].getAttribute("urlDroite"), 1)});

flechesGauche[2].addEventListener('click', function(event) {filmGauche(flechesGauche[2].getAttribute("urlGauche"), 2)});
listeCadres1[2].addEventListener('click', function(event) {askDetail(listeCadres1[2].getAttribute("refId"))});
listeCadres2[2].addEventListener('click', function(event) {askDetail(listeCadres2[2].getAttribute("refId"))});
listeCadres3[2].addEventListener('click', function(event) {askDetail(listeCadres3[2].getAttribute("refId"))});
listeCadres4[2].addEventListener('click', function(event) {askDetail(listeCadres4[2].getAttribute("refId"))});
listeCadres5[2].addEventListener('click', function(event) {askDetail(listeCadres5[2].getAttribute("refId"))});
listeCadres6[2].addEventListener('click', function(event) {askDetail(listeCadres6[2].getAttribute("refId"))});
listeCadres7[2].addEventListener('click', function(event) {askDetail(listeCadres7[2].getAttribute("refId"))});
flechesDroite[2].addEventListener('click', function(event) {filmDroite(flechesDroite[2].getAttribute("urlDroite"), 2)});

flechesGauche[3].addEventListener('click', function(event) {filmGauche(flechesGauche[3].getAttribute("urlGauche"), 3)});
listeCadres1[3].addEventListener('click', function(event) {askDetail(listeCadres1[3].getAttribute("refId"))});
listeCadres2[3].addEventListener('click', function(event) {askDetail(listeCadres2[3].getAttribute("refId"))});
listeCadres3[3].addEventListener('click', function(event) {askDetail(listeCadres3[3].getAttribute("refId"))});
listeCadres4[3].addEventListener('click', function(event) {askDetail(listeCadres4[3].getAttribute("refId"))});
listeCadres5[3].addEventListener('click', function(event) {askDetail(listeCadres5[3].getAttribute("refId"))});
listeCadres6[3].addEventListener('click', function(event) {askDetail(listeCadres6[3].getAttribute("refId"))});
listeCadres7[3].addEventListener('click', function(event) {askDetail(listeCadres7[3].getAttribute("refId"))});
flechesDroite[3].addEventListener('click', function(event) {filmDroite(flechesDroite[3].getAttribute("urlDroite"), 3)});

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
	.getElementsByClassName("close")[0]
	.addEventListener('click', function() {modal.style.display = "none";});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
  }
});

function setStatusMessage(message){document.getElementById("logMessage").textContent = message};

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
					setStatusMessage("Echec de la connexion [topScore/détail]");
				})
		})
		.catch(function(err) {
			setStatusMessage("Echec de la connexion [topScore]");
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
			setStatusMessage("Echec de la connexion [askDetail");
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
			flechesDroite[categorie].setAttribute("urlDroite", requete);
			let lastFilm = 0;
			for (let i = 0; i < value.results.length && cadre < 8; i++) {
				document
					.getElementsByClassName("cadre " + cadre.toString())[categorie]
					.setAttribute("refId", value.results[i].id.toString());
				document
					.getElementsByClassName("cadre " + cadre.toString())[categorie]
					.setAttribute("src", value.results[i].image_url);
				lastFilm = i;
				cadre++;
			};
			flechesDroite[categorie].setAttribute("film", lastFilm.toString());
			if (value.next != null && cadre < 8) {
				filmsPage(value.next, categorie, cadre);
			};
		})
		.catch(function(err) {
			setStatusMessage("Echec de la connexion [filmsPage]");
		});
};

function filmNewDroite(requete, categorie) {
	fetch(requete)
		.then(function(res){
			if (res.ok) {
				return res.json();
			}
		})
		.then(function(value) {
			listeCadres7[categorie].setAttribute("refId", value.results[0].id.toString());
			listeCadres7[categorie].setAttribute("src", value.results[0].image_url);
			flechesDroite[categorie].setAttribute("film", "0");
			flechesDroite[categorie].setAttribute("urlDroite", requete);
		})
		.catch(function(err) {
			setStatusMessage("Echec de la connexion [filmNewDroite]");
		});
};

function filmDroite(requete, categorie) {
	fetch(requete)
		.then(function(res){
			if (res.ok) {
				return res.json();
			}
		})
		.then(function(value) {
			let lastFilm = parseInt(flechesDroite[categorie].getAttribute("film")) + 1;
			if (lastFilm < value.results.length || value.next != null) {
				let cadre = 2;
				for (let i = 1; i < 7; i++) {
					document
						.getElementsByClassName("cadre " + i.toString())[categorie]
						.setAttribute("src", document.getElementsByClassName("cadre " + cadre.toString())[categorie].getAttribute("src"));
					document
						.getElementsByClassName("cadre " + i.toString())[categorie]
						.setAttribute("refId", document.getElementsByClassName("cadre " + cadre.toString())[categorie].getAttribute("refId"));
					cadre++;
				};
				let firstFilm = parseInt(flechesGauche[categorie].getAttribute("film")) + 1;
				if (firstFilm < 5) {
					flechesGauche[categorie].setAttribute("film", firstFilm.toString());
				} else {
					flechesGauche[categorie].setAttribute("film", "0");
					flechesGauche[categorie].setAttribute("urlGauche", value.previous);
				};
			};
			if (lastFilm < value.results.length) {
				listeCadres7[categorie].setAttribute("refId", value.results[lastFilm].id.toString());
				listeCadres7[categorie].setAttribute("src", value.results[lastFilm].image_url);
				flechesDroite[categorie].setAttribute("film", lastFilm.toString());
			} else {
				if (value.next != null) {
					filmNewDroite(value.next, categorie);
				};
			};
		})
		.catch(function(err) {
			setStatusMessage("Echec de la connexion [filmDroite]");
		});
};

function filmNewGauche(requete, categorie) {
	fetch(requete)
		.then(function(res){
			if (res.ok) {
				return res.json();
			}
		})
		.then(function(value) {
			listeCadres1[categorie].setAttribute("refId", value.results[4].id.toString());
			listeCadres1[categorie].setAttribute("src", value.results[4].image_url);
			flechesGauche[categorie].setAttribute("film", "4");
			flechesGauche[categorie].setAttribute("urlGauche", requete);
		})
		.catch(function(err) {
			setStatusMessage("Echec de la connexion [filmNewGauche]");
		});
};

function filmGauche(requete, categorie) {
	fetch(requete)
		.then(function(res){
			if (res.ok) {
				return res.json();
			}
		})
		.then(function(value) {
			let firstFilm = parseInt(flechesGauche[categorie].getAttribute("film")) - 1;
			if (firstFilm > -1 || value.previous != null) {
				let cadre = 6;
				for (let i = 7; i > 1; i--) {
					document
						.getElementsByClassName("cadre " + i.toString())[categorie]
						.setAttribute("src", document.getElementsByClassName("cadre " + cadre.toString())[categorie].getAttribute("src"));
					document
						.getElementsByClassName("cadre " + i.toString())[categorie]
						.setAttribute("refId", document.getElementsByClassName("cadre " + cadre.toString())[categorie].getAttribute("refId"));
					cadre--;
				};
				let lastFilm = parseInt(flechesDroite[categorie].getAttribute("film")) - 1;
				if (lastFilm > -1) {
					flechesDroite[categorie].setAttribute("film", lastFilm.toString());
				} else {
					flechesDroite[categorie].setAttribute("film", "4");
					flechesDroite[categorie].setAttribute("urlDroite", value.next);
				};
			};
			if (firstFilm > -1) {
				listeCadres1[categorie].setAttribute("refId", value.results[firstFilm].id.toString());
				listeCadres1[categorie].setAttribute("src", value.results[firstFilm].image_url);
				flechesGauche[categorie].setAttribute("film", firstFilm.toString());
			} else {
				if (value.previous != null) {
					filmNewGauche(value.previous, categorie);
				};
			};
		})
		.catch(function(err) {
			setStatusMessage("Echec de la connexion [filmGauche]");
		});
};

function onLoaded(event) {
	const requeteBest = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score";
	topScore(requeteBest);
	flechesGauche[0].setAttribute("film", "0");
	flechesGauche[0].setAttribute("urlGauche", requeteBest);
	filmsPage(requeteBest, 0, 1);
//	filmDroite(flechesDroite[0].getAttribute("urlDroite"), 0);
	
	let requete = requeteBest + "&genre=Sport"
	flechesGauche[1].setAttribute("film", "0");
	flechesGauche[1].setAttribute("urlGauche", requete);
	filmsPage(requete, 1, 1);
	
	requete = requeteBest + "&genre=Comedy"
	flechesGauche[2].setAttribute("film", "0");
	flechesGauche[2].setAttribute("urlGauche", requete);
	filmsPage(requete, 2, 1);
	
	requete = requeteBest + "&genre=Animation"
	flechesGauche[3].setAttribute("film", "0");
	flechesGauche[3].setAttribute("urlGauche", requete);
	filmsPage(requete, 3, 1);
};

document.addEventListener('DOMContentLoaded', onLoaded);

