/**********************************************************************************  
 * WEB422 –Assignment 2*  I declare that this assignment is my ownwork in accordance with SenecaAcademic Policy.  
 *  No part of this assignment has been copied manuallyor electronically from any other source
 *  (including web sites) or distributed to other students.* 
 *  Name: Pawan Deep Student ID: 111144218 Date: 30/09/2022
 * *********************************************************************************/
var page=1;
var perPage=10;

function loadMovieData(title = null){
    let url;
    if (title==null || title=="") {
        url=`https://agreeable-red-clam.cyclic.app/api/movies?page=${page}&perPage=${perPage}`;
        var pagination=document.querySelector(".pagination");
        if (pagination!=null) {
            pagination.classList.remove("d-none");
        }
    }
    else {
        url = `https://agreeable-red-clam.cyclic.app/api/movies?page=1&perPage=${perPage}&title=${title}`;
        var pagination=document.querySelector(".pagination");
        pagination.classList.add("d-none");
    }
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        let rows = `${data.map(data=>(
            `<tr data-id="${data._id}"> 
              <td>${data.year}</td>
              <td>${data.title}</td>
              <td>${data.plot? data.plot : "N/A"}</td>
              <td>${data.rated? data.rated : "N/A"}</td>
              <td>${Math.floor(data.runtime / 60)}:${(data.runtime % 60).toString().padStart(2, '0')}</td>
              </tr>`)).join("")}`;
            document.querySelector("#moviesTable tbody").innerHTML = rows;
            document.querySelector("#current-page").innerHTML=page;
            document.querySelectorAll("tbody tr").forEach((row)=>{
                row.addEventListener("click", function(event){
                    let id = row.getAttribute("data-id");
                    fetch(`https://agreeable-red-clam.cyclic.app/api/movies/${id}`)
                    .then((res) => res.json())
                    .then((data) => {
                        document.querySelector(".modal-title").innerHTML=data.title;
                        document.querySelector(".modal-body").innerHTML =`<img class="img-fluid w-100" src="${data.poster? data.poster: ""}">${data.poster?"<br><br>" :""}<strong>Directed By:</strong> ${data.directors.join(", ")}<br><br><p>${data.fullplot? data.fullplot : ""}</p><strong>Cast:</strong> ${data.cast!=""? data.cast.join(", ") : 'N/A'}<br><br><strong>Awards:</strong> ${data.awards.text}<br><strong>IMDB Rating:</strong> ${data.imdb.rating}(${data.imdb.votes} votes)`;
                        let modal = new bootstrap.Modal(document.getElementById('detailsModal'), {
                            backdrop: 'static', 
                            keyboard: false, 
                        });
                        modal.show();
                    });
                })
            });
        });
} 
loadMovieData();
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector("#previous-page").addEventListener("click", function(){
        if (page>1) {
            page=page-1;
            loadMovieData();
        }
    });
    document.querySelector("#next-page").addEventListener("click", function(){
        page=page+1;
        loadMovieData();
    });
    document.querySelector('#searchForm').addEventListener("submit", function(event) {
        event.preventDefault();
        loadMovieData(document.querySelector('#title').value);
    });
    document.querySelector('#clearForm').addEventListener("click", function() {
        document.querySelector('#title').value=""
        page=1;
        loadMovieData();
    });
});
