import React, { Component } from 'react'
import './assets/style.css'

import quizService from './assets/questions'
import QuestionBox from './components/QuestionBox'
import Result from "./components/result"

class App extends Component {
    constructor() {
        super()
        this.state = {
            questionbank: [],
            score: 0,
            responses: 0

        }

    }
    getQuestions = () => {
        quizService().then(question => {
            this.setState({
                questionbank: question
            })
        })
    }

    playAgain = () => {
        this.getQuestions()
        this.setState({
            score: 0,
            responses: 0
        })

    }

    computeAnswer = (answer, correctAnswer) => {
        if (answer === correctAnswer) {
            this.setState({
                score: this.state.score + 1
            })
        }
        this.setState({
            responses: this.state.responses < 5 ? this.state.responses + 1 : 5
        })
    }

    componentDidMount() {
        this.getQuestions();
    }

    render() {

        return (
            <>
                <div className="container">
                    <div className="title"> React Quiz </div>
                    {this.state.questionbank.length > 0 &&
                        this.state.responses < 5 &&
                        this.state.questionbank.map(({ question, answers, correct, questionID }) => (
                            <h4>{<QuestionBox
                                question={question}
                                options={answers}
                                keys={question.id}
                                selected={answer => this.computeAnswer(answer, correct)}
                            />}</h4>
                        )
                        )}
                    {this.state.responses === 5 ? (<Result score={this.state.score} playAgain={this.playAgain} />) : null}
                </div>

            </>
        )
    }
}

export default App