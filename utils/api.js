/**
 * Created by rozer on 5/2/2018.
 */
import { AsyncStorage } from "react-native";
import { addCard,  addDeck } from '../action'

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
        Science: {
            title: 'Science',
            questions: [
                {
                    question: 'Electrons are larger than molecules.',
                    answer: 'False'
                },
                {
                    question: 'Spiders have six legs',
                    answer: 'False'
                },
                {
                    question: 'Kelvin is a measure of temperature.',
                    answer: 'True'
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
    const deckId = deckTitle;
    return dispatch => {
        AsyncStorage.mergeItem(
            STORAGE_KEY,
            JSON.stringify({
                [deckId]: {
                    title: deckTitle,
                    questions: []
                }
            })
        );
        dispatch(addDeck(deckTitle))
    }
}

export function addCardToDeck(title,card) {
    return dispatch => {
        AsyncStorage.getItem(STORAGE_KEY).then(result => {
            const data = JSON.parse(result)
            data[title].questions.push(card)
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
        });
        dispatch(addCard(title,card))
    }
}
