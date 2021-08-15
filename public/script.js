var app = new Vue({
    el: '#app',
    data() {
        return {
            socket: {},
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
                    src: '/public/img/key.png'
                },
                {
                    name: 'Note',
                    src: '/public/img/notepad.png'
                }
            ],
            visibility: {
                openLockContainer: false,
                openDoor: false
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
        sendMessage(text, type) {
            const messageBox = document.querySelector('.message-container')
            var message = document.createElement('div')
            message.classList.add('message', type)
            message.innerHTML = text
            messageBox.appendChild(message)
            setTimeout(() => {
                message.classList.add('fadeOut')
                setTimeout(() => {
                    message.remove()
                }, 400)
            }, 2400)
        },
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
            const item = document.querySelectorAll(selectors);
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

        rotateMirror() {
            var mirror = document.getElementById('Mirror')
            if (mirror.style.transform === 'rotate(20deg) translate(25px, 5px)') {
                mirror.style.transform = 'rotate(0)'
            } else if (mirror.style.transform === 'rotate(20deg) translate(5px, -100px)') {
                mirror.style.transition = 'transform .4s ease'
                mirror.style.transform = 'rotate(0)'
                setTimeout(() => {
                    mirror.style.transition = 'none'
                }, 400)
            } else {
                if (document.getElementById('first_room').classList.contains('zoomed')) {
                    mirror.style.transition = 'transform .4s ease'
                    mirror.style.transform = 'rotate(20deg) translate(5px, -100px)'
                    setTimeout(() => {
                        mirror.style.transition = 'none'
                    }, 400)
                } else {
                    mirror.style.transform = 'rotate(20deg) translate(25px, 5px)'
                }
            }
        },

        doorKnobToColor() {
            this.toColor("#Knob, #Open-knob", this.colors.darkMagentaColor, 'stroke');
        },

        doorKnobToWhite() {
            this.toColor("#Knob, #Open-knob", this.colors.white, 'stroke');
        },
        drawerKnobToColor(e) {
            const clickedElement = e.target.id
            this.toColor("#" + clickedElement, this.colors.turquoiseBlueColor, 'fill');
        },
        drawerKnobToWhite(e) {
            const clickedElement = e.target.id
            this.toColor("#" + clickedElement, this.colors.white, 'fill');
        },
        noteToColor(e) {
            const clickedElement = e.target.id
            this.toColor("#" + clickedElement, this.colors.pinkColor, 'stroke');
        },
        noteToWhite(e) {
            const clickedElement = e.target.id
            this.toColor("#" + clickedElement, this.colors.white, 'stroke');
        },
        openNote(e) {
            this.sendMessage('Password to my lock is 5935', 'info')
            // this.visibility.openLockContainer = true
            this.zoomIn(e.target, 2)
        },
        openDrawer(e) {
            const clickedDrawer = 'Open-Drawer' + e.target.id.slice(-1)
            document.getElementById(clickedDrawer).style.visibility = "visible"
        },
        closeDrawer(e) {
            const clickedDrawer = 'Open-Drawer' + e.target.id.slice(-1)
            document.getElementById(clickedDrawer).style.visibility = "hidden"
        },
        openDoor(e) {
            this.visibility.openDoor = true
        },
        closeDoor(e) {
            this.visibility.openDoor = false
        },
        zoomIn(elem, zoomLevel) {
            var svg = document.getElementById('first_room'),
                mirror = document.getElementById('Mirror'),
                viewbox = svg.viewBox.baseVal
            if (svg.classList.contains('zoomed')) {
                var new_width = 1280,
                    new_height = 580,
                    new_x = 0,
                    new_y = 0
                mirror.style.transform = 'rotate(20deg) translate(25px, 5px)'
                setTimeout(() => {
                    mirror.style.transition = 'transform .4s ease'
                }, 1)
            } else {
                var elemBox = elem.getBBox(),

                    elem_center_x = elemBox.x + elemBox.width / 2,
                    elem_center_y = elemBox.y + elemBox.height / 2,

                    new_width = viewbox.width / zoomLevel,
                    new_height = viewbox.height / zoomLevel,
                    new_x = elem_center_x - new_width / 2,
                    new_y = elem_center_y - new_height / 2
                mirror.style.transition = 'none'
                mirror.style.transform = 'rotate(20deg) translate(5px, -100px)'
            }
            svg.viewBox.baseVal.x = new_x
            svg.viewBox.baseVal.y = new_y
            svg.viewBox.baseVal.width = new_width
            svg.viewBox.baseVal.height = new_height
            svg.classList.toggle('zoomed')
        }
    }
})