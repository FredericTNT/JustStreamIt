const modal = document.getElementById("myModal");

document
	.getElementById("meilleurFilm")
	.addEventListener('click', function(event) {
		const refId = document.getElementById("meilleurFilm").getAttribute("alt");
		askDetail(refId);
	});

document
	.getElementById("moreInfo")
	.addEventListener('click', function(event) {
		const refId = document.getElementById("meilleurFilm").getAttribute("alt");
		askDetail(refId);
	});

document
	.getElementsByClassName("conteneur 1")[0].children[1]
	.addEventListener('click', function(event) {
		const refId = document.getElementsByClassName("conteneur 1")[0].children[1].getAttribute("alt");
		askDetail(refId);
	});

document
	.getElementsByClassName("conteneur 4")[0].children[7]
	.addEventListener('click', function(event) {
		const refId = document.getElementsByClassName("conteneur 4")[0].children[7].getAttribute("alt");
		askDetail(refId);
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

function topScore(event) {
	fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score")
		.then(function(res){
			if (res.ok) {
				return res.json();
			}
		})
		.then(function(value) {
			var refId = value.results[0].id.toString();
			fetch("http://localhost:8000/api/v1/titles/" + refId)
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
						.setAttribute("alt", refId);
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

document.addEventListener('DOMContentLoaded', topScore);

