$(function () {
    $('.carousel[data-mixed] ul').anoSlide(
    {
        items: 3,
        speed: 500,
        prev: 'a.prev[data-prev]',
        next: 'a.next[data-next]',
        lazy: true,
        delay: 100
    })
});