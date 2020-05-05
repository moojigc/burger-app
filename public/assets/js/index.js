const $submitBtn = $('.submit-btn'),
		$input = $('textarea');

	async function post() {
        try {
            return await $.ajax('/api/burgers/', {
                method: 'POST',
                data: $input.val()
            })
        } catch (error) {
            console.error(error)
        }
	}

	$submitBtn.on('click', async event => {
        event.preventDefault()
        if ($input.val("")) return;

		let response = await post();
		console.log(response)
		location.reload()
	})