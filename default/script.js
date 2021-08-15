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
        }
    }
})