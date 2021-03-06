var $searchBar = $("#youtube-search")
var $content = $('#content')
var $list = $('#list')


$(document).ready(()=>{
    $.ajax({url: '/populate/<%= user.id %>', method: 'get'}).done((res)=>{
        console.log(res.interests)
        res.interests.forEach((el)=>{
            $content.append($('<h2>').text(el.interest))
            $content.append($('<ul>').addClass(el.interest))
            $content.append($('<div>').addClass('like'))
            var searchURL = '/search?term=' + el.interest
            $.ajax({url: searchURL, method: 'get'}).done(function(res){
                res.forEach((ytResult)=>{
                    $div = $('<div>').addClass('card').attr('style', "width: 18rem;").html(
                            `<iframe class="card-img-top" src="http://www.youtube.com/embed/${ytResult.id}?feature=player_embedded" frameborder="0" allowfullscreen></iframe>`)
                    $cardbody = $('<div>').addClass('card-body').append($('<div>').addClass('card-text'))
                    $button = $('<div>').append($('<button>'))
                    $cardbody.append($button)
                    $div.append($cardbody)
                    console.log('.'+el.interest)
                    $('.'+el.interest).append($div)
                }) 
            })    
        })
    })
})

$searchBar.on('submit', (evt) => {
    evt.preventDefault()
    var term = $("#search-value").val()
    var data = {
        "interest" : term
    }
    $.ajax({url: '/users/<%=user.id%>/interests', method:'post', data: JSON.stringify(data), contentType: "application/json"}).done(function(res){
        console.log(res)
    })
    var searchURL = '/search?term=' + term
    $.ajax({url: searchURL, method: 'get'}).done(function(res){
    
        res.forEach((el)=>{
            $div = $('<div>').addClass('card').attr('style', "width: 18rem;").html(
                    `<iframe class="card-img-top" src="http://www.youtube.com/embed/${el.id}?feature=player_embedded" frameborder="0" allowfullscreen></iframe>`)
            $cardbody = $('<div>').addClass('card-body').append($('<div>').addClass('card-text'))
            $button = $('<div>').append($('<button>'))
            $cardbody.append($button)
            $div.append($cardbody)
            
            $list.append($div)
        }) 
    })
})

var $addInterests = $('#add-interests')

$addInterests.on("submit", (evt) => {
    evt.preventDefault()
    var data = {
        "interest" :$('#interest-value').val()
    }
    $.ajax({url: '/users/<%=user.id%>/interests', method:'post', data: JSON.stringify(data), contentType: "application/json"}).done(function(res){
        console.log(res)
    })
})