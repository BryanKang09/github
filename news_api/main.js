const API_KEY = `c1d43e4d6b7746a78110a063147de8cf`;
let newsList = [];
const menus = document.querySelectorAll(".menus button");
menus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event)))

let page = 1;
let totalResults = 0;
const pageSize = 10;
const groupSize =5;
let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);

const paginationRender = () => {
    const totalPages = Math.ceil(totalResults/pageSize)
    const pageGroup = Math.ceil(page/groupSize);
    let lastPage = pageGroup*groupSize;
    if (lastPage > totalPages){
        lastPage = totalPages;
    }

    const firstPage = lastPage-groupSize+1 <= 0? 1:lastPage-groupSize+1;

    let paginationHTML = `<li class="page-item" onclick-"moveToPage(${page-1})"><a class="page-link" href="#">Previous</a></li>`;

    for (let i=firstPage;i<=lastPage;i++){
        paginationHTML += `<li class="page-item ${i == page ? "active" : ""}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`
    }

    paginationHTML += `<li class="page-item" onclick-"moveToPage(${page-1})"><a class="page-link" href="#">Next</a></li>`;
    document.querySelector(".pagination").innerHTML = paginationHTML;
}

const moveToPage = (pageNumber)=>{
    console.log(pageNumber)
    page = pageNumber;
    // url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    // url.searchParams.set("page", page);
    // url.searchParams.set("pageSize", pageSize);
    // getNews(url);
    getNews(pageNumber);
}

const getNews = async (url)=>{
    
    try{
        url.searchParams.set("page", page); // $page=page
        url.searchParams.set("pageSize", pageSize);

        const response = await fetch(url);        
        const data = await response.json();
        
        if (response.status == 200) {
            if (data.articles.length == 0){
                throw new Error("No search results.");
            }
            
            newsList = data.articles;
            totalResults = data.totalResults;
            render();
            paginationRender();
            console.log(data)
            
        }else{
            throw new Error(data.message)
        }
    }catch(error){
        errorRender(error.message)
    }

}

const errorRender = (errorMessage) => {
    const errorHTML =  `<div class="alert alert-danger" role="alert">
    ${errorMessage}
    </div>`

    document.getElementById("news-board").innerHTML = errorHTML
}

const getLastestNews = async () => {
    
    url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    getNews(url);
    // console.log(data)
}

const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase();
    url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`);
    getNews(url);
}


const render = ()=>{
    const newsHTML = newsList.map((news) => `<div class="row article-area">
                <div class="col-lg-4 ">
                    <img class="image" src=${news.urlToImage}>
                </div>
                <div class="col-lg-8">
                    <h2>${news.title}</h2>
                    <p>${news.description}</p>
                    <div>${news.source.name}</div>
                    <div>${news.publishedAt}</div>
                </div>
            </div>`).join('')

    document.getElementById('news-board').innerHTML = newsHTML;
}

const getNewsByKeyword = async ()=>{
    const keyword = document.getElementById("search-input").value;
    
    url =  new URL(`https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`);
    getNews(url);
}

getLastestNews();