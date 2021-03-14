var events = [
    ['12 Μαρτίου 2021',
        [
            ['https://www.youtube.com/watch?v=lyqBFihOzMg', 'Ρήψη μολότοφ'],
            ['https://www.youtube.com/watch?v=WrGh1QOzHG4', 'Εξώθηση άνδρα από πολυκατοικία'],
        ]
    ],
    ['11 Μαρτίου 2021',
        [
            ['https://www.youtube.com/watch?v=--TdQhAmehM', 'ΑΠΘ: Επίθεση σε δημοσιογράφους'],
            ['https://www.youtube.com/watch?v=dhB7wCphjhw', 'Επίθεση σε φοιτητές'],
            ['https://www.facebook.com/ThePressProject/videos/183397053309491/', 'Τάκλιν και κλωτσιά σε πεσμένη κοπέλα'],
        ]
    ],
    ['10 Μαρτίου 2021',
        [
            ['https://www.youtube.com/watch?v=ylPtUCfEF24', 'Νέα Σμύρνη: Κλοτσιές σε κορίτσι'],
        ]
    ],
    ['9 Μαρτίου 2021',
        [
            ['https://www.youtube.com/watch?v=026ATPW6ihI', 'Νέα Σμύρνη: Επίθεση με μηχανάκι σε άνδρα και έναντι δημοσιογράφων'],
            ['https://www.youtube.com/watch?v=csD6-Juy5GI', 'Νέα Σμύρνη: "Πάμε να τους γαμήσουμε! Να τους σκοτώσουμε"'],
            ['https://www.youtube.com/watch?v=iBdzP8uYb3c', 'Νέα Σμύρνη: Ξυλοδαρμός άνδρα'],
            ['https://mobile.twitter.com/Refugees_Gr/status/1369407646302879746', 'Νέα Σμύρνη: Προέκταση όπλου'],
            ['https://www.youtube.com/watch?v=z1o-5zZYRoU', 'Νέα Σμύρνη: Εξώθηση από κατάστημα και ξυλοδαρμός'],
            ['https://twitter.com/TasteOfAnarchy/status/1370164613862547456', 'Νέα Σμύρνη: Επίθεση σε γυναίκα'],
        ]
    ],
    ['7 Μαρτίου 2021',
        [
            ['https://www.youtube.com/watch?v=bg4TW1TDs9M', 'Νέα Σμύρνη: Ξυλοδαρμός άνδρα'],
            ['https://www.youtube.com/watch?v=kwj-GeWD25g', 'Παρενόχληση και ξυλοδαρμός δικηγόρου'],
        ]
    ],
    ['3 Μαρτίου 2021',
        [
            ['https://www.facebook.com/143715585672129/videos/892929511555192', 'Αθήνα: Επίθεση σε δημοσιογράφο κατά τη σύλληψη διαδηλωτή'],
        ]
    ],
    ['22 Φεβρουαρίου 2021',
        [
            ['https://www.youtube.com/watch?v=A9AhOgrD9q4', 'ΑΠΘ: Σύρσιμο φοιτητή με το κεφάλι του στο δρόμο'],
        ]
    ],
    ['4 Φεβρουαρίου 2021',
        [
            ['https://www.youtube.com/watch?v=zJD9EQXg524', 'ΑΠΘ: Ξυλοδαρμός Υποψήφιου Διδάκτορα του ΑΠΘ'],
        ]
    ],
    ['9 Οκτωβρίου 2020',
        [
            ['https://www.facebook.com/AntiviruSolidarityGR/videos/673459520216880/', 'Αθήνα: Χημικά σε ανήλικους μαθητές'],
        ]
    ],
]

var wrapper, myHTML

wrapper = document.getElementById('events')

myHTML = ''
for (var i = 0; i < events.length; i++) {
    myHTML += '<h4>' + events[i][0] + '</h4>' + '<ul>'
    for (var j = 0; j < events[i][1].length; j++) {
        myHTML += "<li><a href='" + events[i][1][j][0] + "' target='_blank'>" + events[i][1][j][1] + "</a></li>"
    }
    myHTML += '</ul>'
}
wrapper.innerHTML = myHTML
