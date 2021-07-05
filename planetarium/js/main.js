var planetas = []

function ApagaPlaneta(position) {
    let _confirm = confirm("Tem certeza que deseja deletar esse planeta?")

    if (_confirm) {
        for (let i = 0; i < planetas.length; i++) {
            if (planetas[i].Position == position) {
                planetas.splice(i, 1)
            }
        }

        FillTable()

    }
}

function EditaPlaneta(position) {
    $("#modalPlanetas").modal("show")

    planetas.forEach(function (item) {
        if (item.Position == position) {
            $("#hdID").val(item.Position)
            $("#pDistance").val(item.Distance)
            $("#pName").val(item.Name)
            $("#pRotation").val(item.Rotation)
            $("#pTranslation").val(item.Translation)
            $("#pType").val(item.Type)
            $("#pMoon").val(item.Moon)
            $("#pData").val(item.Data.substr(6, 4) + "-" + item.Data.substr(3, 2) + "-" + item.Data.substr(0, 2))

        }

    })

}

function FillTable() {
    if (Array.isArray(planetas)) {
        localStorage.setItem("__planetas__", JSON.stringify(planetas))
        $("#tblPlanetas tbody").html("")
        planetas.forEach(function (item) {
            $("#tblPlanetas tbody").append(`<tr>
                <td>${item.Position}</td>
                <td>${item.Distance}</td>
                <td>${item.Name}</td>
                <td>${item.Rotation}</td>
                <td>${item.Translation}</td>
                <td>${item.Type}</td>
                <td>${item.Moon}</td>
                <td>${item.Data}</td>
                <td><button type="button" class="btn btn-warning" onclick="javascript:EditaPlaneta(${item.Position})"><i class="fas fa-tools"></i></td>
                <td><button type="button" class="btn btn-danger" onclick="javascript:ApagaPlaneta(${item.Position})"><i class="fas fa-trash"></i></td>
            </tr>`)
        })
    }
}


$(function () {
    //EXECUTA AO CARREGAR A TELA

    if (planetas) {
        FillTable()

    }

    $("#btnSalvar").click(function () {


        let _id = $("#hdID").val()
        let Distance = $("#pDistance").val()
        let Name = $("#pName").val()
        let Rotation = $("#pRotation").val()
        let Translation = $("#pTranslation").val()
        let Type = $("#pType").val()
        let Moon = $("#pMoon").val()
        let Data = new Date($("#pData").val()).toLocaleDateString("pt-br", { timeZone: "UTC" })





        if (!_id || _id == "0") {
            let planeta = {}
            planeta.Distance = Distance
            planeta.Name = Name
            planeta.Rotation = Rotation
            planeta.Translation = Translation
            planeta.Type = Type
            planeta.Moon = Moon
            if (Data == "Invalid Date") {
                planeta.Data = ""
            }
            else {
                planeta.Data = Data
            }


            planeta.Position = planetas.length + 1
            planetas.push(planeta)
        }

        else {
            planetas.forEach(function (item) {
                if (item.Position == _id) {
                    item.Distance = Distance
                    item.Name = Name
                    item.Rotation = Rotation
                    item.Translation = Translation
                    item.Type = Type
                    item.Moon = Moon
                    item.Data = Data
                }
            })
        }

        $("#modalPlanetas").modal("hide")

        $("#hdID").val("0")
        $("#pDistance").val("")
        $("#pName").val("")
        $("#pRotation").val("")
        $("#pTranslation").val("")
        $("#pData").val("")
        $("#pType").val("")
        $("#pMoon").val("")

        FillTable()
    })
})
