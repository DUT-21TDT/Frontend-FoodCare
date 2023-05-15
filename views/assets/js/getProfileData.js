async function getBMICurrent() {
    const data = await $.get("/user/getBMICurrent", (data) => {
        console.log(data);
    })
    return data.success ? data.data : null;
}

$(document).ready(async () => {
    const data = await getBMICurrent();
    $('.height-measurement').text(`${data.height} cm`);
    $('.weight-measurement').text(`${data.weight} kg`);
    // $('.age-measurement').text(``);
})