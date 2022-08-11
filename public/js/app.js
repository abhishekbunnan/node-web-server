console.log('loaded');

fetch('http://puzzle.mead.io/puzzle').then((responce) => {
    responce.json().then((data) => {
        console.log(data);
    });
});

// fetch('http://localhost:3000/weather?address=LosAngeles').then((responce) => {
//     responce.json().then((data) => {
//         if (data.error){
//             console.log(data.error);
//         }
//         else {
//             console.log(data);
//         }
//     });
// });
const address = (address) => {
    fetch('/weather?address=' + address).then((responce) => {
        responce.json().then((data) => {
            if (data.error){
                console.log(data.error);
            }
            else {
                console.log(data);
            }
        });
    });
}
    

const weather = document.querySelector('form');
const search = document.querySelector('input');
const text1 = document.querySelector('#text1');
const text2 = document.querySelector('#text2');
text1.textContent = 'text1';
text2.textContent = 'text2'

weather.addEventListener('submit', (e) => {
    e.preventDefault();
    address(search.value);
})