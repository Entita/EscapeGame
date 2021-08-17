var app = new Vue({
    el: '#app',
    data() {
        return {
            loginToken: {},
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

        /* Login token */
        const loginToken = localStorage.getItem('loginToken')
        if (loginToken) {
            alert('Logged in through a token as ' + loginToken)
        }
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
        validateEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        },
        validateForm(email, username, password, password2) {
            if (((password !== password2) || !this.validateEmail(email)) || username.length < 5 || password.length < 8) {
                if (username.length < 5) {
                    alert('Username is too short, atleast 5 characters')
                } else if (!this.validateEmail(email)) {
                    alert('Email adress doesn\'t exist')
                } else if (username.length < 8) {
                    alert('Password is too short, atleast 8 characters')
                } else {
                    alert('Passwords doesn\'t match')
                }
                return false
            } else {
                return true
            }
        },
        createAccount() {
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
                        email: email,
                        username: username,
                        password: password
                    })
                }).then(res => {
                    if (res.ok) return res.json()
                    return res.json().then(json => Promise.reject(json))
                }).then(({ success }) => {
                    if (success) {
                        alert('Registered')
                    }
                }).catch(e => {
                    console.error(e.error)
                })
            } else {
                // Error handler
                alert('wrong input')
            }
        },
        loginCheck() {
            const email = document.getElementById('login-email').value,
                password = document.getElementById('login-password').value
            if (password.length < 8) {
                alert('Password is too short, atleast 8 characters')
            } else if (!this.validateEmail(email)) {
                alert('Email adress doesn\'t exist')
            } else {
                fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }).then(res => {
                    if (res.ok) return res.json()
                    return res.json().then(json => Promise.reject(json))
                }).then(({ success }) => {
                    if (success === 'user') {
                        // User not found
                        alert('User not found')
                    } else if (success) {
                        // Logged in
                        alert('Logged in')
                        localStorage.setItem('loginToken', email)
                    } else {
                        // Wrong password
                        alert('Wrong password')
                    }
                }).catch(e => {
                    console.error(e.error)
                })
            }
        },
        logOut() {
            localStorage.removeItem('loginToken')
            loginToken = {}
            alert('Logged Out')
        }
    }
})