

(function () {
    'use strict';

    if (window.location.href.startsWith('https://outlook.live.com')) {
        GM.setValue('code', "");
        let latestVerificationCode = null;
        let intervalId = window.setInterval(function () {
            const elements = document.querySelectorAll('[aria-label]');
            let foundVerificationCode = false;

            elements.forEach(element => {
                const ariaLabel = element.getAttribute('aria-label');
                if (ariaLabel.includes("For your security, copy-paste option has been disabled for this verification code. You are requested to enter in manually") && !foundVerificationCode) {
                    const text = ariaLabel;
                    //console.log(ariaLabel);
                    const regex = /\b\d{6}\b/;
                    const match = text.match(regex);
                    if (match) {
                        const verificationCode = match[0];
                        console.log(verificationCode);
                        GM.setValue('code', verificationCode);
                        latestVerificationCode = verificationCode;
                        foundVerificationCode = true; // Set the flag to true
                        clearInterval(intervalId); // Stop the repetition
                    }
                }
            });

        }, 1000);
    }



    if (window.location.href.indexOf('blsspainmorocco.net') > -1) {
        async function getCode() {
            const code = await GM.getValue('code', 0)
            if (code) {
                await GM.setValue("code", null);
                //prompt('your password',code);
                document.querySelector('#EmailVerificationCode').value = code;

            }
        }
        setInterval(getCode, 1000);
    }

})();
