const randomArticleUrl = "https://it.wikipedia.org/w/api.php?action=query&list=random&rnlimit=1&rnnamespace=0&format=json&origin=*"
const articleBaseUrl = "https://it.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext&exintro&format=json&origin=*&pageids="

const generate = document.getElementById('generateBtn')
const clear = document.getElementById('clearBtn')
const container = document.querySelector('.container')

const getData = async url =>{
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTPS Error! Status: ${response.status}`)
        }
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error)
    }
}

const appendPostIt = async () => {
    const id = (await getData(randomArticleUrl)).query.random[0].id;
    const article = (await getData(articleBaseUrl + id)).query.pages[id];
    //console.log(article);
    container.append(generatePostIt(article))
}

const generatePostIt = article => {
    const postIt = document.createElement('article')
    const title = document.createElement('h3')
    const text = document.createElement('p')
    title.innerHTML = article.title || '--'
    text.innerHTML = article.extract || '--'
    postIt.append(title, text)
    return postIt
}

const init = async () => {
    generate.addEventListener('click', appendPostIt)
    clear.addEventListener('click', () => {
        container.innerHTML = ''
    })
}

init()