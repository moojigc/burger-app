const $submitBtn = $(".submit-btn"),
    $input = $("input"),
    $devourBtns = $(".devour-btn"),
    $deleteBtns = $(".delete-btn"),
    $regurgitateBtns = $(".regurgitate-btn");

$input.val("");

async function post(data) {
    return await $.ajax("/api/burgers/", {
        method: "POST",
        data: data,
    });
}
async function update(id, data) {
    return await $.ajax("/api/burger/" + id, {
        method: "PUT",
        data: data,
    });
}
async function trash(id) {
    return await $.ajax("/api/burger/" + id, {
        method: "DELETE",
    });
}

async function updateHandler() {
    let id = $(this).data("id");
    if ($(this).text() === "Devour!") await update(id, { devoured: 1 });
    else await update(id, { devoured: 0 });
    location.reload();
}

async function deleteHandler() {
    let id = $(this).data("id");
    await trash(id);
    location.reload()
}

$submitBtn.on("click", async (event) => {
    event.preventDefault();
    if (!$input.val()) return;
    let data = {
        name: $input.val(),
    };

    await post(data);
    location.reload();
});

$devourBtns.on("click", updateHandler);
$regurgitateBtns.on("click", updateHandler);
$deleteBtns.on("click", deleteHandler);
