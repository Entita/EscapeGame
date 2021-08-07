var app = new Vue({
    el: '#game',
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
            },
            inventory: [
                {
                    name: 'Key',
                    src: 'img/key.png'
                },
                {
                    name: 'Note',
                    src: 'img/notepad.png'
                }
            ]
        }
    },
    created() {
        const cursor = document.querySelector('.cursor')

        document.addEventListener('mousemove', e => {
            cursor.setAttribute("style", "top:" + (e.pageY - 10) + "px; left:" + (e.pageX - 10) + "px")
        })
    },
    methods: {
        openInventory(e) {
            if (e.target.classList.contains('open')) {
                e.target.classList.remove('open')
                document.querySelector('.inventory').classList.remove('open')
            } else {
                e.target.classList.add('open')
                document.querySelector('.inventory').classList.add('open')
            }
        },
        toColor(selectors, color, type) {
            var item = document.querySelectorAll(selectors);
            item.forEach(function (i) {
                if (type === 'stroke') {
                    i.style.stroke = color;
                } else {
                    i.style.fill = color;
                }
            });
        },

        expandCursor() {
            const cursor = document.querySelector('.cursor')
            cursor.classList.add('expand')
        },

        shrinkCursor() {
            const cursor = document.querySelector('.cursor')
            cursor.classList.remove('expand')
        },

        mirrorToColor() {
            this.toColor('#Mirror *', this.colors.brightBlueColor, 'stroke');
        },

        mirrorToWhite() {
            this.toColor("#Mirror *", this.colors.white, 'stroke');
        },

        doorKnobToColor() {
            this.toColor("#Knob", this.colors.darkMagentaColor, 'stroke');
        },

        doorKnobToWhite() {
            this.toColor("#Knob", this.colors.white, 'stroke');
        },
        drawerKnobToColor(e) {
            var clickedElement = e.target.id
            this.toColor("#" + clickedElement, this.colors.turquoiseBlueColor, 'fill');
        },
        drawerKnobToWhite(e) {
            var clickedElement = e.target.id
            this.toColor("#" + clickedElement, this.colors.white, 'fill');
        }
    }
})