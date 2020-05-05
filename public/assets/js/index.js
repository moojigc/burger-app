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
async function update(id, data) {
    return await $.ajax('/api/burger/' + id, {
        method: 'PUT',
        data: data
    })
}
async function updateHandler() {
    let id = $(this).data('id')
    if ($(this).text() === 'Devour!') 
        await update(id, { devoured: 1 });
    else 
        await update(id, { devoured: 0 })
    location.reload()
}

$submitBtn.on('click', async event => {
    event.preventDefault()
    if (!$input.val()) return;
    let data = {
        name: $input.val()
    }

    await post(data);
    location.reload()
})

$devourBtns.on('click', updateHandler)
$regurgitateBtns.on('click', updateHandler)