angular.module('myApp.config', [])

    .value('API', 'http://localhost:3030')
    .value('Link', 'http://localhost:3030')
    .value('Time', {
        'time_interview': 15*60000,
        'second': "Sec",
        'minut': "Min",
        'sec': 1000,
        'min': 60000
    })