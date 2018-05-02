/**
 * Created by rozer on 5/2/2018.
 */
import { AsyncStorage } from "react-native";

const STORAGE_KEY = "flashCard:decks";

function dummyData() {
    const defaultData = {
        React: {
            title: 'React',
                questions: [
                {
                    question: 'What is React?',
                    answer: 'A library for managing user interfaces'
                },
                {
                    question: 'Where do you make Ajax requests in React?',
                    answer: 'The componentDidMount lifecycle event'
                }
            ]
        },
        JavaScript: {
            title: 'JavaScript',
                questions: [
                {
                    question: 'What is a closure?',
                    answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
            ]
        }
    }

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData))

    return defaultData
}

export function getDecks() {
     return AsyncStorage.getItem(STORAGE_KEY,(err, result) => {
         if(result === null){
             return{ decks: dummyData }
         }else{
             return JSON.parse(result)
         }
         
     })
}

export function saveDeckTitle(deckTitle) {
    const deckId = deckTitle
    return AsyncStorage.mergeItem(
        STORAGE_KEY,
        JSON.stringify({
            [deckId]: {
                title: deckTitle,
                questions: []
            }
        })
    )
}

export function addCardToDeck(title,card) {
    return AsyncStorage.getItem(STORAGE_KEY).then(result => {
        const data = JSON.parse(result)
        data[title].questions.push(card)
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    })
}
