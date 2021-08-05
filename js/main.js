let history = []

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('scoreG1').addEventListener('click', addPointG1)
    document.getElementById('scoreG2').addEventListener('click', addPointG2)
    document.getElementById('undo').addEventListener('click', undo)
    document.getElementById('reset').addEventListener('click', reset)

    reset()
})

const undo = () => {
    if (history.length > 0) {
        history.pop()
    }
    loadLatestScore()
}
const reset = () => {
    const score = {
        gamesG1: 0,
        gamesG2: 0,
        currentGameG1: 0,
        currentGameG2: 0
    }
    history.push(score)

    loadLatestScore()
}

const addPointG1 = () => {
    addPoint(true)
}
const addPointG2 = () => {
    addPoint(false)
}

const getLatestScore = () => {
    // horrible stuff to break the reference in an array of literal values. more info https://stackoverflow.com/questions/7486085/copy-array-by-value
    const json = JSON.stringify(history)
    const newArr = JSON.parse(json)
    return newArr[newArr.length - 1]
}

const addPoint = (G1) => {
    const score = getLatestScore()
    if (G1) {
        score.currentGameG1 = addPointToPlayer(score.currentGameG1)
    } else {
        score.currentGameG2 = addPointToPlayer(score.currentGameG2)
    }
    const isGameG1 = checkIfIsGame(score.currentGameG1, score.currentGameG2)
    const isGameG2 = checkIfIsGame(score.currentGameG2, score.currentGameG1)

    if (isGameG1 || isGameG2) {
        score.currentGameG1 = 0
        score.currentGameG2 = 0
        if (isGameG1) {
            score.gamesG1++
        } else {
            score.gamesG2++
        }
    }

    if (score.currentGameG1 == 45 && score.currentGameG2 == 45) {
        score.currentGameG2 = 40
        score.currentGameG1 = 40
    }

    history.push(score)
    loadLatestScore()
}

const checkIfIsGame = (g1, g2) => {
    if (g1 == 45 && g2 < 40 || g1 == 50) {
        return true
    }
}


const addPointToPlayer = (currentPoints = 0) => {
    switch (currentPoints) {
        case 0:
            return 15
            break;
        case 15:
            return 30
            break;
        case 30:
            return 40
            break;
        case 40:
            return 45
            break;
        case 45:
            return 50
            break;
        default:
            break;
    }
}


const loadLatestScore = () => {
    const score = history[history.length - 1]
    setGamesScoreHtml(score.gamesG1, score.gamesG2)
    setCurrentGameScoreHtml(score.currentGameG1, score.currentGameG2)
}

const setGamesScoreHtml = (g1, g2) => {
    document.getElementById('gamesScore').innerHTML = `G1: ${g1} | G2: ${g2}`
}
const setCurrentGameScoreHtml = (g1, g2) => {
    if (g1 == 45) {
        g1 = 'A'
    }
    if (g2 == 45) {
        g2 = 'A'
    }
    document.getElementById('currentGameScore').innerHTML = `${g1} - ${g2}`
}
