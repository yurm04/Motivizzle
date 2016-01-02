(function() {

    var phone       = document.getElementById('phone-input');
    var label       = document.getElementById('phone-label');
    var submit      = document.getElementById('phone-submit');
    var phoneFormat = '(_ _ _)  _ _ _ _ - _ _ _ _';


    phone.setAttribute('placeholder', phoneFormat);

    phone.addEventListener('focus', togglePhone);

    phone.addEventListener('blur', validatePhone);

    submit.addEventListener('click', validatePhone);

    function togglePhone() {
        toggle(label, 'focus');
    }

    function validatePhone(e){
        var val = phone.value;

        if (!val) {
            label.classList.remove('error');
            label.classList.remove('valid');
            label.classList.remove('focus');
            e.preventDefault();
            return false;
        }

        var stripped = val.trim().replace(/\D/g, '');       // trim whitespace and remove non numbers
        if (stripped.length >= 10) {
            label.classList.remove('error');
            label.classList.remove('focus');
            label.classList.add('valid');
            return true;
        } else {
            label.classList.remove('valid');
            label.classList.remove('focus');
            label.classList.add('error');
            e.preventDefault();
            return false;
        }

    }

    function toggle(elem, targetClass) {
        if (!elem.className.match(targetClass)) {
            elem.classList.add(targetClass);
        } else if (elem.className.match(targetClass)) {
            elem.classList.remove(targetClass);
        }
    }
})();