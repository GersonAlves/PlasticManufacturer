function validation(name) {

    if (document.form.name.value == "") {
        alert("Please Write here");
        document.form.name.focus();
        return false;
    }
}

