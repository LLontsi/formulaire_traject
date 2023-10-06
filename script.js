const prevBtns = document.querySelectorAll(".btnn-prev");
const nextBtns = document.querySelectorAll(".btnn-next");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");
const next = document.querySelectorAll(".next-page");

let formStepsNum = 0;

function required() {
    var form = document.querySelector("#form-step-active");
    var fields = form.querySelectorAll("input, select");
    var isValid = true;

    fields.forEach(function(field) {
        if (!field.value) {
            alert(`Le champ ${field.name} est requis`);
            isValid = false;
        }
    });
    return isValid;
}
next.forEach(btn => {
    btn.addEventListener("click", () => {
        formStepsNum++;
        updateFormSteps();
        updateProgressbar();
    });
});

nextBtns.forEach(btn => {
    btn.addEventListener("click", () => {

        //decommenter pour activer la fonction activer le required

        var form = document.querySelector(".form-step-active");
        var fields = form.querySelectorAll("input, select");
        var isValid = true;

        fields.forEach(function(field) {
            if (!field.value &  field.id !== 'id'  ) {

                field.classList.add('is-invalid');
                isValid = false;
            } else {
                field.classList.remove('is-invalid')
            }
        });

        if (!isValid) {
            Swal.fire({
                icon: 'error',
                title: 'Impossible:( ',
                position: 'center',
                showConfirmButton: false,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                },
                timer: 2000
            });
        } else {
            formStepsNum++;
            updateFormSteps();
            updateProgressbar();
        }
        // formStepsNum++;
        //     updateFormSteps();
        //     updateProgressbar();
    });
})

prevBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        var form = document.querySelector(".form-step-active");
        var fields = form.querySelectorAll("input, select");

        fields.forEach(function(field) {
            if (field.id == 'num_transaction') {
                field.value = '';
            }
        })

        formStepsNum--;
        updateFormSteps();
        updateProgressbar()
    })
})

function updateFormSteps() {
    formSteps.forEach((formSteps) => {
        formSteps.classList.contains("form-step-active") &&
            formSteps.classList.remove("form-step-active");
    })

    formSteps[formStepsNum].classList.add("form-step-active");
}

function updateProgressbar() {
    progressSteps.forEach((progressStep, idx) => {
        if (idx < formStepsNum + 1) {
            progressStep.classList.add("progress-step-active");
        } else {
            progressStep.classList.remove("progress-step-active");
        }
    });

    const progressActive = document.querySelectorAll(".progress-step-active");

    progress.style.width =
        ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}

function Impression(elementId) {
    var element = document.getElementById(elementId);
    var previousDisplay = element.style.display;
    element.style.display = "block"; // rendre l'élément visible
    var printWindow = window.open('', '', 'height=400,width=800');
    printWindow.document.write('<html><head><title>Imprimer</title>');
    printWindow.document.write('</head><body >');
    printWindow.document.write(element.outerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
    element.style.display = previousDisplay; // remettre l'élément à son état précédent
}

function blockInputs(checkbox) {
    var inputs = document.getElementsByClassName("hidd");
    for (var i = 0; i < inputs.length; i++) {
        // if (inputs[i].type === "text") {
        //     inputs[i].disabled = checkbox.checked;
        // }
        inputs[i].disabled = checkbox.checked;
    }
}