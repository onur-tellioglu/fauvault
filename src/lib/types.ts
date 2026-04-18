export type Concept = {
  heading: string
  body: string
}

export type Question = {
  id: string           // "L1Q1"
  text: string
  options: string[]
  correct: number[]    // 0-indexed, array supports multiple-correct
  explanation: string  // Turkish explanation
  type: 'single' | 'multiple'
}

export type Flashcard = {
  front: string
  back: string
}

export type Lecture = {
  id: number
  title: string
  speaker: string
  concepts: Concept[]
  questions: Question[]
  flashcards?: Flashcard[]
}

export type Content = {
  lectures: Lecture[]
}
