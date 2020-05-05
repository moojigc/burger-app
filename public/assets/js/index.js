const $submitBtn = $('.submit-btn'),
    $input = $('input'),
    $devourBtns = $('.devour-btn'),
    $regurgitateBtns = $('.regurgitate-btn');

$input.val('')

async function post(data) {
    return await $.ajax('/api/burgers/', {
        method: 'POST',
        data: data
    })
}
async function update(data, id) {
    return await $.ajax('/api/burger/' + id, {
        method: 'PUT',
        data: data,
    })
}

$submitBtn.on('click', async event => {
    event.preventDefault()
    if (!$input.val()) return;
    let data = {
        name: $input.val()
    }

    console.log($input.val())

    let response = await post(data);
    console.log(response)
    location.reload()
})
$devourBtns.on('click', async () => {
    let data = {
        'devoured': true
    }
    let res = await update(data, this.id);
    console.log(res)
})