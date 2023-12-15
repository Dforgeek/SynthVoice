document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    const dataContainer = document.getElementById('data-container');

    function fetchData() {
        preloader.style.display = 'flex';
        // let url = 'http://rzhunemogu.ru/RandJSON.aspx?CType=1';
        let url = 'https://jsonplaceholder.typicode.com/posts'
        let filterId = Math.random() > 0.5 ? 100 : 49;
        url += '?id=' + filterId;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                preloader.style.display = 'none';
                dataContainer.innerHTML = '<pre>' + JSON.stringify(data[0].body, null, 2) + '</pre>';
            })
            .catch(error => {
                console.error('Fetch error:', error);
                preloader.style.display = 'none';
                dataContainer.innerHTML = '<p>⚠ Что-то пошло не так</p>';
            });
    }

    fetchData();
});
