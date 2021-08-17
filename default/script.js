var app = new Vue({
    el: '#app',
    data() {
        return {
            colors: {
                white: '#e6e6e6',
                darkestBlueColor: '#071e26',
                greyishBlueColor: '#06394c',
                brightBlueColor: '#0c4383',
                turquoiseBlueColor: '#22a0b6',
                palestBlueColor: '#6a96b9',
                darkMagentaColor: '#7b1346',
                magentaColor: '#cb0c59',
                pinkColor: '#eb649f'
            }
        }
    },
    mounted() {
        const cursor = document.querySelector('.cursor')

        /* Cursor */
        document.addEventListener('mousemove', e => {
            cursor.setAttribute("style", "top:" + (e.pageY - 10) + "px; left:" + (e.pageX - 10) + "px")
        })

        document.addEventListener('mouseleave', () => {
            cursor.setAttribute("style", "top: -25px")
        })
    },
    methods: {
        expandCursor() {
            const cursor = document.querySelector('.cursor')
            cursor.classList.add('expand')
        },

        shrinkCursor() {
            const cursor = document.querySelector('.cursor')
            cursor.classList.remove('expand')
        },
        buyCheck(id) {
            fetch('/creating-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    items: [
                        { id: id }
                    ]
                })
            }).then(res => {
                if (res.ok) return res.json()
                return res.json().then(json => Promise.reject(json))
            }).then(({ url }) => {
                window.location = url
            }).catch(e => {
                console.error(e.error)
            })
        },
        validateEmail() {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        },
        validateForm(email, username, password, password2) {
            if (this.validateEmail(email)) return false
            if (password !== password2) return false
            return true
        },
        createAccount() {
            console.log('test')
            const email = document.getElementById('create-account-email').value,
                username = document.getElementById('create-account-username').value,
                password = document.getElementById('create-account-password').value,
                password2 = document.getElementById('create-account-password-repeat').value
            if (this.validateForm(email, username, password, password2)) {
                fetch('/create-account', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: document.getElementById('create-account-email').value,
                        username: document.getElementById('create-account-username').value,
                        password: document.getElementById('create-account-password').value,
                        password2: document.getElementById('create-account-password-repeat').value
                    })
                }).then(res => {
                    if (res.ok) return res.json()
                    return res.json().then(json => Promise.reject(json))
                }).then(({ success }) => {
                    console.log(success)
                }).catch(e => {
                    console.error(e.error)
                })
            } else {
                // Error handler
                alert('wrong input')
            }
        },
        loginCheck() {

        }
    }
})