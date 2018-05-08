/**
 * Created by rozer on 5/2/2018.
 */
import { AsyncStorage } from "react-native";

const STORAGE_KEY = "flashCard:deck";

function dummyData() {

    const defaultData = {
        Technology: {
            title: 'Technology',
            questions: [
                {
                    question: 'The Internet was created by a U.S. military research agency.',
                    answer: 'True'
                },
                {
                    question: 'The Internet and the World Wide Web are essentially the same thing.',
                    answer: 'False'
                },
                {
                    question: 'Today many aspects of human–computer interaction are influenced by older technologies.',
                    answer: 'True'
                },
                {
                    question: 'Despite its growth, the video-game industry still brings in smaller revenues than the U.S. box office.',
                    answer: 'False'
                },
                {
                    question: 'The video-game industry is unlike other media industries in that it has not seen consolidation.',
                    answer: 'False'
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
             return {
                 deck: dummyData()
             }
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
