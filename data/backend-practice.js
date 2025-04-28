const x = new XMLHttpRequest();

x.addEventListener('load', () => {
  console.log(x.response);
});

x.open('GET', 'https://supersimplebackend.dev/documentation');
x.send();