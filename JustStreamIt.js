const serveurWeb = "http://localhost:8000/"
const entryPoint = serveurWeb + "api/v1/titles/"
const categories = [document.getElementsByClassName("conteneur")[0].children]
const films = [];
const modal = document.getElementById("myModal");

class Vignette {
	constructor(refId, url) {
		this.refId = refId;
		this.url = url;
	}
};

function initListener() {
	for (let i = 0; i < categories.length; i++) {
		categories[i][0].addEventListener('click', function(event) {filmGauche(i)});
		categories[i][8].addEventListener('click', function(event) {filmDroite(i)});
		for (let j = 1; j < 8; j++) {
			categories[i][j].addEventListener('click', function(event) {askDetail(categories[i][j].getAttribute("refId"))});
		};
	};
	document.getElementById("meilleurFilm").addEventListener('click', function(event) {
			askDetail(document.getElementById("meilleurFilm").getAttribute("refId"));
	});
	document.getElementById("moreInfo").addEventListener('click', function(event) {moreFilms()});
	document.getElementsByClassName("close")[0].addEventListener('click', function() {modal.style.display = "none";});
};

function tableauFilms(requete, nombre, categorie, firstFilm, listeVignettes) {
	fetch(requete)
		.then(function(res){
			if (res.ok) {
				return res.json();
			}
		})
		.then(function(value) {
			for (let i = 0; i < value.results.length && listeVignettes.length < nombre; i++) {
				let myVignette = new Vignette(value.results[i].id.toString(), value.results[i].image_url);
				listeVignettes.push(myVignette);
			};
			if (value.next != null && listeVignettes.length < nombre) {
				tableauFilms(value.next, nombre, categorie, firstFilm, listeVignettes);
			} else {
				afficherFilms(listeVignettes, firstFilm, categorie);
				categories[categorie][8].setAttribute("url", value.next);
			};
		})
		.catch(function(err) {
			setStatusMessage("[tableauFilms] " + err);
		});
};
	
function afficherFilms(listeVignettes, firstFilm, categorie) {
	let cadre = 1;
	let lastFilm = firstFilm + 7;
	if (listeVignettes.length < lastFilm) {lastFilm = listeVignettes.length};
	for (let i = firstFilm; i < lastFilm; i++) {
		categories[categorie][cadre].setAttribute("refId", listeVignettes[i].refId);
		categories[categorie][cadre].setAttribute("src", listeVignettes[i].url);
		cadre++
	};
	categories[categorie][0].setAttribute("film", firstFilm);
	if (firstFilm == 0) {
		categories[categorie][0].disabled = true;
		categories[categorie][0].style.color = "grey";
	};
	if (lastFilm == listeVignettes.length) {
		categories[categorie][8].disabled = true;
		categories[categorie][8].style.color = "grey";
		document.getElementById("moreInfo").setAttribute("more", categorie);
	};
};

function setStatusMessage(message){document.getElementById("logMessage").textContent = message};

function topScore(requete) {
	fetch(requete)
		.then(function(res){
			if (res.ok) {
				return res.json();
			}
		})
		.then(function(value) {
			fetch(entryPoint + value.results[0].id.toString())
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
					setStatusMessage("[topScore/détail] " + err);
				})
		})
		.catch(function(err) {
			setStatusMessage("[topScore] " + err);
		})
};

function askDetail(refId) {
	setStatusMessage("");
	fetch(entryPoint + refId)
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
			setStatusMessage("[askDetail] " + err);
		})
};

function moreFilms() {
	let categorie = document.getElementById("moreInfo").getAttribute("more");
	if (categorie != "null" && categorie != null) {
		let requete = categories[categorie][8].getAttribute("url");
		if (requete != "null") {
			fetch(requete)
				.then(function(res){
					if (res.ok) {
						return res.json();
					}
				})
				.then(function(value) {
					for (let i = 0; i < value.results.length; i++) {
						films[categorie].push(new Vignette(value.results[i].id.toString(), value.results[i].image_url));
					};
					categories[categorie][8].setAttribute("url", value.next);
					categories[categorie][8].disabled = false;
					categories[categorie][8].style.removeProperty("color");
					document.getElementById("moreInfo").setAttribute("more", null);
					setStatusMessage("(++) " + document.getElementsByTagName("h3")[categorie].textContent);
				})
				.catch(function(err) {
					setStatusMessage("[moreFilms] " + err);
				})
		} else {setStatusMessage("(Fin) " + document.getElementsByTagName("h3")[categorie].textContent)};
	} else {setStatusMessage("(Non) il vous reste des films à découvrir !")};
};

function filmDroite(categorie) {
	setStatusMessage("");
	let firstFilm = parseInt(categories[categorie][0].getAttribute("film")) + 1;
	categories[categorie][0].disabled = false;
	categories[categorie][0].style.removeProperty("color");
	afficherFilms(films[categorie], firstFilm, categorie);
};

function filmGauche(categorie) {
	setStatusMessage("");
	let firstFilm = parseInt(categories[categorie][0].getAttribute("film")) - 1;
	categories[categorie][8].disabled = false;
	categories[categorie][8].style.removeProperty("color");
	document.getElementById("moreInfo").setAttribute("more", null);
	afficherFilms(films[categorie], firstFilm, categorie);
};

function newCategorie(titre, requete, categorie) {
	let elt = document.getElementById("categories");
	let newh3 = document.createElement("h3");
	newh3.textContent = titre;
	elt.appendChild(newh3);
	let newdiv = document.createElement("div");
	newdiv.className = "conteneur";
	elt.appendChild(newdiv);
	elt = document.getElementsByClassName("conteneur")[categorie];
	let newbuttonG = document.createElement("button");
	newbuttonG.innerHTML = "&lt;";
	elt.appendChild(newbuttonG);
	let newimg=[];
	for (i = 0; i < 7; i++) {
		newimg.push(document.createElement("img"));
		elt.appendChild(newimg[i]);
	};
	let newbuttonD = document.createElement("button");
	newbuttonD.innerHTML = "&gt;";
	elt.appendChild(newbuttonD);
	categories.push(document.getElementsByClassName("conteneur")[categorie].children);
	let filmsCat = [];
	films.push(filmsCat);
	tableauFilms(requete, 20, categorie, 0, filmsCat);
};	

function onLoaded(event) {
	const requeteBest = entryPoint + "?sort_by=-imdb_score";
	topScore(requeteBest);
	let filmsBest = [];
	films.push(filmsBest);
	tableauFilms(requeteBest, 30, 0, 1, filmsBest);

	newCategorie("Aventures sportives...", requeteBest + "&genre=Sport", 1);
	newCategorie("Science-fiction...", requeteBest + "&genre=Sci-Fi", 2);
	newCategorie("Films d'animation...", requeteBest + "&genre=Animation", 3);
	newCategorie("Films policiers de 1948...", requeteBest + "&genre=Thriller&year=1948", 4);

	initListener();
};

document.addEventListener('DOMContentLoaded', onLoaded);

